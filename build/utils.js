// 这个文件输出四个函数

'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')


// 设定构建时打包编译的静态资源的路径设置
// 即除了 html 文件和 /static/里直接搬运的文件以外的资源
// `build/webpack.base.conf.js`中的`url-loader`配置会调用这个函数来获得文件输出路径
// 生产构建时，`build/webpack.prod.conf.js`中的输出 JS 文件和 CSS 文件时也会使用这个函数
// 在本例中，生产构建时，这个函数一共会被调用六次，返回如下
// static/img/[name].[hash:7].[ext]
// static/media/[name].[hash:7].[ext]
// static/fonts/[name].[hash:7].[ext]
// static/js/[name].[chunkhash].js
// static/js/[id].[chunkhash].js
// static/css/[name].[contenthash].css
exports.assetsPath = function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
    // `assetsSubDirectory`输出目录中的静态资源子目录，默认设置的`/dist/static/`
    // `_path`参数是根据资源类型设置的具体进一步子目录以及文件名格式。例如`js/[name].[chunkhash].js`
    // 使用 POSIX 规范的路径形式 参考 https://nodejs.org/api/path.html#path_windows_vs_posix
    return path.posix.join(assetsSubDirectory, _path)
}

// 生成`loader`的 CSS 的配置对象
// 该函数会用于生成两个地方的 CSS 配置：`.vue`文件中的 CSS 会直接传参并调用该函数；独立的样式文件会先调用下面的`styleLoaders`函数，该函数内部会调用这个函数。
// 用于前者时，该函数会先在`build/vue-loader.conf.js`中被调用，生产构建时传参如下
// ```js
// {
//   sourceMap: sourceMapEnabled,
//   extract: isProduction
// }
// ```
// 返回如下
// ```sh
// {
//     "test": {},
//     "loader": "vue-loader",
//     "options": {
//         "loaders": {
//             "css": [
//                 {
//                     "loader": "D:\\gits\\vuecli2-configuration\\node_modules\\extract-text-webpack-plugin\\dist\\loader.js",
//                     "options": {
//                         "omit": 1,
//                         "remove": true
//                     }
//                 },
//                 {
//                     "loader": "vue-style-loader"
//                 },
//                 {
//                     "loader": "css-loader",
//                     "options": {
//                         "sourceMap": true
//                     }
//                 }
//             ],
//             "postcss": [
//                 {
//                     "loader": "D:\\gits\\vuecli2-configuration\\node_modules\\extract-text-webpack-plugin\\dist\\loader.js",
//                     "options": {
//                         "omit": 1,
//                         "remove": true
//                     }
//                 },
//                 {
//                     "loader": "vue-style-loader"
//                 },
//                 {
//                     "loader": "css-loader",
//                     "options": {
//                         "sourceMap": true
//                     }
//                 }
//             ],
//             "less": [
//                 {
//                     "loader": "D:\\gits\\vuecli2-configuration\\node_modules\\extract-text-webpack-plugin\\dist\\loader.js",
//                     "options": {
//                         "omit": 1,
//                         "remove": true
//                     }
//                 },
//                 {
//                     "loader": "vue-style-loader"
//                 },
//                 {
//                     "loader": "css-loader",
//                     "options": {
//                         "sourceMap": true
//                     }
//                 },
//                 {
//                     "loader": "less-loader",
//                     "options": {
//                         "sourceMap": true
//                     }
//                 }
//             ],
//             "sass": [
//                 {
//                     "loader": "D:\\gits\\vuecli2-configuration\\node_modules\\extract-text-webpack-plugin\\dist\\loader.js",
//                     "options": {
//                         "omit": 1,
//                         "remove": true
//                     }
//                 },
//                 {
//                     "loader": "vue-style-loader"
//                 },
//                 {
//                     "loader": "css-loader",
//                     "options": {
//                         "sourceMap": true
//                     }
//                 },
//                 {
//                     "loader": "sass-loader",
//                     "options": {
//                         "indentedSyntax": true,
//                         "sourceMap": true
//                     }
//                 }
//             ],
//             "scss": [
//                 {
//                     "loader": "D:\\gits\\vuecli2-configuration\\node_modules\\extract-text-webpack-plugin\\dist\\loader.js",
//                     "options": {
//                         "omit": 1,
//                         "remove": true
//                     }
//                 },
//                 {
//                     "loader": "vue-style-loader"
//                 },
//                 {
//                     "loader": "css-loader",
//                     "options": {
//                         "sourceMap": true
//                     }
//                 },
//                 {
//                     "loader": "sass-loader",
//                     "options": {
//                         "sourceMap": true
//                     }
//                 }
//             ],
//             "stylus": [
//                 {
//                     "loader": "D:\\gits\\vuecli2-configuration\\node_modules\\extract-text-webpack-plugin\\dist\\loader.js",
//                     "options": {
//                         "omit": 1,
//                         "remove": true
//                     }
//                 },
//                 {
//                     "loader": "vue-style-loader"
//                 },
//                 {
//                     "loader": "css-loader",
//                     "options": {
//                         "sourceMap": true
//                     }
//                 },
//                 {
//                     "loader": "stylus-loader",
//                     "options": {
//                         "sourceMap": true
//                     }
//                 }
//             ],
//             "styl": [
//                 {
//                     "loader": "D:\\gits\\vuecli2-configuration\\node_modules\\extract-text-webpack-plugin\\dist\\loader.js",
//                     "options": {
//                         "omit": 1,
//                         "remove": true
//                     }
//                 },
//                 {
//                     "loader": "vue-style-loader"
//                 },
//                 {
//                     "loader": "css-loader",
//                     "options": {
//                         "sourceMap": true
//                     }
//                 },
//                 {
//                     "loader": "stylus-loader",
//                     "options": {
//                         "sourceMap": true
//                     }
//                 }
//             ]
//         },
//         "cssSourceMap": true,
//         "cacheBusting": true,
//         "transformToRequire": {
//             "video": [
//                 "src",
//                 "poster"
//             ],
//             "source": "src",
//             "img": "src",
//             "image": "xlink:href"
//         }
//     }
// }
// ```
// 可以看出来，是给`.vue`文件中可能出现的不同类型的 CSS 配置不同的 loader 和规则。
exports.cssLoaders = function (options) {
    options = options || {}

    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    // generate loader string to be used with extract text plugin
    // 这个函数为每种 CSS 语言生成不同的 loader 配置
    // 第一个参数`loader`说明要为哪种预处理语言配置 loader
    // 第二个参数要是该 loader 的配置对象
    function generateLoaders (loader, loaderOptions) {
        // 最少需要`cssLoader`，如果使用`postCSS`，还要有`postcssLoader`
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

        // 如果是为预处理语言配置参数，则加上该 loader 及其配置
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    // 为不同的 CSS 语言生成不同的配置
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
    const output = []
    const loaders = exports.cssLoaders(options)

    // 生成最终的配置对象。看下面`output`的打印结果
    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }
    return output
}

// 返回一个在开发构建出错时的通知回调函数
// 在`build/webpack.dev.conf.js`中的`FriendlyErrorsPlugin`插件中被调用
exports.createNotifierCallback = () => {
    const notifier = require('node-notifier')

    return (severity, errors) => {
        if (severity !== 'error') return

        const error = errors[0]
        const filename = error.file && error.file.split('!').pop()

        notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png')
        })
    }
}
