# Copilot Instructions

<!-- Metadata -->

**Version:** 1.2  
**Last Updated:** December 16, 2025  
**Maintainer:** boomio-api-v2  
**Repository:** final-combined-wdigets-1

---

## AI Assistant Project Instructions

**Purpose & Scope**: This instruction file guides AI assistants on safe repository edits, coding conventions, and architectural patterns for the Boomio embeddable widget platform.

**Location & Scope Rules**:

- Applies to all files under `src/`, build configuration (`vite.config.js`, `package.json`), and documentation.
- Does NOT apply to: generated `dist/` files (built by CI/CD, not committed), `node_modules/`, historical asset branches in `images/`.
- Languages: JavaScript (ES Modules), CSS, HTML. No TypeScript.

**Persona & Tone**: Be concise, grounded in project patterns, and conservative. Avoid generic advice. Always verify changes against the Change Checklist (§11) before marking complete. Ask for clarification on backend contract changes.

---

### 1. Project Overview & Big Picture

**Runtime/Platform**: Browser-based embeddable JavaScript bundle. Target: Modern browsers (ES6+). No Node.js runtime dependency (client-side only).

**Audience**: Merchant websites embedding mini-games/interactive widgets to drive engagement, collect user data, and distribute coupons.

**Main Features**:

- Single embeddable JS/CSS bundle (`dist/bundle.js`) injected into merchant pages (see README embed snippet). All runtime code lives under `src/`.
- Entry point: `src/app.js` (imports global styles + bootstraps Boomio service).
- Core orchestration lives in `src/services/boomio.js` (BoomioService). It: (1) initializes config/localStorage, (2) fetches remote widget config via `sendBoomioData` (POST to global `newLinkBoomio` URL), (3) creates container, (4) chooses & starts a widget (`loadWidget`).
- Widgets are modular mini‑games / UI experiences in `src/widgets/*Widget` folders. Startup functions follow the naming pattern `start<WidgetName>Widget` (or similar, e.g. `startFlappyBird`).
- Persistent & server‑driven state stored in localStorage under key `boomioPluginConfig`, abstracted by `LocalStorageService` (`src/services/localStorage.js`). Business flags (e.g. restrictions, coupon data, dynamicData, teams) flow from API → localStorage → widgets.

---

### 2. Tooling & Versions

**Required**:

- Node.js v24.x and npm v6+
- Vite 6 (bundler/dev server with HMR)
- ESLint with `eslint-plugin-unused-imports`
- Jest (testing, jsdom environment)

**Key Dependencies** (see `package.json` for exact versions):

- `@babel/core`, `babel-loader` for ES6+ transpilation
- `file-loader` for asset processing (images)
- `http-server` for local preview

**Module Resolution**: `@` alias resolves to `src/` (configured in `vite.config.js` and `jest.config.js` `moduleNameMapper`).

---

### 3. Build / Run / Test Commands

**Installation**:

```powershell
npm install
```

**Development Preview**:

```powershell
# Option 1: Serve index.html with http-server
npm start

# Option 2: Vite dev server with HMR at localhost:3000
npm run dev
```

**Production Build**:

```powershell
npm run build          # Production bundle (minified)
npm run build:dev      # Development bundle (source maps)
```

**Testing**:

```powershell
npm test               # Run Jest tests (currently minimal/commented out in CI)
```

**Linting**:

```powershell
npm run lint           # Run ESLint
```

**CI/CD**: GitHub Actions (`.github/workflows/build.yml`) runs lint + production build. Tests currently commented out—do not introduce failing tests without enabling in workflow.

---

### 4. Adding / Modifying a Widget

1. **Create Widget Folder**: Create a new folder under `src/widgets/YourWidgetNameWidget/` (keep existing naming style: camelCase + `Widget`).
2. **Export Start Function**: Export a start function (e.g. `export function startYourWidget() { ... }`). Avoid side effects on import; only execute within that function.
3. **Register in Index**: Add a re‑export to `src/widgets/index.js` (`export * from './yourWidgetNameWidget';`).
4. **Map in BoomioService**: Add mapping in `createWidgetMap` inside `BoomioService.loadWidget` (key = short url param / server value, value = start function).
5. **DOM Container Assumptions**: Ensure any DOM container usage assumes the wrapper produced by `widgetHtmlService.createWidgetContainer(widget_type)` exists.
6. **Asset Handling**: Keep assets relative; they are processed by `file-loader`. Do NOT use absolute URLs unless intentionally external. Large / shared images often live under root `images/` (plus historical branches—do not delete asset branches noted in README).

---

### 5. Remote Config & Signals (API Contracts)

- **API Endpoint**: `sendBoomioData(extra_data)` wraps payload: `{user_session, current_page_url, extra_data}` → base64 (prefixed with random letter) → POST to `newLinkBoomio` (must be defined globally by host page; never hardcode).
- **Config Merging**: After each response: `localStorageService.setConfigFromApi` merges & persists configuration (also handles `instruction === 'stop'`).
- **Runtime Events**: Use `boomioInstance.signal(signal_code, ev_type, additional_fields)` for runtime events; it reuses the same encoding pipe and updates config on response.
- **Restriction Checks**: Respect restriction checks (location/date/time) in `loadWidget`—new widgets should not bypass them.

**Important API Fields** (do not rename without backend coordination):

- `m`, `boomioStopTill`, `puzzles_collected`, `widget_type`, `coupon_code`, `language`, `restrictions`, `dynamicData`, `teams`

