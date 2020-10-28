---
title: this的指向问题
date: 2020-10-14
tags:
 - Javascript
categories:
 -  Javscript
---

每次函数调用都会包含一个this对象。this也叫**调用上下文**，它是一个关键字，而不是一个变量，所以不能通过赋值语句自定义。   

 **this指向**：this的指向不取决于函数定义的时候，而取决于被调用的位置。**this的实际指向是最终调用它的那个对象。**

**this绑定有4种方式：**
1. 默认绑定
2. 隐式绑定
3. 构造函数绑定
4. 硬绑定(apply, call, bind)

### 1.默认绑定
默认绑定一般发生在回调函数，或函数直接调用中
```js
example 1：

function f(){
    console.log(this);
}
f()  //window

//严格模式下:
function f(){
    'use strict'
    console.log(this);  
}
f() //undefined
```
按照上面所说，this最终的指向是调用它的对象，example中的函数f实际上是被window对象调用出来的，所以this的指向为window。


```js
example 2：

var name = 'zhaoshier'
function f(){
    console.log("name=="+this.name) //zhaoshier
    console.log("this=="+this) //window
}
f()

//把var改成let
let name = 'zhaoshier'
function f(){
    console.log("name=="+this.name) //undefined
    console.log("this=="+this) //window
}
f()
```
example 2中，我们只是将var改成let，输出就变成了undefined。这是因let, const定义的变量，即时在最外层也不会变成window的属性，只有var定义的变量才会成为window的属性。

### 2.隐式绑定
谁调用，就指向谁
```js
example 3：

var per = {
    user:'zhaoshier',
    fn:function(){
      console.log(this.user) //zhaoshier
    }
}    
per.fn()
```
example 3中，this的指向的是对象per，因为是per调用的fn，即per.fn()。在这里再强调一次，this的指向是在函数调用的时候确定的！！

实际上，example1 和example 3说的并不是很准确严谨，当函数被嵌套调用的时候，this到底指向哪个哪呢？来看下面几个例子：
```js
example 4：

var per = {
    user:'zhaoshier',
    fn:function(){
      console.log(this.user) //zhaoshier
    }
}    
window.per.fn()
```
这段代码与example 3几乎一样，按照上述理论，this的最终指向是调用它的对象。（window是js中的全局对象，我们创建的变量实际上是给window添加属性，所以这里可以用window点per对象。）    
但example 4中的this并没有指向window。
```js
example 5:

var obj = {
    a:1,
    b:{
        a:2,
        fn:function(){
            console.log(this.a) //2
        }
    }
}
obj.b.fn();
```
同样，这里的this并没有指向最外层调用的obj，而是仍指向b。这是为什么呢？example 1和example 3是指向调用它的对象，这里却没有指向最终调用它的对象。
来看下面这句话，你将会明白为什么。
> 1. 如果一个函数中有this，但它没有被上一级的对象所调用，那么this指向的就是window；严格模式下，this的指向为undefined。
> 2. 如果一个函数中有this，这个函数有被上一级的对象所调用，那么this指向的就是上一级的对象。
> 3. 如果一个函数中有this，这个函数中包含多个对象，尽管这个函数是被最外层的对象所调用，this指向的也只是它上一级的对象。如example 5所示

下面在看几个例子，验证上述的结论：
```js
example 6:

var obj = {
    a:1,
    b:{
        fn:function(){
            console.log(this.a) //undefined
        }
    }
}
obj.b.fn();
```
example 6中，尽管对象b中没有属性a，this的指向也是它的上一级对象b，不管这个对象中有没有this要的东西。   

再看一个让人迷惑的例子:
```js
example 7:
var obj = {
    a:1,
    b:{
        a:2,
        fn:function(){
            console.log(this.a) //undefined
            console.log(this) //window
        }
    }
}
var j = obj.b.fn;
j()
```
example 7中this的指向为window。看完example 5和example 7是不是有些凌乱了。    
这里要注意一句话：**this永远指向的是最后调用它的对象，也就是看它执行的时候是谁调用的。**    
example 7中虽然函数fn是被对象b所引用，但是在将fn赋值给变量 j 的时候并没有执行。所以最终指向的是window，这和example 5是不一样的，example 5是直接执行了fn。



### 3.构造函数绑定
```js
example 8：

function Per(){
    this.user = "zhaoshier"
}
var student = new Per();
console.log(student.user) //zhaoshier

//注意：要用this.user, 若用var user,则输出为undefined
function Per(){
    var user = "zhaoshier"
}
var student = new Per();
console.log(student.user) //undefined
```
new关键字可以改变this的指向，new在创建一个对象实例时，相当于复制了一份Per到对象student中，所以this也就指向了student。

除了上面这些，我们还可自行改变this指向，可用call，apply，bind来指定this的环境。
### 4.硬绑定
---call, apply, bind

