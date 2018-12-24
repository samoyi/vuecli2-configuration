'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    // 构建出来的静态资源（index.html以外的资源）以及从`/static/`里面搬运过来的资源的子路径
    // 前者的路径设置，会被`/build/utils.js`中的`assetsPath`方法应用；
    // 后者的路径设置，会被`/build/webpack.dev.conf.js`中的`CopyWebpackPlugin`插件使用
    assetsSubDirectory: 'static',
    // 相当于 webpack 的 output.publicPath
    assetsPublicPath: '/',
    // 通过 devSever 代理 API 访问。参考`/分析/IntegratingWithBackendFramework.md`
    proxyTable: {},

    // Various Dev Server settings
    // 下面的5个选项都会被`/build/webpack.dev.conf.js`中的 devSever 配置引用
    // can be overwritten by process.env.HOST
    host: 'localhost',
    // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    port: 8080,
    autoOpenBrowser: false,
    // Shows a full-screen overlay in the browser when there are compiler errors or warnings.
    errorOverlay: true,
    // 不使用轮询的方式来监听文件变化
    // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    poll: false,

    // 构建成功或失败时，使用 friendly-errors-webpack-plugin 进行通知
    notifyOnErrors: true,

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // source map 模式
    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    // 不懂这里是怎么配置的 文档也失效
    cacheBusting: true,

    // 不懂这里是怎么配置
    cssSourceMap: true
  },

  build: {
    // Template for index.html
    // 构建生成的 HTML 文件
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    // 构建文件生成到这里。必须用绝对路径
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 构建出来的静态资源（index.html以外的资源）以及从`/static/`里面搬运过来的资源的子路径
    assetsSubDirectory: 'static',
    // 相当于 webpack 的 output.publicPath
    assetsPublicPath: '/',

    /**
     * Source Maps
     */
    productionSourceMap: true, // 生成 source map
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map', // source map 类型。参考上面链接的 webpack 文档

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    // `/build/webpack.prod.conf.js` 会根据下面的配置决定是否压缩以及压缩什么文件
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    // `/build/webpack.prod.conf.js` 会根据这个选项来决定是否生成报告
    // 出现过设置为生成报告是构建会卡主不开始的情况 不懂
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
