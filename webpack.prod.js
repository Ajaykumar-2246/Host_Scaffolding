const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const mfe_registry = require("./src/mfe-registry.js");
const mfes = mfe_registry.mfe_apps;

const remoteAliases = {};
mfes.forEach((mfe) => {
  remoteAliases[`${mfe.name}/Routes`] = path.resolve(
    __dirname,
    mfe.path,
    "src/pages/content/Routes.tsx",
  );
});

module.exports = merge(common, {
  mode: "production",

  resolve: {
    alias: {
      ...common.resolve?.alias,
      ...remoteAliases,
    },
  },

  // Output configuration for production
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: '/', // Will be your production domain
    clean: true,
  },

  // No source maps in production (or use 'source-map' for debugging)
  devtool: false,

  // Performance hints
  performance: {
    hints: "warning",
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  // Module Federation Plugin
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",

      shared: {
        react: {
          singleton: true,
          requiredVersion: "^18.2.0",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^18.2.0",
        },
        "react-router-dom": {
          singleton: true,
          requiredVersion: "^6.20.0",
          eager: false,
        },
      },
    }),
    // Copy _redirects file for Netlify SPA routing
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public/_redirects"),
          to: path.resolve(__dirname, "dist/_redirects"),
        },
      ],
    }),
  ],

  // Optimizations
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: 10,
        },
      },
    },
  },
});
