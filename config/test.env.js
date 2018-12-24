// 设置测试环境的环境变量
// 测试环境的环境变量继承自开发环境的环境变量，如果有相同的则覆盖

'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"'
})
