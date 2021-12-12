---
title: for in 和 for of 的区别
date: 2021-12-09
tags:
 - Javascript
categories:
 -  Javscript
---

### 1.引言
在遍历数组和对象时，经常会用到两种方法：for in 和 for of，但一直都不清楚两者的区别是啥，今天就来一探究竟。

首先来看两个简单的例子。

用for in 和 for of 来遍历数组：
```js
example 1：
var arr = ['a', 'b', 'c']
for (let key in arr) {
    console.log(key, typeof(key)) // 0 string 1 string 2 string
}
for (let val of arr) {
    console.log(val) // a b c
}
```
用for in 和 for of 来遍历对象：
```js
example 2：
var obj = {a:1, b:2, c:3}
for (let key in obj) {
    console.log(key) // a b c
}
for (let val of obj) {
    console.log(val) // Uncaught TypeError: obj is not iterable
}
```

我们可以抛出以下5点总结，可通过以上两个例进行验证：
> 1. for in 遍历的是数组的索引（index）（example 1）
> 1. for of 遍历的是数组的元素值（value）（example 1）
> 1. for in 遍历的是对象的key（example 2）
> 1. for of 只能遍历可迭代对象（如：数/数组对象/字符串/map/set等）（example 2）（具体描述可看第二章节）
> 2. for in 更适合遍历对象；但也可遍历数组，但会存在一些问题（具体描述可看第三章节）

### 2. for of  
for of 遍历的是数组元素值，且只是数组内的元素，不包括原型属性和索引。

```js
var arr = [1, 2, 3];
arr.a = 4;
Array.prototype.a = 4;
for (let value of arr) {
    console.log(value); // 1 2 3
}
```

for of 可遍历Number/String/Array/map/set等拥有迭代器对象（iterator）的集合，但不可遍历对象，因为没有迭代器对象。   
若想遍历对象的属性，可以用for in循环或用内建的Object.keys()方法（一般不采用这种方法）（与example 2 作对比）
```js
var obj = {a:1, b:2, c:3}
console.log(Object.keys(obj)) //["a", "b", "c"]
for (let val of Object.keys(obj)) {
    console.log(val) // a b c
}
```

### 3.for in
 for in 更适合遍历对象；但也可遍历数组，但会存在一些问题   
> - 问题一：返回的索引类型为String，而不是Number；（如example 1）   
> - 问题二：遍历顺序有可能不是按照实际数组的内部顺序。  
>  for in 会遍历数组的所有可枚举属性，包括原型属性。 若不想遍历原型方法或属性，可用hasOwnProperty()方法判断。

 ```js
 <!--for in 遍历数组的所有属性-->
 var arr = [1, 2, 3];
 Array.prototype.a = 4;
 for (let index in arr) {
    console.log(arr[index]); // 1 2 3 4
 }
 <!--排除原型属性-->
 for(let index in arr) {
    if(arr.hasOwnProperty(index)){
  		console.log(arr[index]) // 1 2 3
    }
 }
 ```