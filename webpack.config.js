const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = function(env, arg) {
  return {
    mode: env.production ? 'production' : 'development',
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
      filename: "[name].[hash:6].bundle.js",
      sourceMapFilename: "[name]-[chunkhash].map",
      path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
              test: /\.vue$/,
              use: "vue-loader"
            },
            {
              test: /\.css$/,
              use: [
                "style-loader",
                "css-loader",
              ]
            },
            {
              test: /\.(jpg|png|gif|bmp|jpeg)$/,
              use: {
                loader: "url-loader",
                // "url-loader?limit=8000"
                options: {
                  limit: 1024,
                  name: "[name].[ext]"
                }
              }
            },
        ]
    },
    plugins: [
      new htmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, "./index.html")
      }),
      new VueLoaderPlugin()
    ]
  }
}