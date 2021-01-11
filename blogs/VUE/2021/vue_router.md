---
title: vue-router学习总结
date: 2020-11-22
subSidebar: true
tags:
 - vue
categories:
 -  vue
keys:
 - 'e10adc3949ba59abbe56e057f20f883e'
---

Vue Router是vue的路由管理器。
主要功能：嵌套路由/视图表；模块化的、基于组件的路由配置；路由参数、查询、通配符等；

### 一：如何使用
引入Vue Router，将组件（components）映射到路由（route），并告诉Vue Router在哪里渲染组件。    
通过```<router-link to="/foo">Go to Foo</router-link>```进行导航链接    
通过```<router-view></router-view>```渲染路由匹配到的组件
```js
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar<router-view/></div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
const routes = [
  { name:'foo',path: '/foo/:id', component: Foo }, //动态路径参数
  { name:'bar',path: '/bar', component: Bar,  // 嵌套路由
  	children:[
  		{
  		name:'bar-foo',
  		path:'foo',
  		component:Foo
  		}
  	]
  }
]

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')
```

全局可以通过```this.$router``` 访问路由器，也可以通过 ```this.$route``` 访问当前路由。

```js
export default {
  computed: {
    username() {
      return this.$route.params.username //通过params和qurry来获取路由参数
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
```

**不同路由导航复用组件时，组件实例不会销毁再创建，需要通过```watch```监听```$route```对象的变化，或者使用```beforeRouteUpdate```导航守卫来响应变化**。

```js
watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    }
  }
beforeRouteUpdate (to, from, next) {
   // react to route changes...
   // don't forget to call next()
 }
```

### 二：导航方法
1、使用```<router-link to="{ name: 'user', params: { userId: 123 }}">```来创建a标签定义导航链接

补充：```<a>```标签与```<router-link>```的区别：```<a>```标签的click事件会跳转和刷新页面。```router-link```取消了a标签的默认跳转事件，而是获取跳转href，用history修改路由，局部更新页面。    

2、通过```this.$router.push(location)```来导航，向history栈添加一个新的记录，可以通过后退回到上一个URL。

3、通过```this.$router.replace(location)```来导航不会向 history 添加新记录，而是 替换掉当前的 history 记录。   
4、```router.go(n)```，在 history 记录中向前或者后退多少步，类似 ```window.history.go(n)```。 

**location只能是对象，属性要么是name和params，要么是path带有参数。**

```js
const userId = '123'
const router = this.$router
router.push({ name: 'user', params: { userId }}) // -> /user/123  //路由名称+参数
router.push({ path: `/user/${userId}` }) // -> /user/123  //路径+参数
router.replace({ path: `/user/${userId}` }) // -> /user/123  //路径+参数
```

### 三、导航守卫
全局前置守卫：```router.beforeEach()```; 参数```next()```函数必须被调用一次。
```js
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) {
  	next({ name: 'Login' })
  }
  else {
  	next()
  }
})
```

**全局解析守卫**： ```router.beforeResolve```
是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。    
**全局后置钩子**：```router.afterEach((to, from) => {…})``` ，不会改变导航本身。    
**路由的守卫**：```beforeEnter()```

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

组件内的守卫：
- ```beforeRouteEnter ()``` // 在此处不能获取组件实例this
- ```beforeRouteUpdate ()``` // 在当前路由改变，但是该组件被复用时调用，根据路径动态参数判断
- ```beforeRouteLeave()```

