# Babel Configuration

1. `webpack`模板使用`babel-preset-env`作为 Babel 的插件集。
2. Babel 会根据`browserslist`的配置规则来设置转换规则。但有一点有些坑的是，vue-cli2 使用的是`babel-preset-env`的旧版本，截止旧版本的最后一版`v1..6.1`也是存在这个坑：它不会从`package.json`中读取`browserslist`配置。
3. vue-cli2 并没有为此添加`.browserslist`文件，而是直接在`.babelrc`中配置
`browserslist`。所以，如果你要修改项目的`browserslist`配置，你除了要修改
`package.json`中的，还要专门为 Babel 在`.babelrc`中再同样修改。
4. 不过在`babel-preset-env`的 beta 版本`@babel/preset-env`已经修复了这个问题。


## References
* [官方文档](https://vuejs-templates.github.io/webpack/babel.html)
