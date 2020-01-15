const baseConfig = require("./webpack.config.base");
const webpackMerge = require("webpack-merge");
const path = require('path');


module.exports = (env, arg) => {
  let config;

  config = webpackMerge(
    baseConfig(env, arg),
    {
      output: {
        filename: "js/[name].[chunkhash:8].js"
      },
      entry : {
        app: path.resolve(__dirname, "../src/index.js")
      },
      optimization: {
        splitChunks: {
          // include all types of chunks
          chunks: 'all'
        },
        runtimeChunk: true
      }
      // config.plugins.push(
      //   new webpack.optimize.SplitChunksPlugin({
      //     name: "vendor"
      //   })
      // )
    }
  )

  return config;
};
