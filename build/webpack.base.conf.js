// 基本的 webpack 配置，会被分别 merge 进`build/webpack.dev.conf.js`和`build/webpack.prod.conf.js`

'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
// 返回相对于根目录的 dir 路径的绝对路径
// 例如在我的情况下，`resolve('src')`返回`D:\gits\vuecli2-configuration\src`
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

// eslint 配置
const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre', // 先使用 eslint-loader检查代码，之后再用其他 loader 处理代码
    include: [resolve('src'), resolve('test')],
    options: {
        formatter: require('eslint-friendly-formatter'), // 指定 eslint 报告的格式
        // 如果不在浏览器覆盖显示错误，则 emit warning。但不懂，没看出这个 true 或 false 有什么区别
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
})

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/main.js'
    },
    output: {
        // bundle 文件生成的路径
        path: config.build.assetsRoot,
        filename: '[name].js',
        // 生产构建和开发构建有可能是不同的公共路径
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        }
    },
    module: {
        rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                // vueLoaderConfig 都是 CSS 相关的配置
                // When `vue-loader` detects the presence of `babel-loader` or `buble-loader` in the same project, it will use them to process the `<script>` parts of all `*.vue` files  文档 https://vue-loader-v14.vuejs.org/en/features/es2015.html
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    node: {
        // node 选项可以配置是否 polyfill 或 mock 某些 Node.js 全局变量和模块。这可以使最初为 Node.js 环境编写的代码，在其他环境（如浏览器）中运行。
        // 下面的配置会禁止 polyfill 或禁止 mock 重复或无用的全局变量和模块

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
}
