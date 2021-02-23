---
title: JS日期函数
date: 2021-02-23
tags:
 - Javascript
categories:
 -  Javscript
---

### 1.获得当前日期 
```JS
var myDate=new Date();
console.log(myDate) //Thu Feb 18 2021 10:07:11 GMT+0800 (GMT+08:00)
console.log(myDate.toLocaleString())//2021-2-18 2:45:37 ├F10: PM┤ 获取本地时间
```
#### 2.形成一个时间戳(唯一的) 
```JS
console.log(myDate*1);//1613614031142
console.log(Number(myDate))//1613614031142
console.log(myDate.valueOf());//1613614031142
console.log(myDate.getTime());//1613614031142
```

### 3.获取 年/月/日/星期
```JS
myDate.toLocaleDateString()//2021-2-18 获取本地 年-月-日
myDate.getFullYear() //2021 (获取完整的年份)
myDate.getMonth() //1 （获取当前月份，0-11，0代表1月份）
myDate.getDate() //18 （获取当前日，0-31）
myDate.getDay() //4 （获取当前星期，0-6，0代表星期天）
```
### 4.获取 时/分/秒/毫秒
```JS
myDate.toLocaleTimeString() //2:45:37 ├F10: PM┤ 获取本地时间
myDate.getHours() //10 (获取当前小时数，0-23)
myDate.getMinutes() //1 （获取当前分钟数，0-59）
myDate.getSeconds() //18 （获取当前秒，0-59）
myDate.getMilliseconds();    //获取当前毫秒数(0-999)
```