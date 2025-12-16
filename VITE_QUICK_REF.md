# Vite Quick Reference

## Common Commands

```bash
# Development with hot reload (FAST!)
npm run dev
# → Opens http://localhost:3000
# → Changes reflect instantly in browser

# Production build
npm run build
# → Creates optimized dist/bundle.js

# Development build (with source maps)
npm run build:dev
# → Creates dist/bundle.js with debugging info

# Watch mode (rebuild on changes)
npm run watch
# → Auto-rebuilds on file changes

# Bundle analysis
npm run analyze
# → Shows what's in your bundle

# Tests
npm test

# Linting
npm run lint

# Format code
npm run format
```

## Key Differences from Webpack

### ✅ What's Better

- **Speed**: Dev server starts in ~185ms vs 3-5s
- **HMR**: Instant updates (<100ms) vs 1-2s
- **Build**: ~4.7s vs ~8-10s
- **Errors**: Clearer error messages with exact line numbers
- **DX**: No more waiting - changes are instant

### 🔄 What Changed

- **Dev mode**: Uses ES modules directly from source
- **Config**: `vite.config.js` instead of `webpack.config.js`
- **Module resolution**: Stricter - all imports must match exports exactly
- **No loaders**: CSS, images handled natively

### 📝 What Stayed Same

- Entry: `src/app.js`
- Output: `dist/bundle.js`
- Aliases: `@` → `src/`
- Tests: Jest still works
- ESLint: Still works
- Embed code: Same HTML snippet

## Development Workflow

### Before (Webpack)

```bash
npm run dev       # Wait 3-5s for server to start
# Make a change
# Wait 1-2s for HMR
# See change
```

### Now (Vite)

```bash
npm run dev       # Ready in 185ms ⚡
# Make a change
# See change INSTANTLY ⚡⚡⚡
```

## Tips

1. **Use `npm run dev` for development** - It's MUCH faster than `npm start`
2. **Source maps**: Automatically enabled in dev mode for debugging
3. **Cache**: Vite caches in `node_modules/.vite/` - delete if issues occur
4. **Import errors**: Vite catches bad imports that Webpack missed - fix them!

## Troubleshooting

### "Cannot find module" errors

- Check import paths match exports exactly
- Vite is stricter than Webpack about exact names

### Changes not reflecting

- Hard refresh: Ctrl+Shift+R
- Clear `.vite` cache: `rm -rf node_modules/.vite`

### Build errors

- Run `npm run lint` first to catch issues early
- Check that all imports have matching exports

## Performance

| Operation   | Webpack | Vite   | Improvement   |
| ----------- | ------- | ------ | ------------- |
| Dev startup | 3-5s    | 185ms  | 16-27x faster |
| Hot reload  | 1-2s    | <100ms | 10-20x faster |
| Prod build  | 8-10s   | 4.7s   | ~2x faster    |
| Bundle size | Same    | Same   | -             |

## Files Structure

```
.
├── vite.config.js      # Vite configuration
├── index.html          # Dev entry point
├── src/
│   └── app.js          # Main entry
└── dist/
    ├── bundle.js       # Production output (built by CI/CD)
    └── bundle.css      # Extracted CSS
```

## Need More Info?

See [VITE_MIGRATION.md](VITE_MIGRATION.md) for complete migration details.
