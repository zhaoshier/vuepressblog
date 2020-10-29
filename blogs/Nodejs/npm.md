---
title: npm知识总结
date: 2020-10-29
tags:
 - Node.js
categories:
 -  Node.js
---

#### 一. package.json的两种产生方式   
###### 1.npm init执行产生
我们在执行 npm init 的时候,会有一个初始化 pacakge.json 过程，然后一路回车，其实可以直接使用 npm init --yes 在命令后追加 --yes 参数即可，其作用与一路回车相同，这样生成的文件中就包含 package.json 文件

###### 2.自定义 npm init 行为

#### 二.package.json 中的常规属性

###### 1.dependencies和devDependencies两个npm依赖包      
**dependencies**    
可通过以下命令把包安装到此依赖项中
```js
npm install packageName -S
//or
npm i packageName -S
//or
npm i packageName -save

//指定版本包，eg:
npm i vue@3.0.1 -S
```

**devDependencies**    
添加到devDependencies中的包只在开发环境中被安装和管理，不会安装到生产环境中。
```js
 "devDependencies": {
      "jest": "^24.3.1", //用于测试的jest
      "eslint": "^6.1.0",  // 检测代码规范
 }
```
可通过以下命令把包安装到此依赖项中
```js
npm install packageName -D
```
 **dependencies和devDenpendencies的对比：**
- devDependencies 主要是存放用于本地开发的
- dependencies 会在我们开发的时候带到线上
- -D 会添加到 devDependencies 里面，-S 会添加到 dependencies
- --save-dev 也会添加到 devDependencies
- --save 会添加到 dependencies
- 从npm 5.x开始，如果什么参数都不带，那么默认添加到 dependencies 中

```js
  // 添加到 devDependencies
  npm install -D xxxx
  // 添加到 dependencies
  npm install -S xxxx
```
###### 2.bin
**bin 字段指定了各个内部命令对应的可执行文件的位置。** 如果全局安装模块包，npm 会使用符号链接把可执行文件链接到 /usr/local/bin，如果项目中安装，会链接到 ./node_modules/.bin/。
```js
"bin": {
    "vm2": "./bin/vm2"
  },
```
上例中的包安装到全局时：npm 会在 /usr/local/bin 下创建一个以 vm2 为名字的软链接，指向全局安装的 vm2 包下的 "./bin/index.js"。这时你在命令行执行 vm2， 则会调用链接到的这个 js 文件。

###### 3.main
```js
{
  "main": "lib/index.js",
}
```
main 属性指定程序的主入口文件，其他项目在引用这个 npm 包时，实际上引入的是 lib/index 中暴露出去的模块。

###### 4.script
**(1)什么是 npm script 脚本?**  
在生成的 package.json 文件中，有一个 scripts 对象，在这个对象中，npm 允许使用 scripts 字段定义脚本命令。
```js
"scripts": {
    "test": "test.js"
    "build": "tsc",
  },
```
scripts 对象中每一个属性，对应一段脚本。比如，test 命令对应的脚本是 node test.js。  
使用 **npm run** 命令，就可以执行这段脚本.    

**(2)原理**  
每次运行scripts中的一个属性时(npm run)，实际项目都会**自动**新建一个shell，在这个shell中执行指定的脚本命令。     
因此，**能在shell中执行的脚本，都可写在npm scripts中。**


*举例*：   
当前项目的依赖里面有 Mocha，只要直接写 mocha test 就可以了。
```js
"test": "mocha test"
```
而不用写成下面这样。
```js
"test": "./node_modules/.bin/mocha test"
```
然后我们就可以直接执行 npm run test 了。npm 脚本的退出码，也遵守 Shell 脚本规则。如果退出码不是0，npm 就认为这个脚本执行失败。

**(3)node_modules目录下的.bin文件是哪里来的？**  

