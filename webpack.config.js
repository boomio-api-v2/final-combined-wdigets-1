const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  plugins: [new ESLintPlugin()],
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
