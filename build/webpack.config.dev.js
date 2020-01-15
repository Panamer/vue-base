const baseConfig = require("./webpack.config.base");
const webpackMerge = require("webpack-merge");
const webpack = require('webpack');
const path = require('path');


module.exports = (env, arg) => {
  let config;

  config = webpackMerge(
    baseConfig(env, arg),
    {
      // config.devtool = "#cheap-module-eval-source-map",
      devServer: {
        contentBase: path.join(__dirname, "../src/assets"),
        compress: true,
        host: "0.0.0.0",
        port: 8080,
        overlay: {
          errors: true
        },
        open: true,
        hot: true
      },
      plugins: [
        new webpack.EvalSourceMapDevToolPlugin({
          filename: "[name].js.map",
          exclude: ['vendor.js']
        }),
        new webpack.HotModuleReplacementPlugin()
      ]
    }
  )

  return config;
};