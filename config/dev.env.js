// 设置开发环境的环境变量
// 开发环境的环境变量继承自生产环境的环境变量，如果有相同的则覆盖

'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
