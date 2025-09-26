## AI Assistant Project Instructions

Focused guidance so an AI agent can be productive quickly in this repository. Keep answers grounded in these concrete project patterns (avoid generic advice).

### 1. Big Picture

- Single embeddable JS/CSS bundle (`dist/bundle.js`) injected into merchant pages (see README embed snippet). All runtime code lives under `src/`.
- Entry point: `src/app.js` (imports global styles + bootstraps Boomio service).
- Core orchestration lives in `src/services/boomio.js` (BoomioService). It: (1) initializes config/localStorage, (2) fetches remote widget config via `sendBoomioData` (POST to global `newLinkBoomio` URL), (3) creates container, (4) chooses & starts a widget (`loadWidget`).
- Widgets are modular mini‑games / UI experiences in `src/widgets/*Widget` folders. Startup functions follow the naming pattern `start<WidgetName>Widget` (or similar, e.g. `startFlappyBird`).
- Persistent & server‑driven state stored in localStorage under key `boomioPluginConfig`, abstracted by `LocalStorageService` (`src/services/localStorage.js`). Business flags (e.g. restrictions, coupon data, dynamicData, teams) flow from API → localStorage → widgets.

### 2. Adding / Modifying a Widget

1. Create a new folder under `src/widgets/YourWidgetNameWidget/` (keep existing naming style: camelCase + `Widget`).
2. Export a start function (e.g. `export function startYourWidget() { ... }`). Avoid side effects on import; only execute within that function.
3. Add a re‑export to `src/widgets/index.js` (`export * from './yourWidgetNameWidget';`).
4. Add mapping in `createWidgetMap` inside `BoomioService.loadWidget` (key = short url param / server value, value = start function).
5. Ensure any DOM container usage assumes the wrapper produced by `widgetHtmlService.createWidgetContainer(widget_type)` exists.
6. Keep assets relative; they are processed by `file-loader`. Do NOT use absolute URLs unless intentionally external. Large / shared images often live under root `images/` (plus historical branches—do not delete asset branches noted in README).

### 3. Remote Config & Signals

- `sendBoomioData(extra_data)` wraps payload: `{user_session, current_page_url, extra_data}` → base64 (prefixed with random letter) → POST to `newLinkBoomio` (must be defined globally by host page; never hardcode).
- After each response: `localStorageService.setConfigFromApi` merges & persists configuration (also handles `instruction === 'stop'`).
- Use `boomioInstance.signal(signal_code, ev_type, additional_fields)` for runtime events; it reuses the same encoding pipe and updates config on response.
- Respect restriction checks (location/date/time) in `loadWidget`—new widgets should not bypass them.

### 4. Configuration Access Pattern

- Always read config through `localStorageService.config` (already refreshed post‑API). Don’t cache deep references long‑term—server may mutate values between signals.
- When updating only local client state (e.g. widget position), use `localStorageService.updateConfig({ x_position, y_position })` so future reloads persist.
- Never store large binary data in the config blob (keep to primitives / small arrays).

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

---

Provide feedback if any section needs deeper detail (e.g. a specific widget life cycle or adding analytics hooks) and this file can be iteratively refined.
