// 这个模块用来检测构建时的 Node.js 版本和 NPM 版本是否满足`package.json`中要求的版本

'use strict'
// 用来给输出到终端的文字添加样式 https://www.npmjs.com/package/chalk
const chalk = require('chalk')
// 语义化版本号工具  看文档 https://www.npmjs.com/package/semver
const semver = require('semver')
const packageConfig = require('../package.json')
// Unix shell commands for Node.js  看文档 https://www.npmjs.com/package/shelljs
const shell = require('shelljs')

// 生成一个 shell 子进程然后执行命令，并获得该命令返回的字符串
// 在下面的实际使用中，是用来获取 npm 的版本号
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

// 这个数组保存当前的 Node.js 和 NPM 的当前版本以及项目要求的版本
const versionRequirements = [
  {
    name: 'node',
    // 获得当前 Node.js 版本号并使用`semver.clean`方法删掉前面的`"v"`
    currentVersion: semver.clean(process.version),
    // 获得项目要求的 Node.js 版本
    versionRequirement: packageConfig.engines.node
  }
]

// `shell.which`会搜索一个命令。如果找到了就返回绝对路径，否则返回`null`
// 这里应该是判断有没有 npm。但不懂，如果没有怎么办？
if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  const warnings = []

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]
    // 如果当前版本不满足要求版本，在命令行输出警告
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    // 终止进程
    process.exit(1)
  }
}
