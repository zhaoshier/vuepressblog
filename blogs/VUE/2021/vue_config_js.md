---
title: vue.config.js配置proxy实现代理跨域
date: 2021-01-08
tags:
 - Vue
categories: 
 - Vue
---

### 1.需配置“代理跨域”的情况
后端有单独的开发服务器API，希望前端可以在同域名下发送API请求。

> 注：代理只能用在开发环境，生产环境下还是需要后端处理好跨域，且生产接口的域名也需要配置

### 2.vue.config.js配置文件
```js
module.exports = {
  // 基本路径
  publicPath: './', // vue-cli3.3+新版本使用
  // 输出文件目录
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 生成的静态资源在它们的文件名中包含了 hash。
  filenameHashing: false,
  // 以多页模式构建应用程序。
  pages: undefined,
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: true,
  // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  transpileDependencies: [],
  // 生产环境是否生成 sourceMap 文件，一般情况不建议打开
  productionSourceMap: false,
  // webpack配置
  // 对内部的 webpack 配置进行更细粒度的修改 https://github.com/neutrinojs/webpack-chain see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => { },
  // 调整 webpack 配置 https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
  configureWebpack: () => {},
  // css相关配置
  css: {
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true,
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项，支持的 loader 有css-loader postcss-loader sass-loader less-loader stylus-loader
    loaderOptions: {
      // sass: {
      //   prependData: `
      //   @import "@/styles/global.scss";
      //   `
      // }
    }
  },
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
  parallel: require('os').cpus().length > 1,
  // PWA 插件相关配置
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    // 配置自动启动浏览器
    open: true,
    host: '127.0.0.1',//can be overwritten by process.env.HOST
    port: 8095,//can be overwritten by process.env.PORT
    https: false,
    // 热更新
    hotOnly: true,
    // 代理配置
    proxy: {
			'/g3': {
				target: 'http://10.2.102.15:8084/g3',//接口域名
				changeOrigin: true,// 允许跨域
				ws: false,
				secure: false,  // 如果是https接口，需要配置这个参数
				pathRewrite: {
					'^/g3': '' // 重写地址，将前缀 '/g3' 转为 '/'
				}
			},
		}
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
}
```

### 3.解决跨域原理
```js
changeOrigin:true,
```
设置为true，本地就会虚拟一个服务器接收你的请求并代你发送该请求

### 4.代理路径配置
4.1
```js
module.exports = {
    //...
    devServer: {
        host: '127.0.0.1',
        port: 8095,
        proxy:{
             '/g3': 'http://10.2.102.15:8084'
        }
    }
}
```
```
将请求地址：http://127.0.0.1：8085/g3/xxx 代理到 http://10.2.102.15:8084/g3/xxx
```
4.2
```js
module.exports = {
    //...
    devServer: {
        host: '127.0.0.1',
        port: 8095,
        '/g3': {
				target: 'http://10.2.102.15:8084',
				pathRewrite: {
					'^/g3': '' 
				}
			},
    }
}
```
```
将请求地址：http://127.0.0.1：8085/g3/xxx 代理到 http://10.2.102.15:8084/xxx
```
4.3     
- 若不想代理所有请求，则可基于一个函数的返回值绕过代理    
- 在函数中可以访问请求体、响应体和代理选项。必须返回 false 或路径，来跳过代理请求。    

eg：对于浏览器请求，你想要提供一个 HTML 页面，但是对于 API 请求则保持代理，实现如下：
```js
module.exports = {
    //...
    devServer: {
        host: '127.0.0.1',
        port: 8095,
        '/g3': {
				target: 'http://10.2.102.15:8084',
				//通过以下函数来过滤请求类型
				bypass: function(req, res, proxyOptions) {
                    if (req.headers.accept.indexOf('html') !== -1) {
                        console.log('Skipping proxy for browser request.');
                        return '/index.html';
                    }
                }
			},
    }
}
```
[文章参考](https://www.cnblogs.com/deng-jie/p/12395742.html)




