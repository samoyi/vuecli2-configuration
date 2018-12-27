'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
// 用来把`/static/中的文件拷贝到构建目录`
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 自动生成 HTML 文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 用于提取 CSS 为独立的文件
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 优化和压缩 CSS。关于压缩，官方文档提到了可以识别重复的 entry
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// 如果当前不是测试环境，则设置环境变量为生产环境的环境变量
const env = process.env.NODE_ENV === 'testing'
    ? require('../config/test.env')
    : require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
    module: {
        // 单独样式文件（非`.vue`里面的样式）的配置
        // 相比于开发构建，这里还会提取 CSS 为单独的文件
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        // The DefinePlugin allows you to create global constants which can be configured at compile time.
        new webpack.DefinePlugin({
            // 设置环境变量为上面确定的测试或生产环境的环境变量
            'process.env': env
        }),

        new UglifyJsPlugin({
            // 文档对`uglifyOptions`的说明是“UglifyJS minify options.”。不懂什么意思。文档对`options`给出了连接
            uglifyOptions: {
                // pass `false` to skip compressing entirely. Pass an object to specify custom compress options.
                compress: {
                    // 对`warning`的解释是 display warnings when dropping unreachable code or unused declarations etc.默认就是 false。不懂
                    warnings: false
                }
            },
            // `productionSourceMap`设置的值为`true`
            sourceMap: config.build.productionSourceMap,
            // Use multi-process parallel running to improve the build speed. Default number of concurrent runs: `os.cpus().length - 1`.
            // Parallelization can speedup your build significantly and is therefore highly recommended.
            parallel: true
        }),
        // extract css into its own file
        new ExtractTextPlugin({
            // 提取生成的 css 文件路径
            filename: utils.assetsPath('css/[name].[contenthash].css'),
            // Setting the following option to `false` will not extract CSS from codesplit chunks.
            // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
            // 下面的说明不懂
            // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
            // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
            allChunks: true,
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: config.build.productionSourceMap
            ? { safe: true, map: { inline: false } }
            : { safe: true }
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: process.env.NODE_ENV === 'testing'
                ? 'index.html'
                : config.build.index,
            // HTML 的模板文件
            template: 'index.html',
            // 构建生成的 JS 文件被插入到 HTML `body`底部
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            // 不懂。如果有多个 JS 插入，难道按照依赖顺序插入不是必然的吗？为什么还有其他选项
            chunksSortMode: 'dependency'
        }),
        // keep module.id stable when vendor modules does not change
        // 不懂
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        // 不懂
        new webpack.optimize.ModuleConcatenationPlugin(),

        // split vendor js into its own file
        // 下面三个`CommonsChunkPlugin`因为在 webpack 中被使用了而且比较麻烦，懒得看了 TODO
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks (module) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        // This instance extracts shared chunks from code splitted chunks and bundles them
        // in a separate chunk, similar to the vendor chunk
        // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            async: 'vendor-async',
            children: true,
            minChunks: 3
        }),

        // copy custom static assets
        // 将`/static/`下的静态资源拷贝到构建输出目录的静态资源子目录
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ]
})

// 压缩静态资源。
// 在 /config/index.js 中设置的是不压缩
if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            // 看起来是生成的文件的路径，不过文档里并没有该属性。不懂
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            // 大于 10240bytes 才压缩
            threshold: 10240,
            // 压缩比优于 0.8 的才会被处理。不懂具体怎么实现
            minRatio: 0.8
        })
    )
}

// 生成构建分析报告
// 在 /config/index.js 中设置的是不生成
// 如果生成，会打开一个新网页来显示构建分析报告
if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
