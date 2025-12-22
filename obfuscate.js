import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import JavaScriptObfuscator from 'javascript-obfuscator';

const __dirname = dirname(fileURLToPath(import.meta.url));
const bundlePath = resolve(__dirname, 'dist/bundle.js');

console.log('🔒 Obfuscating bundle.js...');

try {
  // Read the built bundle
  const code = readFileSync(bundlePath, 'utf8');

  // Extract banner comment (preserve legal notice)
  const bannerMatch = code.match(/^\/\*![\s\S]*?\*\//);
  const banner = bannerMatch ? bannerMatch[0] : '';
  const codeWithoutBanner = banner ? code.slice(banner.length) : code;

  // Obfuscate the code
  const obfuscationResult = JavaScriptObfuscator.obfuscate(codeWithoutBanner, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.5,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.3,
    debugProtection: false,
    debugProtectionInterval: 0,
    disableConsoleOutput: false,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 5,
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayCallsTransformThreshold: 0.5,
    stringArrayEncoding: ['base64'],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 1,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 2,
    stringArrayWrappersType: 'variable',
    stringArrayThreshold: 0.5,
    transformObjectKeys: true,
    unicodeEscapeSequence: false,
  });

  // Combine banner with obfuscated code
  const finalCode = banner + (banner ? '\n' : '') + obfuscationResult.getObfuscatedCode();

  // Write back to bundle
  writeFileSync(bundlePath, finalCode, 'utf8');

  console.log('✅ Bundle obfuscated successfully!');
} catch (error) {
  console.error('❌ Obfuscation failed:', error.message);
  process.exit(1);
}
