/**
 * npm init
 * webpack4.0 需要装webpack@^4.0.0和webpack-cli
 * 处理 .vue文件需要vue-loader,首先安装vue-loader
 * 安装完vue-loader会出现两个warning, 提示vue-loader依赖css-loader、vue-template-compiler,安装它
 * 配置entry和output (命名详细配置去看API)
 * 配置config.module.rules 添加项目会出现的所有文件类型,并配置对应的loader去解析它(test、use) use有多种写法
 * url-loader把小图片转为base64, 依赖file-loader
 * css-loader处理css文件  style-loader把css插入到html里
 * 如果项目中使用了scss sass styl 预处理器  都需要添加对应的loader
 * 至此就可以build成功了
 * 
 * 安装webpack-dev-server
 * 
 * 执行npm start发现页面不能正常展示,需要 HtmlWebpackPlugin,此plugin可以set title或者提供一个模版方便seo
 * CleanWebpackPlugin代替rmirf dist/*
 * webpack.DefinePlugin 设置全局变量
 * MiniCssExtractPlugin(抽离css到一个单独的文件里,配合组件按需加载) 代替 3.0版本的extract-text-webpack-plugin  官方建议
 * devtool 配置sourcemap方式  不同的值会影响build和rebuild速度.此处用官方推荐
 * 开发环境 配置 devServer
 * EvalSourceMapDevToolPlugin 也是 配置devtool.且不能和devtool同时出现
 * HotModuleReplacementPlugin 实现 页面保存自动热重载(页面不刷新)
 * optimization.splitChunks 代替 3.0版本 webpack.optimize.CommonsChunkPlugin
 * 区分类库代码及hash优化
 * 
 * 此文件module.exports的是一个function 接收参数env
 * 结合package.json命令行里的 --env.produvtion用来区分开发、生产环境.官宣
 * 代替cross-env NODE_ENV=development
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

const getConfig = (env) => {
  console.log(env);
  const isDev = env.development || false;
  console.log(isDev);

  const config = {
    target: "web",
    mode: isDev ? 'development' : 'production',
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
              test: /\.jsx$/,
              use: "babel-loader"
            },
            {
              test: /\.js$/,
              use: "babel-loader",
              exclude: /node_modules/
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
                  name: "[name].[ext]"
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
        filename: isDev ? '[name].css' : '[name].[hash].css',
        chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
      })
    ]
  }

  if (isDev) {
    // config.devtool = "#cheap-module-eval-source-map",
    config.devServer = {
      contentBase: path.join(__dirname, "src/assets"),
      compress: true,
      host: "0.0.0.0",
      port: 8080,
      overlay: {
        errors: true
      },
      open: true,
      hot: true
    };
    config.plugins.push(
      new webpack.EvalSourceMapDevToolPlugin({
        filename: "[name].js.map",
        exclude: ['vendor.js']
      }),
      new webpack.HotModuleReplacementPlugin()
    );
  } else {
    // 开发环境是不能用chunkhash的
    config.output.filename = "[name].[chunkhash:8].js";
    config.entry = {
      app: path.resolve(__dirname, "src/index.js")
    }
    config.optimization = {
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

  return config;
}

module.exports = function(env, arg) {
  return getConfig(env);
}