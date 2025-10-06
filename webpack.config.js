const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const WebpackObfuscator = require('webpack-obfuscator');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  plugins: [
    new ESLintPlugin(),
    new WebpackObfuscator(
      {
        // Low obfuscation preset - Best Performance
        compact: true,
        controlFlowFlattening: false,
        deadCodeInjection: false,
        debugProtection: false,
        debugProtectionInterval: 0,
        disableConsoleOutput: false,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        numbersToExpressions: false,
        renameGlobals: false,
        selfDefending: false,
        simplify: true,
        splitStrings: false,
        stringArray: false,
        stringArrayThreshold: 0,
        unicodeEscapeSequence: false,
      },
      [
        // EXCLUDE patterns (files NOT to obfuscate)
        'node_modules/**',
        'dist/**',
        '*.config.*', // Exclude webpack.config.js, jest.config.js, etc.
        '*.html', // Exclude index.html
        '*.md', // Exclude README.md

        // ============================================================
        // STRATEGY 1: Obfuscate ONLY specific files
        // ============================================================
        // Uncomment to obfuscate ONLY boomio.js:
        'src/**', // Exclude all src files
        '!src/services/boomio.js', // BUT include boomio.js (! negates)

        // ============================================================
        // STRATEGY 2: Exclude specific files (obfuscate everything else)
        // ============================================================
        // Uncomment to exclude specific files from obfuscation:
        //'src/widgets/**', // Don't obfuscate widgets
        // 'src/services/localStorage.js', // Don't obfuscate this file

        // ============================================================
        // STRATEGY 3: Obfuscate multiple specific files
        // ============================================================
        // Uncomment to obfuscate only boomio.js and catchWidget.js:
        // 'src/**',                           // Exclude all
        // '!src/services/boomio.js',          // Include this
        // '!src/widgets/catchWidget/catchWidget.js', // Include this
      ],
    ),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/', // ensure dev server serves bundle from /dist/
    clean: false,
  },
  devServer: {
    static: {
      directory: path.join(__dirname), // serve index.html and assets from project root
      watch: true,
    },
    devMiddleware: {
      writeToDisk: false, // keep dist/bundle.js on disk for any tooling depending on it
    },
    port: 3000,
    hot: true,
    open: false,
    compress: true,
    client: {
      overlay: true,
      logging: 'info',
    },
    allowedHosts: 'all',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      images: path.resolve(__dirname, 'src/images'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|otf|ttf|eot)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },
};
