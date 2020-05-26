// node内置path 模块
const path = require("path");
// // webpack模块
// const webpack = require("webpack");
// webpack config合并模块
const merge = require("webpack-merge");
// html输出配置
const HtmlWebpackPlugin = require("html-webpack-plugin");
// copy静态文件插件
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// 清除文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 基础配置
const baseWebpackConfig = require("./webpack.base");
// 全局配置
const config = require("../config");
// PWA
const WorkboxPlugin = require('workbox-webpack-plugin');

function assetsPath (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
    config.build.assetsSubDirectory :
    config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

// 正式环境 webpack 配置
const webpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  output: {
    path: config.build.assetsRoot,
    filename: assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: assetsPath('js/[name].[chunkhash].js')
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            sourceMap: config.build.cssSourceMap
          }
        },
        'sass-loader',
        'postcss-loader'
      ]
    }, {
			test: /\.css$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader'
			]
		}],
  },
  // 配置 js source-map
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})]
	},
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
			filename: assetsPath('css/[name].[contenthash].css'),
			chunkFilename: assetsPath('css/[name].[contenthash].css')
		}),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../index.html"),
      filename: "index.html",
      inject: true
    }),
    new WorkboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true
		})
  ]
});

module.exports = webpackConfig;