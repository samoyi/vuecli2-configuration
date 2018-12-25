// 这个文件会生成`vue-loader`的配置，供`webpack.base.conf.js`使用
'use strict'
const utils = require('./utils')
const config = require('../config')

// 根据是否是生产环境，设置为生产构建配置或开发构建配置中是否生产
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    // 生产环境提取 CSS 
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  // `.vue`模板中的资源引用被转换为使用`require`加载，将其转换为 webpack 模块
  // During template compilation, the compiler can transform certain attributes, such as `src` URLs, into `require` calls, so that the target asset can be handled by webpack.
  // The default config transforms the `src` attribute on `<img>` tags and `xlink:href` attribute on `<image>` tags of SVG.
  // 文档 https://vue-loader-v14.vuejs.org/en/options.html#transformtorequire
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
