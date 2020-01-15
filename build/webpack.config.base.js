const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const creatVueLoaderOptions = require("./vue-loader")

const getConfig = (env) => {
  console.log(env);
  const isDev = env.development || false;
  console.log(isDev);

  const config = {
    target: "web",
    mode: isDev ? 'development' : 'production',
    entry: path.resolve(__dirname, "../src/index.js"),
    output: {
      filename: "js/[name].[hash:6].bundle.js",
      sourceMapFilename: "[name]-[chunkhash].map",
      path: path.resolve(__dirname, "../dist")
    },
    module: {
        rules: [
            {
              test: /\.vue$/,
              use: {
                loader: "vue-loader",
                options: creatVueLoaderOptions(isDev)
              }
            },
            {
              test: /\.jsx$/,
              use: "babel-loader",
            },
            {
              test: /\.js$/,
              use: "babel-loader"
            },
            {
              test: /\.css$/,
              use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                "css-loader",
              ]
            },
            {
              test: /\.styl/,
              use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                "css-loader",
                {
                  loader: "postcss-loader",
                  options: {
                    sourceMap: true
                  }
                },
                "stylus-loader"
              ]
            },
            {
              test: /\.(jpg|png|gif|bmp|jpeg)$/,
              use: {
                loader: "url-loader",
                // "url-loader?limit=8000"
                options: {
                  limit: 1024,
                  name: "[name].[hash:6].[ext]",
                  outputPath: 'img'
                }
              }
            },
        ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: "管理输出",
        filename: 'index.html',
        // template: path.resolve(__dirname, "./index.html")
      }),
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": isDev ? '"development"' : JSON.stringify('production')
      }),
      new MiniCssExtractPlugin({
        filename: isDev ? '[name].css' : 'css/[name].[hash].css',
        chunkFilename: isDev ? '[id].css' : 'css/[id].[hash].css',
      })
    ]
  }

  return config;
}

module.exports = function(env, arg) {
  return getConfig(env, arg);
}