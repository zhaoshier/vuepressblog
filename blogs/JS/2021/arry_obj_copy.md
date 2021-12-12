---
title: 数组和对象的深浅拷贝
date: 2021-12-07
tags:
 - Javascript
categories:
 -  Javscript
---
### 1.深拷贝与浅拷贝的定义：
- 深拷贝：通过一个数组1（对象1）给数组2（对象2）赋值，数组1（对象1）的更改不会影响数组2（对象2）
- 浅拷贝：通过一个数组1（对象1）给数组2（对象2）赋值，数组1（对象1）的更改会影响数组2（对象2）
### 2.实现深拷贝与浅拷贝的方法
#### 2.1 数组
> 深拷贝：
> 1. for循环        
> 1. 数组的slice方法   
> 1. 数组的concat方法
> 1. ES6的扩展运算符

> 浅拷贝：
> 
> 1. 赋值“=”号

#### 2.2 对象

> 深拷贝：
> 1. for循环        
> 1. 转换成json再转换成对象实现对象的深拷贝
> 1. ES6的扩展运算符

> 浅拷贝：
> 
> 1. 赋值“=”号

### 3.举例
#### 3.1 数组
**1.for循环**
```js
var arr1 = [1, 2, 3, 4, 5];
var arr2 = copyArr(arr1);
function copyArr(arr){
    let data = [];
    for(let i = 0; i < arr.length; i++){
        data.push(arr[i])
    }
    return data
}
arr1[1] = 'a';
console.log(arr1) // [1, 'a', 3, 4, 5]
console.log(arr2) // [1, 2, 3, 4, 5]
```

**2.数组的slice方法**
```js
var arr1 = [1, 2, 3, 4, 5];
var arr2 = arr1.slice(0);
arr1[1] = 'a';
console.log(arr1) // [1, 'a', 3, 4, 5]
console.log(arr2) // [1, 2, 3, 4, 5]
```

**3.数组的concat方法**
```js
var arr1 = [1, 2, 3, 4, 5];
var arr2 = arr1.concat();
arr1[1] = 'a';
console.log(arr1) // [1, 'a', 3, 4, 5]
console.log(arr2) // [1, 2, 3, 4, 5]
```

**4.ES6的扩展运算符**
```js
var arr1 = [1, 2, 3, 4, 5];
var [ ...arr2] = arr1;
arr1[1] = 'a';
console.log(arr1) // [1, 'a', 3, 4, 5]
console.log(arr2) // [1, 2, 3, 4, 5]
```

**5. 赋值“=”号**

```js
var arr1 = [1, 2, 3, 4, 5];
var arr2 = arr1;
arr1[1] = 'a';
console.log(arr1) // [1, 'a', 3, 4, 5]
console.log(arr2) // [1, 'a', 3, 4, 5]
```
#### 3.2 对象
**1.for循环**
```js
var obj1 = {
    a: 'aaa',
    b: 'bbb',
    c: 'ccc'
};
var obj2 = copyObj(obj1);
function copyObj(obj){
    let data = {};
    for(var key in obj){
        data[key] = obj[key]
    }
    return data
}
obj1.c = 'dcd';
console.log(obj1) // {a: 'aaa',b: 'bbb',c: 'dcd'}
console.log(obj2) // {a: 'aaa',b: 'bbb',c: 'ccc'}
```

**2.转换成json再转换成对象实现对象的深拷贝**
```js
var obj1 = {
    a: 'aaa',
    b: 'bbb',
    c: 'ccc'
};
var obj2 = JSON.parse(JSON.stringify(obj1));
obj1.c = 'dcd';
console.log(obj1) // {a: 'aaa',b: 'bbb',c: 'dcd'}
console.log(obj2) // {a: 'aaa',b: 'bbb',c: 'ccc'}
```

**3.ES6的扩展运算符**
```js
var obj1 = {
    a: 'aaa',
    b: 'bbb',
    c: 'ccc'
};
var { ...obj2} = obj1;
obj1.c = 'dcd';
console.log(obj1) // {a: 'aaa',b: 'bbb',c: 'dcd'}
console.log(obj2) // {a: 'aaa',b: 'bbb',c: 'ccc'}
```

**4. 赋值“=”号**

```js
var obj1 = {
    a: 'aaa',
    b: 'bbb',
    c: 'ccc'
};
var obj2 = obj1;
obj1.c = 'dcd';
console.log(obj1) // {a: 'aaa',b: 'bbb',c: 'dcd'}
console.log(obj2) // {a: 'aaa',b: 'bbb',c: 'dcd'}
```