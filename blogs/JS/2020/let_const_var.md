---
title: let, const 和 var
date: 2020-10-13
tags:
 - Javascript
categories:
 -  Javscript
---

**首先，来了解一下局部变量和全局变量的概念：**
- 局部变量：在函数中通过var声明的变量；
- 全局变量：在函数外通过var声明的变量；
- 没有声明就使用的变量，默认为全局变量，无论这个变量在哪使用。

### 1.作用域分为：
- 全局作用域     
- 函数作用域
- 块级作用域

### 2.let, const和var
- var定义的变量，没有块的概念，**可以跨块**访问, **不能跨函数**访问。但var命令会发生“变量提升”现象。
- let定义的变量，只能在块作用域里访问，**不能跨块**访问，**也不能跨函数**访问。**let不允许在相同的作用域内，重复声明同一个变量**

> 只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）


- const用来定义一个**只读常量**，只能在块作用域里访问，而且不能修改。    
**注意：** const一旦声明变量，必须赋值，只声明不赋值，就会报错

let 和 var 的区别代码实例：
```js
function varTest() {
  var x = 1;
  if (true) {
    var x = 2;  // 同样的变量!
    console.log(x);  // 2
  }
  console.log(x);  // 2
}

function letTest() {
  let x = 1;
  if (true) {
    let x = 2;  // 不同的变量
    console.log(x);  // 2
  }
  console.log(x);  // 1
}
```
```js
{
  let a = 10;
  var b = 1;
}
a // ReferenceError: a is not defined.
b // 1
```
上面代码在代码块之中，分别用let和var声明了两个变量。然后在代码块之外调用这两个变量，结果let声明的变量报错，var声明的变量返回了正确的值。这表明，**let声明的变量只在它所在的代码块有效。**
for循环的计数器，就很合适使用let命令。
```js
for (let i = 0; i < 10; i++) {
  // ...
}

console.log(i);
// ReferenceError: i is not defined
```
上面代码中，计数器i只在for循环体内有效，在循环体外引用就会报错。

------------------------------------------------
下面的代码如果使用var，最后输出的是10。
```js
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[0](); //10
a[6](); // 10
```
上面代码中，<font color=#3eaf7c>变量i是var命令声明的，在全局范围内都有效，所以全局只有一个变量i。</font>每一次循环，变量i的值都会发生改变，而循环内被赋给数组a的函数内部的console.log(i)，里面的i指向的就是全局的i。也就是说，所有数组a的成员里面的i，指向的都是同一个i，导致运行时输出的是最后一轮的i的值，也就是 10。

如果使用let，声明的变量仅在块级作用域内有效，最后输出的是 6。
```js
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[0](); //0
a[6](); // 6
```
上面代码中，<font color=#3eaf7c>变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是6。</font>你可能会问，如果每一轮循环的变量i都是重新声明的，那它怎么知道上一轮循环的值，从而计算出本轮循环的值？这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算。

-----------------------------------

另外，for循环还有一个特别之处，就是<font color=#3eaf7c>**设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。** </font>
```js
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
```
上面代码正确运行，输出了 3 次abc。这表明**函数内部的变量i与循环变量i不在同一个作用域，有各自单独的作用域**。

### 3.const定义的对象属性是否可以改变    
---答案是：可以改变。
```js
举例：
const person = {
     name : 'zhaoshier',
     sex : '女'
 }

 person.name = 'zhaojj'
 console.log(person.name) //zhaojj
 ```
运行上述代码，发现person对象的name属性确实改变了，这是为啥呢？

因为对象是引用类型的，person中保存的仅仅是对象的指针。因此，const只能保证对象的指针不变。而修改对象的属性并不会改变对象的指针。所以const定义的引用类型变量，只要指针不发生改变，属性值等其他一切的改变都是可以的。

当修改指针指向，让person指向一个新对象，会报错：
```js
const person = {
     name : 'zhaoshier',
     sex : '女'
 }
person = {
     name : 'zhaojj',
     sex : '女'
 }
```