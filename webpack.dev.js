const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");
const path = require("path");
const mfe_registry = require("./src/mfe-registry.js");

const mfe_apps = mfe_registry.mfe_apps;

const remotes = Object.fromEntries(
  mfe_apps.map((app) => [
    app.name,
    `${app.name}@http://localhost:${app.port}/remoteEntry.js`,
  ])
);

module.exports = merge(common, {
  mode: "development",

  // Development server configuration
  devServer: {
    port: 8000,
    hot: true,
    historyApiFallback: true,
    open: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },

  // Source maps for debugging
  devtool: "eval-source-map",

  // Output configuration
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: "http://localhost:8000/",
    clean: true,
  },

  // Module Federation Plugin
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",

      remotes,

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
        },
      },
    }),
  ],
});
