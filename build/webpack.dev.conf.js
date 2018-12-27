'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder') // 用于查找空闲端口

// 如果环境变量里设置了 HOST。实际上并没有设置
const HOST = process.env.HOST
// 环境变量实际上也没有设置 PORT
const PORT = process.env.PORT && Number(process.env.PORT)
const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        // 单独样式文件（非`.vue`里面的样式）的配置
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,

    // these devServer options should be customized in /config/index.js
    // 详细选项介绍可以参考`webpack-dev-server`的文档 https://webpack.js.org/configuration/dev-server/
    devServer: {
        // inline 模式的`webpack-dev-server`，默认会显示很多信息，包括每次 HMR 时很长的构建信息
        // 这里看起来是设置为只显示 warning。不过不懂 error 和 warning 都是哪些信息。
        clientLogLevel: 'warning',
        // 使用 HTML5 History API 时，任意的 404 都会进行如下重定向
        // 不过好像只要给该属性设置为`true`就可以重定向到`index.html`
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
            ],
        },
        // HMR
        hot: true,
        // since we use CopyWebpackPlugin
        contentBase: false,
        // Gzip compression
        compress: true,
        // 因为实际环境变量并没有设置`HOST`，所以这里使用`config.dev.host`设置值：`localhost`
        // 其实这个`host`属性的默认值本来也就是`localhost`
        host: HOST || config.dev.host,
        // 因为实际环境变量并没有设置`PORT`，所以这里使用`config.dev.port`设置值：8080
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser, // 是否自动在浏览器中打开。设置的值是`false`，默认也是`false`
        // 是否全屏显示编译错误或警告
        // 如果要全屏显示，则只显示编译错误，不显示警告。但按照文档看起来，直接设置为`true`就是这种效果
        overlay: config.dev.errorOverlay
            ? { warnings: false, errors: true }
            : false,
        // `config.dev.assetsPublicPath`为`/`
        publicPath: config.dev.assetsPublicPath,
        // 代理 API 访问，因为`config.dev.proxyTable`是空对象，所以实际上就是不代理
        proxy: config.dev.proxyTable,
        // 因为使用`FriendlyErrorsPlugin`了，所以这里要设置为保持静默。
        // 参考 https://www.npmjs.com/package/friendly-errors-webpack-plugin#turn-off-errors
        quiet: true,
        watchOptions: {
            // 是否使用更低效的轮询方式来监听文件变化
            poll: config.dev.poll,
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            // 设置环境变量为开发环境的环境变量
            'process.env': require('../config/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html', // 构建生成的 HTML 文件名。默认就是这个。
            template: 'index.html', // HTML 文件的模板文件。
            inject: true // 对 JS 文件的引用注入到 body 底部。不过默认值就是 true
        }),
        // copy custom static assets
        // 将`/static/`下的静态资源拷贝到 devServer 中的资源子目录
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                // `/config/index.js`中设置的 devServer 静态资源子目录
                to: config.dev.assetsSubDirectory,
                // 不拷贝的文件
                ignore: ['.*']
            }
        ])
    ]
})

// 这里有趣的是，该配置输出的其实是 promise。也就是说，`webpack-dev-server`接收配置文件时可以接收一个待解析的 promise
// 这里使用 promise 是因为要等待`portfinder`的查询端口结果。
module.exports = new Promise((resolve, reject) => {
    // 从指定的端口开始查询，因为没有设置`highestPort`，所以会一直往更高端口查询直到65535
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else { // 找到空闲端口
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
            // add port to devServer config
            devWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
                },
                onErrors: config.dev.notifyOnErrors
                    ? utils.createNotifierCallback()
                    : undefined
            }))
            // 解析为配置对象
            resolve(devWebpackConfig)
        }
    })
})
