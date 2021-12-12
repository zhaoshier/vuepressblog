---
title: vue-router的路由模式
date: 2021-07-23
tags:
 - VueRouter
categories: 
 - VueRouter
---

做了半年的vue项目，发现自己对Vue Router的语法了解甚少，更别提怎么灵活使用，痛定思痛，决心在一个月内，掌握Vue Router的语法的使用。今天首先从Vue Router的路由模式开始学习。  

vue中的router有两种模式：hash模式（默认）、history模式（需配置mode: 'history'），hash 模式和 history 模式都属于浏览器自身的特性，Vue-Router 只是利用了这两个特性（通过调用浏览器提供的接口）来实现前端路由。      
### 1.hash模式的实现原理
早期的前端路由就是基于location.hash实现的。hash的值就是url中#后面的内容，eg：https://www.word.com#search 此时hash值为#search

- URL中的hash值只是客户端的一种状态，当向服务端发送请求时，hash部分不会被发送；因此，改变hash不会重新加载页面。
- hash值得改变，都会在浏览器的访问历史中增加一个记录。因此，能通过浏览器的回退、前进按钮控制hash的切换。
- 可通过a标签并设置href属性，当用户点击这个标签后，URL的hash值会发生变化。也可对location.hash赋值，改变URL的hash值。
- 可用haschange事件监听hash值的变化，进行渲染页面。
```js
window.addEventListener('hashchange', () => {
   // 把改变后的url地址栏的url赋值给data的响应式数据current，调用router-view去加载对应的页面
   this.data.current = window.location.hash.substr(1)
})
```

### 2.history模式的实现原理
-  h5中新增两个神器pushState()和replaceState()方法，实现URL跳转而无需重新加载页面。
 ```js
  window.history.pushState(null, null, path) //新增一个历史记录
  window.history.replaceState(null, null, path) //替换一个历史记录
 ```
-  pushState方法、replaceState方法，只能导致history对象发生变化，从而改变当前地址栏的URL，但浏览器不会向后端发送请求，也不会触发popstate事件的执行。
 
-  可以使用popstate事件监听URL的变化，进行渲染页面。但popstate事件的执行是在点击浏览器的前进后退按钮的时候，才会被触发

```js
window.addEventListener('popstate', () => {
  this.data.current = window.location.pathname
})
```

### 3.history模式的问题
因vue为单页面应用，history式中，pushState() 和 replaceState() 这两个神器的作用就是可以将url替换并且不刷新页面，好比挂羊头卖狗肉，http并没有去请求服务器该路径下的资源，一旦刷新就会暴露这个实际不存在的“羊头”，显示404（因为浏览器一旦刷新，就是去真正请求服务器资源）

那么如何去解决history模式下刷新报404的弊端呢，这就需要服务器端做点手脚，将不存在的路径请求重定向到入口文件（index.html），前后端联手，齐心协力做好“挂羊头卖狗肉”的完美特效

### 4.history模式 <font color=#3eaf7c>vs</font> hash模式
- pushState() 设置的新 URL 可以是与当前 URL 同源的任意 URL；而 hash 只可修改 # 后面的部分，因此只能设置与当前 URL 同文档的 URL
- pushState() 设置的新 URL 可以与当前 URL 一模一样，这样也会把记录添加到栈中；而 hash 设置的新值必须与原来不一样才会触发动作将记录添加到栈中
- pushState() 通过 stateObject 参数可以添加任意类型的数据到记录中；而 hash 只可添加短字符串
- pushState() 可额外设置 title 属性供后续使用
### 5.简单实现Vue Router
Vue Router的核心是，通过Vue.use注册插件，在插件的install方法中获取用户配置的router对象，当浏览器地址发生变化时，根据router对象匹配相应路由，获取组件，并将组件渲染到视图上。
