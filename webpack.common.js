const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Entry point (where webpack starts building)
  entry: './src/index.tsx',

  // Module rules (how to process different file types)
  module: {
    rules: [
      // TypeScript files
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // CSS files
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // Image files
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },

  // Resolve extensions (import files without extensions)
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};