打开node_modules/.bin/tsc下的文件，里面的内容是这样的：
```js
#!/usr/bin/env node
require('../lib/tsc.js')
```
npm install 安装的某个模块，如果模块在 package.json 中配置了 bin 属性，在安装时候会自动软链接到 node_modules/.bin 中，举个例子：如 mocha 源码 配置了：
```js
{
    "name":"mocha",
    "bin":{
        "mocha":"./bin/mocha"
    }
}
```

**(4)两个默认脚本**      
正常情况下，npm 脚本是用户自己定义。但 npm 本身对两个脚本提供了默认值，这两个脚本不用在 script 属性中定义，可以直接使用：
```js
npm run start
npm run install
```
```js
"start": "node server.js"
"install": "node-gyp rebuild"
```
- npm run start 的默认值是 node server.js ，前提是根目录下有 server.js 这个脚本
- npm run install 的默认值是 node-gyp rebuild，前提是根目录下有 binding.gyp 文件
 

**(4)钩子(声明周期)**      
package.json 中的 script 也是有生命周期的。npm 脚本有两个钩子，pre 和 post，当我们执行start脚本时候，start 的钩子就是 prestart 和 poststart。      
当执行 npm run start 的时候，npm 会自动按照下面的顺序执行
```js
npm run prestart && npm run start && npm run poststart
```

**(4) env 环境变量**   
在执行 npm run 脚本时候, npm 会设置一些特殊的env环境变量。其中package.json中的所有字段，都会被设置为以npm_package_开头的环境变量。看个简单的例子:
```js
{
  "name": "npm-demo",
  "version": "1.0.0",
  "script": {
    "build": "webpack --mode=production"
  },
  "files": ["src"]
}
```
可以得到 npm_package_name、npm_package_version、npm_package_script_build、npm_package_files_0等变量。注意上面 package.json 中对象和数组中每个字段都会有对应的环境变量.
> 强调：这些环境变量只能在 npm run 的脚本执行环境内拿到，正常执行的 node 脚本是获取不到的。所以，不能直接通过 env $npm_package_name 的形式访问，但可以在 scripts 中定义脚本"scripts": {"bundle": "echo $npm_package_name"}来访问。

**环境变量常用小技巧**    
1. env 命令可以列出所有环境变量
```js
npm run env
```
2. 在shell脚本中输出环境变量
```js
echo PATH
```
3. 在 shell 脚本设置环境变量
```js
echo PATH = /usr/local/lib
```

#### 三.npm配置
###### 1.npm config   
npm cli 提供了 **npm config** 命令进行 npm 相关配置，通过** npm config ls -l **可查看 npm 的所有配置，包括默认配置。npm 文档页为每个配置项提供了详细的说明 https://docs.npmjs.com/misc/config .修改配置的命令为 **npm config set**      

常见重要配置:
- proxy, https-proxy: 指定 npm 使用的代理；
- registry 指定 npm 下载安装包时的源，默认为 https://registry.npmjs.org/ 可以指定为私有 Registry 源；
- package-lock 指定是否默认生成 package-lock 文件，建议保持默认 true；
- save true/false 指定是否在 npm install 后保存包为 dependencies, npm 5 起默认为 true；


删除指定的配置项命令为 npm config delete key.
这里最常见的一个操作是 npm 太慢，设置淘宝镜像:
```js
npm config set registry https://registry.npm.taobao.org
```
恢复使用之前的 npm :
```js
npm config set registry https://registry.npmjs.org
```


###### 2.env 环境变量

若env环境变量中存在以npm_config_为前缀的环境变量，则会被识别为npm的配置属性。比如在env环境变量中设置npm_config_package_lock变量：
```js
export npm_config_package_lock=false //修改的是内存中的变量，只对当前终端有效
```
这时候执行npm install，npm会从环境变量中读取到这个配置项，从而不会生成package-lock.json文件。

> 注：    
> 1. 查看某个环境变量：echo $NODE_ENV    
> 2. 删除某个环境变量：unset NODE_ENV

###### 3.npmrc 文件
除了用 npm config 命令显示更改 npm 配置，还可以通过 npmrc 文件直接修改配置。