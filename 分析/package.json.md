# package.json


## `private`
设为`private`保证该项目不会被发布到 npm registry。


## `scripts`
TODO


## `engines`
```json
"engines": {
  "node": ">= 6.0.0",
  "npm": ">= 3.0.0"
}
```
说明当前项目适用的 node 和 npm 版本


## `browserslist`
```json
"browserslist": [
  "> 1%",
  "last 2 versions",
  "not ie <= 8"
]
```
具体参考`browserslist`的笔记，但这里有实际意义的就是最后一条配置，说明该项目不会支持小于 9 以下的 IE 版本。
