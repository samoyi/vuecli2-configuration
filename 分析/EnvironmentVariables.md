# Environment Variables

## 为不同的环境设置不同的配置
1. Sometimes it is practical to have different config values according to the environment that the application is running in. As an example:
    ```js
    // config/prod.env.js
    module.exports = {
      NODE_ENV: '"production"', // 下面的配置是针对生产环境的
      DEBUG_MODE: false,
      API_KEY: '"..."' // this is shared between all environments
    }

    // config/dev.env.js
    module.exports = merge(prodEnv, {
      NODE_ENV: '"development"', // 下面的配置是针对开发环境的
      DEBUG_MODE: true // this overrides the DEBUG_MODE value of prod.env
    })

    // config/test.env.js
    module.exports = merge(devEnv, {
      NODE_ENV: '"testing"' // 下面的配置是针对生产环境的
    })
    ```
2. Note: string variables need to be wrapped into single and double quotes `'"..."'`。不懂原因
3. So, the environment variables are:
    * Production
        * NODE_ENV = 'production',
        * DEBUG_MODE = false,
        * API_KEY = '...'
    * Development
        * NODE_ENV = 'development',
        * DEBUG_MODE = true,
        * API_KEY = '...'
    * Testing
        * NODE_ENV = 'testing',
        * DEBUG_MODE = true,
        * API_KEY = '...'


## 在不同的构建过程中设定不同的环境变量
1. 比如在`build/build.js`，有如下设置
    ```js
    process.env.NODE_ENV = 'production'
    ```
2. 这样，在构建过程中读取配置时，就知道应该读取生产环境的配置，并做一些只在生产环境才会做的事情，或者不做一些不能在生产环境做的事情。例如下面，如果判断是生产环境，会使用生产环境 tip。


## Usage
It is simple to use the environment variables in your code. For example:
```js
Vue.config.productionTip = process.env.NODE_ENV === 'production'
```
