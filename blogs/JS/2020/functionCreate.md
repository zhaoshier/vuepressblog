---
title: 函数创建的三种方式以及函数声明提升
date: 2020-10-09
tags:
 - Javascript
categories:
 -  Javscript
---

#### **函数创建的3种方式：函数声明、函数表达式、Function构造器**

### 1.函数声明
函数声明不能出现在**条件语句**、**循环语句**中
```js
function func(length){
    return length > 10;
}
func(10)  //false
```

### 2.函数表达式
函数表达式没位置限制，可在任何表达式中。
```js
var func = function(length){
    return length > 10;
}
func(10)  //false
```
#### **命名函数表达式**
最大特点：能在函数体内引用自身。
```js
var func = function name(){
    typeof name;  //"function"
};
typeof func;  //"function"
typeof name;  //"undefined"
<!--由此可见函数名name只能在函数体中才能引用-->
```

### 3.Function构造器
构造函数Function()能接收任意多个实参，最后一个实参是新函数的函数体，其他都是新函数的形参。

**缺点**：用Function构造器创建新函数写法不直观，且新函数的作用域是**全局作用域**。

### 4.声明提升
- 在函数创建过程中，函数声明和变量声明(函数表达式方式)都会被提升，**函数声明的优先级高于变量声明(函数表达式方式)**。
- 变量的赋值语句不会被提升。因此，函数表达式创建的函数在定义之前无法调用。
- 构造函数Function构造的新函数，作用域为全局。  
```js
example 1:

<!--函数表达式方式-->
var f1 = function(){
    console.log(1);
}
<!--构造函数方式-->
var f1 = new Function("return 3")
<!--函数声明-->
function f1() {
    console.log(2)
}
<!--函数声明方式存在提升，所以执行顺序为1.函数声明；2.函数表达式方式；3.构造函数方式。最后返回构造函数的返回值。-->
f1();  //3
```
```js
example 2:

<!--函数表达式方式-->
var f2 = function(){
    console.log(1);
}
<!--函数声明-->
function f2() {
    console.log(2)
}
<!--构造函数方式-->
var f2 = new Function("return 3")
<!--执行顺序为1.函数声明；2.函数表达式方式；3.构造函数方式。最后返回构造函数的返回值。-->
f2();  //3
```
```js
example 3:

<!--构造函数方式-->
var f3 = new Function("return 3")
<!--函数表达式方式-->
var f3 = function(){
    console.log(1);
}
<!--函数声明-->
function f3() {
    console.log(2)
}
<!--执行顺序为1.函数声明；2.构造函数方式；3.函数表达式。最后返回函数表达式的返回值。-->
f3();  //1 undefined
```

```js
example 4:

<!--函数声明方式存在提升，函数表达式方式不存在提升，在函数定义前执行，仅输出2。-->
f4();  //2 undefined
<!--函数表达式-->
var f4 = function(){
    console.log(1);
}
<!--函数声明-->
function f4() {
    console.log(2)
}
```

```js
example 5:

<!--函数表达式-->
var f5 = function(){
    console.log(1);
}
<!--函数声明-->
function f5() {
    console.log(2)
}
f5();  //1 undefined
```

