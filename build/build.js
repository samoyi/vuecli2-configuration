'use strict'

// 构建之前，先检测 Node.js 和 NPM 版本是否符合要求。如果不符合，将终止进程。
require('./check-versions')()

// 以生产环境构建
process.env.NODE_ENV = 'production'

// Elegant terminal spinner  https://www.npmjs.com/package/ora
const ora = require('ora')
// The UNIX command `rm -rf` for node.
const rm = require('rimraf')
const path = require('path')
// 用来给输出到终端的文字添加样式 https://www.npmjs.com/package/chalk
const chalk = require('chalk')
const webpack = require('webpack')
// 项目配置
const config = require('../config')
// webpack 生产构建配置
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
// 命令行提示正在构建
spinner.start()

// 清空之前生产构建生成的静态文件，即`/dist/static/`中的内容
// rimraf 的回调参数不管有没有错误都会被调用
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // 传入生产配置，开始构建
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    // 注意这个 err 只包括 webpack 相关的错误，比如配置错误；
    // 而不包括编译错误，比如 JS 中的语法错误
    // 虽然实际看到比如语法错误的提示也会在`stats`中出现，但并不会被明确抛出
    // 需要明确判断是否有编译错误，需要通过`stats.hasErrors()`方法
    if (err) throw err // 构建失败

    // 通过第二个参数 stats 获取到编译过程的信息
    // 详细看文档 https://webpack.js.org/api/node/#stats-object

    // `toString`方法以格式化的字符串形式返回编译信息。该方法完整的参数参考这里 https://webpack.js.org/configuration/stats/
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    // 如果有编译错误，则提示并终止进程
    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    // 构建结束，提示要在服务器环境下运行
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
