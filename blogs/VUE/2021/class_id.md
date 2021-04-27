---
title: vue中与class/id相关知识点
date: 2021-04-27
tags:
 - Vue
categories: 
 - Vue
---


这段时间在写业务代码时，遇到很多和样式属性相关的问题，下面是我自己遇到并总结的vue中的class/id相关知识。

### 1.根据A的值，判断使用B属性还是C属性
```html
<div :id="[ A ? 'B' : 'C']"></div>
```
如果变量A的值为true，则id='B';否则id='C'
### 2.属性为动态变量，并通过document.getElementById()/document.getElementsByClsaaName()获取这个动态变量
```html
<div :id="A"></div>
```
```js
document.getElementById(''+this.A)
//this.A 为一个变量，前面需用空字符串拼接
```

### 3.通过ref绑定，在methods中动态改变样式
```html
<div class="fileUp" ref="fileUp"></div>
```
```js
this.$refs["fileUp"].style.width = "456px"
this.$refs["fileUp"].style.height = "calc(100% - 80px)"
```
用ref绑定名为"fileUp"的标签，更改该标签样式