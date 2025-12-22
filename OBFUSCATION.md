# Code Obfuscation Setup

This project uses JavaScript obfuscation to protect the code in production builds, particularly for `boomio.js` and other sensitive services.

## How It Works

The obfuscation process runs automatically as a **post-build step** when you create a production build.

### Build Process Flow

1. **Build Phase**: Vite compiles all source files into `dist/bundle.js`
2. **Obfuscation Phase**: The `obfuscate.js` script runs automatically and applies obfuscation transformations to the bundle
3. **Result**: A heavily obfuscated production bundle ready for deployment

## Commands

### Production Build (with obfuscation)

```bash
npm run build
# or
npm run build:prod
```

### Production Build (without obfuscation)

```bash
npm run build:prod:no-obfuscate
```

### Development Build (no obfuscation)

```bash
npm run build:dev
```

## Obfuscation Features

The obfuscation script (`obfuscate.js`) applies the following transformations:

- **Control Flow Flattening**: Makes code logic harder to follow
- **Dead Code Injection**: Adds fake code paths to confuse reverse engineers
- **String Array Encoding**: Encrypts strings using base64
- **Identifier Renaming**: Renames variables/functions to hexadecimal names
- **String Array Rotation**: Randomizes string array positions
- **Self-Defending**: Code breaks if tampering is detected
- **Split Strings**: Breaks strings into chunks

## Configuration

The obfuscation settings can be adjusted in `obfuscate.js`. Current configuration is optimized for:

- Maximum code protection
- Acceptable performance impact
- Compatibility with modern browsers

## Notes

- The legal banner comment is preserved at the top of the bundle
- Source maps are NOT generated for production builds
- Obfuscation only applies to production builds, not development
- The process adds approximately 2-3 seconds to build time
- Bundle size increases slightly due to obfuscation overhead

## Troubleshooting

If the build fails during obfuscation:

1. Check `obfuscate.js` for syntax errors
2. Try adjusting obfuscation thresholds (reduce intensity)
3. Use `npm run build:prod:no-obfuscate` to isolate the issue
4. Check console output for specific error messages

## Dependencies

- `javascript-obfuscator`: The core obfuscation library
- Node.js ES Modules support (specified in `package.json`)
