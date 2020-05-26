// node内置path 模块
const path = require("path");
// webpack模块
const webpack = require("webpack");
// webpack config合并模块
const merge = require("webpack-merge");
const portfinder = require("portfinder");
// 友好报错插件模块
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
// html输出配置
const HtmlWebpackPlugin = require("html-webpack-plugin");
// copy静态文件插件
const CopyWebpackPlugin = require("copy-webpack-plugin");
// 基础配置
const baseWebpackConfig = require("./webpack.base");
// 全局配置
const config = require("../config");

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

// 开发环境 webpack 配置
const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: config.dev.cssSourceMap
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
    ]
  },
  // 配置 js source-map
  devtool: config.dev.devtool,
  // 配置devserver
  devServer: {
    // 兼容 浏览器 没有 eslint插件
    overlay: true,
    // 日志等级
    clientLogLevel: "warning",
    // 启用 webpack 的 模块热替换 功能：
    hot: true,
    hotOnly: true,
    // contentBase: './dist', // since we use CopyWebpackPlugin.
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    // TODO: router history模式防止刷新无效果
    historyApiFallback: true,
    // historyApiFallback: {
    //   rewrites: {
    //     to: '',
    //     from: ''
    //   }
    //   rewrites: [
    //     {
    //       from: /.*/,
    //       to: path.posix.join(config.dev.assetsPublicPath, "index.html")
    //     }
    //   ]
    // },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../index.html"),
      filename: "index.html",
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: config.dev.assetsSubDirectory,
        ignore: [".*"]
      }
    ])
  ]
});
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer config
      devWebpackConfig.devServer.port = port;

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`
            ]
          },
          onErrors: undefined
        })
      );
      resolve(devWebpackConfig);
    }
  });
});
