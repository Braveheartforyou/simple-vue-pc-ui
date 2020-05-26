'use strict';
const path = require('path');
const config = require('../config');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const isProd = process.env.NODE_ENV === 'production';

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

function assetsPath(_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory;

  return path.posix.join(assetsSubDirectory, _path);
}

// 基础 文件配置
module.exports = {
  context: path.resolve(__dirname, '../'),
  // https://webpack.docschina.org/concepts/mode/
  mode: 'development',
  // https://webpack.docschina.org/concepts/entry-points/
  entry: {
    app: './src/main.js'
  },
  // https://webpack.docschina.org/concepts/output/
  output: {
    // 输出目录
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    // 文件名称
    filename: '[name].[hash].bundle.js'
  },
  // https://webpack.docschina.org/configuration/resolve/#resolve
  resolve: {
    // 自动解析确定的扩展
    extensions: ['.js', '.vue', '.json', '.ts'],
    // 路径别名
    alias: {
      // 引入vue-conplier
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@com': resolve('components'),
      '@examples': resolve('examples'),
      '@router': resolve('src/router'),
      '@store': resolve('src/store')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      },
      // vue-loader
      {
        test: /\.vue$/,
        loader: 'vue-loader'
        // options:
      },
      // 图片配置
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          output: 'static/images/',
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    // make sure to include the plugin for the magic
    // 配合vue-loader使用
    new VueLoaderPlugin()
  ],
  optimization: {
    // runtimeChunk: {
    //   name: 'runtime'
    // },
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors'
        }
      }
    }
  },
  performance: false,
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};