```js
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

导航解析流程：

1. 导航被触发。
1. 在失活的组件里调用 **beforeRouteLeave** 守卫。
1. 调用全局的 beforeEach 守卫。
1. 在重用的组件里调用**beforeRouteUpdate** 守卫。
1. 在路由配置里调用 beforeEnter。
1. 解析异步路由组件。
1. 在被激活的组件里调用 **beforeRouteEnter**。
1. 调用全局的 **beforeResolve** 守卫 (2.5+)。
1. 导航被确认。
1. 调用全局的 **afterEach** 钩子。
1. 触发 DOM 更新。 此处是vue生命周期钩子函数。
1. 调用 **beforeRouteEnter** 守卫中传给 next的回调函数，创建好的组件实例会作为回调函数的参数传入。

###  四、切换路由自定义滚动位置
 在创建Router实例时，定义一个scrollBehavior方法，接收to、from、和savedPosition参数。（只支持通过浏览器前进后退按钮触发的页面）
 
 ```js
 const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
    return savedPosition  //浏览器原生表现
  } else {
    return { x: 0, y: 0 }  // 让页面滚动到顶部
  } 
}
  }
})
 ```
 
###  五、路由模式（hash / history）
**路由类型**：   

**前端路由**：根据不同的url更新页面内容时，不向后端发送请求，不刷新页面，根据路由在虚拟DOM中加载所需要的数据，实现页面的改变。（单页面应用中，大部分页面结构不变情况下使用）（缺点：使用浏览器的前进、后退键、刷新会重新发送请求，没有合理利用缓存）

**后端路由**：在浏览器的地址栏中切换不同的url时，每次都向后台服务器发出请求，服务器根据不同的响应不同的数据，浏览器接收到数据后再进行渲染，所以后端路由会刷新页面。



**vue Router的路由模式（前端路由）：**   

**hash模式（默认**）：url中带有#值，hash值的变化会触发hashchange事件，以实现页面部分内容更新。hash值的变化不会导致浏览器向服务器发出请求。因为仅hash符号之前的内容会被包含在请求中，刷新浏览器时发送请求也不会出现404。 

**history模式**：利用 HTML5 History Interface 的pushState()和replaceState()方法对历史记录栈进行修改，改变了URL也不会立即发送请求。（缺点：输入url或者刷新页面时，发送请求可能访问不到资源。需要服务端将请求重定向到首页，此时需要客户端设定一个优先级最低的404页面路由。）

**原理：**
根据你选择的mode 类型创建不同的history对象：
```js
switch (mode) {
  case 'history':
    this.history = new HTML5History(this, options.base)
    break
  case 'hash':
    this.history = new HashHistory(this, options.base, this.fallback)
    break
  case 'abstract':
    this.history = new AbstractHistory(this, options.base)
    break
  default:
    if (process.env.NODE_ENV !== 'production') {
      assert(false, `invalid mode: ${mode}`)
    }
}
```

**hash原理：创建hashHistory对象**   
```hashHistory.push(’/blog’)``` 和 ```hashHistory.replace(’/blog’)```两个方法实现历史访问栈的更改。```push()```方法是将新路由添加到浏览器访问历史的栈顶，```replace()```方法是替换掉当前的路由。手动改变hash值可以通过```onhashchange()```事件监听。

**history原理：创建HTML5History对象**    
利用```History interface的back()、forward()、go()```读取浏览器历史记录栈的信息，```pushState()、replaceState()``` 对浏览器历史记录栈进行修改。前进后退可以记录页面滚动位置。

```js
window.history.pushState(stateObject, title, URL)
window.history.replaceState(stateObject, title, URL)

// stateObject: 当浏览器跳转到新的状态时，将触发popState事件，该事件将携带这个stateObject参数的副本
// title: 所添加记录的标题
// URL: 所添加记录的URL
```

区别：

- pushState设置的新URL可以是与当前URL同源的任意URL；而hash只可修改#后面的部分，故只可设置与当前同文档的URL
- pushState通过stateObject可以添加任意类型的数据到记录中；而hash只可添加短字符串
- pushState可额外设置title属性供后续使用
- history模式则会将URL修改得就和正常请求后端的URL一样,如后端没有配置对应/user/id的路由处理，则会返回404错误

### 六、路由跳转原理
从设置路由改变到视图更新的流程：   
1、通过```$router.push()```方法修改路由：
```js
--> $router.push()  // 调用方法
--> HashHistory.push() // 设置hash并添加到浏览器历史记录栈顶，调用 History.transitionTo()方法
// --> HTML5History.push() // history模式下
--> History.transitionTo()  // 检测更新，更新则调用History.updateRoute()
--> History.updateRoute() // 更新路由，会修改_route属性，_route属性是响应式的，会自动调用vue实例的render()方法。

--> {app._route = route} // 替换当前app路由
--> vm.render() // 更新视图
```

2、手动修改url会触发```hashchange()```监听事件或```popstate()```监听事件，其中调用```HashHistory.replace()```方法或```HTML5History.replace()```方法，```History.transitionTo()```方法检测更新。 

**总结**：路由变化 --> ```history.push()```或```history.replace()``` --> ```push()```或```repalce()```方法中调用```History.transitionTo()```检测更新，其中一个参数为修改路由方法 --> 路由更新就调用```History.updateRoute()```，修改```_route```响应式属性，调用```render()```方法渲染组件。

### 七、路由懒加载
路由懒加载是由vue的**异步组件**和**webpack的代码分割功能**实现的。  
通过webpack编译打包后，会把每个路由组件的代码分割成一个个js文件，初始化不会加载这些js文件。
vue异步组件：
```js
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请求加载
  require(['./my-async-component'], resolve)
  // resolve 回调，这个回调函数会在你从服务器得到组件定义的时候被调用。
})
```

```js
Vue.component(
  'async-webpack-example',
  // 这个动态导入会返回一个 `Promise` 对象。
  () => import('./my-async-component')  
)
```

路由配置不变：
```js
const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo }
  ]
})
```