先复习一下前面的两个例子：
```js
example 9:

var per = {
    user:'zhaoshier',
    fn:function(){
      console.log(this.user)
    }
}    
var aa = per.fn; 
aa(); //undefined
```
```js
example 10:

var per = {
    user:'zhaoshier',
    fn:function(){
      console.log(this.user) 
    }
}    
per.fn(); //zhaoshier
```
有时候，我们不得不将对象保存到另外一个变量中，但用example 9中的方法，打印per对象里的user却是undefined。   
为了实现将对象保存到另一变量但还可打印出对象中的某些属性，可用下面这些方法。

#### (1) call()
```js
example 11:

var per = {
    user:'zhaoshier',
    fn:function(){
      console.log(this.user)
    }
}    
var aa = per.fn; 
aa.call(per); //zhaoshier
```
通过call方法，将变量aa与对象per绑定，使得aa中this就指向了per对象。
call方法可以添加多个参数：
```js
example 12:

var per = {
    user:'zhaoshier',
    fn:function(x1,x2){
      console.log(this.user) //zhaoshier
      console.log(x1+x2) //3
    }
}    
var aa = per.fn; 
aa.call(per,1,2); 
```
#### (2) apply()
apply也可改变this的指向
```js
example 13:

var per = {
    user:'zhaoshier',
    fn:function(){
      console.log(this.user)
    }
}    
var aa = per.fn; 
aa.apply(per); //zhaoshier
```
apply方法也可以有多个参数，但其第二个参数必须为一个数组
```js
example 14:

var per = {
    user:'zhaoshier',
    fn:function(x1,x2){
      console.log(this.user) //zhaoshier
      console.log(x1+x2) //3
    }
}    
var aa = per.fn; 
aa.apply(per,[1,2]); 
```

**注意：** 若call和apply的第一个参数为null，则this指向的是window对象。
```js
example 15:

var per = {
    user:'zhaoshier',
    fn:function(){
      console.log(this)
    }
}    
var aa = per.fn; 
aa.call(null); //window
aa.apply(null); //window
```
#### (3) bind()
```js
example 16:

var per = {
    user:'zhaoshier',
    fn:function(){
      console.log(this.user)
    }
}    
var aa = per.fn; 
aa.bind(per); 
```
执行example 16，发现代码没有输出。这就是bind与call/apply方法的不同，bind方法返回的是一个修改过后的函数。
```js
example 17:

var per = {
    user:'zhaoshier',
    fn:function(){
      console.log(this.user)
    }
}    
var aa = per.fn; 
var c = aa.bind(per)
console.log(c) //function() {[native code]}

c() //zhaoshier
```
通过example 17的方法，可以打印出对象per的user   
同样，bind方法也可添加多个参数。且参数可以在执行的时候再次添加。但需注意的是，参数是按照形参的顺序进行的。
```js
example 18:

var per = {
    user:'zhaoshier',
    fn:function(x1,x2,x3){
      console.log(this.user) //zhaoshier
      console.log(x1+x2+x3) //8
    }
}    
var aa = per.fn; 
var c = aa.bind(per,5);
c(1,2);
```
总结：call/apply改变上下文中的this并立即执行这个函数；bind方法可以让对应的函数想什么时候调用都可以，并且参数可以在执行的时候添加。
**************************************

### 补充. 在构造函数中，当this碰上return时
先看几个小例子:

```js
example 19:

function fn() {
    this.user = 'zhaoshier';
}
var a = new fn;
console.log(a.user) //zhaoshier
```
在构造函数里return一个空对象&非空对象
```js
example 20:

//空对象
function fn(){
    this.user = 'zhaoshier';
    return {};
}
var a = new fn;
console.log(a.user) //undefined

//非空对象
function fn(){
    this.user = 'zhaoshier';
    return {user:'test'};
}
var a = new fn;
console.log(a.user) //test
```
在构造函数里return一个函数
```js
example 21:

function fn(){
    this.user = 'zhaoshier';
    return function() { };
}
var a = new fn;
console.log(a.user) //undefined
```
还没搞明白一个问题，当return一个函数，这个函数里又重新定义了user，那么console.log(a.user)打印出来的是啥

在构造函数里return一个常量
```js
example 22:

function fn(){
    this.user = 'zhaoshier';
    return 1;
}
var a = new fn;
console.log(a.user) //zhaoshier
```
从example 20 ~ example 22 可以看出：**如果返回值是一个对象，则this指向的就是那个return时，新生成的对象；如果返回值不是一个对象，则this还是指向函数的实例。**    

在构造函数里return undefined
```js
example 23:

function fn(){
    this.user = 'zhaoshier';
    return undefined;
}
var a = new fn;
console.log(a.user) //zhaoshier
```

在构造函数里return null, 虽然null也是一个对象，但this还是指向那个函数的实例。
```js
example 24:

function fn(){
    this.user = 'zhaoshier';
    return null;
}
var a = new fn;
console.log(a.user) //zhaoshier
```

