/*
 * @Descripttion:
 * @Author: asyncnode
 * @Date: 2020-04-21 09:16:13
 * @LastEditors: asyncnode
 * @LastEditTime: 2020-05-21 10:19:53
 */

module.exports = {
  // 业务代码babel
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        targets: {
          chrome: '58'
        },
        corejs: 2
      }
    ]
  ],
  plugins: [
    'transform-es2015-modules-commonjs',
    // 公用代码库
    // ["@babel/plugin-transform-runtime", {
    // "corejs": 2,
    // "absoluteRuntime": false,
    // "helpers": true,
    // "regenerator": true,
    // "useESModules": false
    // }],
    '@babel/plugin-syntax-dynamic-import'
  ]
};
