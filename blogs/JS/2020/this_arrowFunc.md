---
title: （补充）箭头函数中的this指向
date: 2020-10-14
tags:
 - Javascript
categories:
 -  Javscript
---

####  箭头函数中的this
- **一般函数中**：this的指向是在调用时决定的，而非在定义时。
- **箭头函数中**：this的指向是在定义时绑定的，而非调用时。它没有自己的this，它的this是继承而来的，**默认指向在定义它时所处的对象**。

```js
example 1：

//一般函数中
var user = 'zhaojj'
var per = {
    user:'zhaoshier',
    fn:function(){
      console.log(this.user) 
    }
}    
var another = per.fn;
per.fn(); //zhaoshier
another(); //zhaojj
```

```js
example 2:

//箭头函数中
var user = 'zhaojj'
var per = {
    user:'zhaoshier',
    fn:()=> {
      console.log(this.user) 
      console.log(this)
    }
}    
var another = per.fn;
per.fn(); //zhaojj  Window
another(); //zhaojj  Window
```
**分析：**    
- 上述per.fn()输出zhaojj，因对象per在创建时声明了箭头函数，这时箭头函数会寻找当前作用域，因per是一个对象，并不是作用域。所以这里的作用域为window，也即this指向window。 
- another()也指向zhaojj，因在将per.fn赋值给another并没有立即执行，another()相当于window.another(),所以another()中的this指向window。


再来看一个例子：
```js
example 3:

var user = "zhaojj";
var per = {
  user: "zhaoshier",
  fn: function() {
     return {
         getName: () => {
             console.log(this.user)
             console.log(this)
         }
     }
  }
}
var another = per.fn().getName;
per.fn().getName();  //zhaoshier  this的指向为per对象内部
another();   //zhaoshier  this的指向为per对象内部
```
**分析：**    
- per.fn().getName()输出为zhaoshier，this的指向是对象per的内部。箭头函数当前作用域为fn，this指向fn里的this；但因fn被per调用，所以this指向per。
- another()输出也是zhaoshier，this的指向也为per对象内部。为什么another()的输出也是zhaoshier呢？其实在赋值的时候就已经确定了。
  1. var another = per.fn().getName;其实是先执行per.fn()   
  2. 执行per.fn() 的时候，箭头函数getName()被声明   
  3. 此时，箭头函数的this应该是当前作用域的this，也即fn()里的this   
  4. 但fn()又被per调用，所以this指向obj   
  5. 调用another()时，this的指向就已经确定了，也即per；所以最终输出的是per.user
  
 

```js
example 4:

var user = 'zhaojj'
function fn() {
     this.user = 'zhaoshier'
     getName: () => {
             console.log(this.user)
             console.log(this)
         }
     getName();
     }
new fn(); //zhaoshier 
```
**分析：**   
new fn()的输出为zhaoshier， this的指向为fn函数。   
箭头函数当前的作用域为fn函数，所以this指向fn()函数。   
箭头函数可以让setTimeout里的this，绑定定义时所在的作用域，而不是指向运行时所在的作用域。

```js
example 5:

function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setInterval(() => this.s1++, 1000);
  // 普通函数
  setInterval(function () {
    this.s2++;
  }, 1000);
}
 
var timer = new Timer();
 
setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);

//s1: 3
//s2: 0
```
**分析**：   
example 5中，Timer函数内部设置了两个定时器，分别使用了箭头函数和普通函数。前者的this指向定义时所在的作用域(Timer函数)，后者的this指向运行时所在的作用域(全局对象)。所以，3100ms后，timer.s1被更新了3次，而timer.s2一次也没更新。   


箭头函数没有自己的this，它的this是其所在作用域的this。下面我们可以将箭头函数转换成ES5的代码：
```js
example 6:

//ES6
function fn() {
    this.id = 12;
    setTimeout(() => {
       console.log('id:'+this.id)
    },1000);
}
new fn; //12

//ES5
function fn() {
    this.id = 12;
    var that = this;
    setTimeout(function() {
       console.log('id:'+that.id)
    },1000);
}
new fn; //12
```
example 6清楚地说明了，箭头函数里根本没有自己的this，二是引用了外层的this。   


由于箭头函数没有自己的this，所以(1)箭头函数不能当作构造函数，不可以使用new，否则会抛出一个错误；(2)没有this，也不能用call(), apply(), bind()方法去改变this的指向。
```js
example 7:


(function() {
  return [
    (() => this.x).bind({ x: 'inner' })()
  ];
}).call({ x: 'outer' });

//['outer']
```
example 7中，箭头函数没有自己的this，所以bind方法无效，箭头函数的this指向外部的this。

再看几个例子，巩固所学。
```js
example 8:

var obj={
	fn:function(){
		console.log(this);
	}
}
obj.fn();//object
<!--谁调用的函数，函数体中的this就指向谁-->



example 9:

var obj={
	fn:function(){
		setTimeout(function(){
			console.log(this);
		});
	}
}
obj.fn();//window
<!--这次this出现在全局函数setTimeout()中的匿名里，并没有某个对象对其进行显示调用，所以匿名函数中的this指向window对象。-->


example 10:

var obj={
	fn:function(){
		setTimeout(() => {
			console.log(this);
		});
	}
}
obj.fn();//object
<!--箭头函数中this指向定义时所在的作用域-->
```