**URL Parameter Handling**:

- **`campaign_url` Parameter**: When present in URL query string, this takes precedence over the actual page URL for tracking/analytics purposes. Used to support cross-page campaign attribution.
- **`current_page_url` Property**: In `BoomioService.constructor`, set via `this.current_page_url = getParam('campaign_url') || window.location.href`. This allows merchants to pass a canonical campaign URL that overrides the actual embedding page URL.
- **Pattern**: Always use `getParam()` utility from `@/utils` for URL parameter extraction (handles trim, empty strings, null values consistently).

---

### 6. Configuration Access Pattern

- Always read config through `localStorageService.config` (already refreshed post‑API). Don't cache deep references long‑term—server may mutate values between signals.
- When updating only local client state (e.g. widget position), use `localStorageService.updateConfig({ x_position, y_position })` so future reloads persist.
- Never store large binary data in the config blob (keep to primitives / small arrays).
- **URL Parameters**: Use `getParam()` from `@/utils` for reading URL query parameters. Common params: `campaign_url`, `language`, `user_id`. The utility handles whitespace trimming and returns `null` for empty/invalid values.

### 5. Build / Dev Workflow

- Install: `npm i`. Dev preview: `npm start` (serves `index.html` with http-server) OR `npm run dev` (webpack dev server with HMR at :3000). Standard build: `npm run build` (prod) or `npm run build:dev`.
- CI (GitHub Actions `build.yml`) runs lint + production build; tests are currently commented out—avoid adding mandatory failing tests without enabling them in workflow.
- Commit the generated `dist/bundle.js` (README requirement). Do not enable `output.clean` (currently `clean: false`) if you rely on historical artifacts, but keep bundle deterministic.

### 6. Lint / Style Conventions

- ESLint is permissive: many stylistic rules disabled; unused imports/vars warned via `eslint-plugin-unused-imports`. Prefer removing dead code to silence warnings.
- No TypeScript; stick to ES Modules; `@` alias resolves to `src/` (webpack + Jest `moduleNameMapper`).

### 7. Safe Changes & Pitfalls

- Avoid running network calls or starting widgets before `DOMContentLoaded`; rely on existing listener in `BoomioService.setInitialConfiguration`.
- Do not remove or rename keys consumed by server responses (e.g. `m`, `boomioStopTill`, `puzzles_collected`, `widget_type`) unless coordinating backend changes.
- Geolocation path: if `restrictions.location_restrictions` present, `navigator.geolocation.getCurrentPosition` async gating occurs—new logic must remain inside the validation flow or deferred until after load.
- Keep bundle size reasonable; use lazy loading only if you also adjust build (currently everything eagerly bundled).

**Game Loop / Animation Best Practices**:

- **Use `requestAnimationFrame` with framerate limiting**: For game widgets (e.g., doodleWidget), use timestamp-based framerate limiting instead of `setTimeout`. This provides more accurate timing than `setTimeout` (which can drift), uses browser-optimized animation loops, and ensures consistent physics across different refresh rates.
- **Pattern**:

  ```js
  gameLoop = (timestamp) => {
    if (!this.lastFrameTime) this.lastFrameTime = timestamp;
    const deltaTime = timestamp - this.lastFrameTime;

    // Only update if enough time has passed (e.g., 8.33ms for 120 FPS)
    if (deltaTime >= 8.33) {
      this.update();
      this.lastFrameTime = timestamp;
    }

    requestAnimationFrame(this.gameLoop);
  };
  ```

- **Benefits**: Caps framerate (e.g., 120 FPS) so physics remain consistent, prevents players from moving too fast on high-refresh monitors (144Hz, 240Hz), and provides smoother timing than nested `setTimeout` + `requestAnimationFrame`.

### 8. Testing Guidance (Current State)

- Jest configured with jsdom (`jest.config.js`), but few/no tests exist. If adding tests: place under `src/__tests__/`; mock localStorage & `fetch` as needed. Avoid introducing global side effects in test imports.

### 9. Example: Using a Config Value Safely

```js
import localStorageService from '@/services/localStorage';
function sample() {
  const { language, coupon_code } = localStorageService.config;
  if (coupon_code) {
    /* ... */
  }
}
```

### 10. When In Doubt

- Prefer extending existing service abstractions (`localStorageService`, `boomioInstance.signal`, `widgetHtmlService`) rather than inventing parallel utilities.
- Ask for backend contract details before pruning or renaming config properties.

### 11. Change Checklist — Always Verify Before Completing

Before marking any change as complete, **always** perform these steps (in order):

1. **Tests**: If tests exist for the modified code, run them (`npm test`). If adding new functionality, consider adding tests. If tests fail, fix them before proceeding.
2. **Build**: Run `npm run build` to ensure the production bundle builds successfully without errors.
3. **README**: Review if the change affects user-facing documentation:
   - New widget added? Update available widget types.
   - New configuration option? Document it.
   - Changed build/dev commands? Update instructions.
   - New dependencies or setup steps? Add to installation section.
4. **Copilot Instructions**: Update this file if the change introduces:
   - New architectural patterns or services
   - New widget creation steps
   - Modified configuration patterns
   - New development workflow requirements
   - Important pitfalls or gotchas discovered

**Commit Requirements**: Never commit `dist/bundle.js` - it's built automatically by CI/CD. Always ensure your changes pass `npm run build` locally before pushing.

---

Provide feedback if any section needs deeper detail (e.g. a specific widget life cycle or adding analytics hooks) and this file can be iteratively refined.
