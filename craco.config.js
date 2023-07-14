const CracoLessPlugin = require("craco-less");
const antdTheme = require("./src/Themes/antd");
const cracoModuleFederationPlugin = require("craco-mf");

module.exports = {
  webpack: {
    configure: function (webpackConfig, { env, paths }) {
      webpackConfig.output.filename = "[name].[contenthash].js";

      webpackConfig.resolve.fallback = webpackConfig.resolve.fallback || {};
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        path: require.resolve("path-browserify"),
        util: require.resolve("util/"),
      };
      return webpackConfig;
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: antdTheme,
            javascriptEnabled: true,
            math: "always",
          },
        },
      },
    },
    { plugin: cracoModuleFederationPlugin },
  ],
};
