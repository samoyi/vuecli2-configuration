# Build Commands

功能简述直接看[文档](https://vuejs-templates.github.io/webpack/commands.html)


## `npm run dev`
```json
"dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js"
```
1. 执行该命令时，会启动`webpack-dev-server`
2. 后面两个参数告诉`webpack-dev-server`使用`inline`模式和`progress`模式。不过似乎`webpack-dev-server`默认就是`inline`模式，而`progress`模式的效果还没有看出来。
3. 第三个参数是告诉 webpack 进行构建时要使用的配置文件。可以看到，因为这是开发环境，所以指定的配置文件的开发环境下的。


## `npm run build`
webpack 构建。逻辑见`/build/build.js`中的说明
