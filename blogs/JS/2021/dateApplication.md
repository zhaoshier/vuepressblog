---
title: 日期函数的应用
date: 2021-02-23
tags:
 - Javascript
categories:
 -  Javscript
---

### 1.判断是否为闰年
```JS
function isLeapYear(year){
    if(year % 4 ==0 && year % 100 !=0 || year %400 ==0){
        console.log("闰年")
    }else{
        console.log("平年")
    }
}
isLeapYear(2021) //平年
```

### 2.日期格式化(yyyy-MM-dd HH:mm:ss)
```JS
function formatDate(date) {
    var date = new Date(date);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    console.log(YY + MM + DD +" "+hh + mm + ss)
    return YY + MM + DD +" "+hh + mm + ss;
}
var myDate=new Date()
formatDate(myDate) //2021-02-18 15:33:40
```
### 3.普通格式日期转化成GMT
```JS
function strToGMT(time){
    let GMT = new Date(time)
    console.log(GMT)
    return GMT
}
var time ="2021-02-18 15:33:40";
strToGMT(time) //Thu Feb 18 2021 15:33:40 GMT+0800 (中国标准时间)
```

### 4.计算两个日期间相差的天数/小时/分/秒
```JS
function dateDiff(firstDate,secondDate){
    var firstDate = new Date(firstDate);
    var secondDate = new Date(secondDate);
    var diff = Math.abs(firstDate.getTime() - secondDate.getTime())
    var result = parseInt(diff / (1000 * 60 * 60 * 24)); //相差的天数
    var result1 = parseInt(diff / (1000 * 60 * 60)); //相差的小时数
    var result2 = parseInt(diff / (1000 * 60)); //相差的分钟数
    console.log(result) //1827
    console.log(result1) //43848
    console.log(result2) //2630880
    return result
}
    var date1 = "2012-12-21 12:00:00"
    var date2 = "2017-12-22 12:00:00"
    dateDiff(date1,date2)
```

### 5.显示yy-mm-dd 星期w
```JS
 function showWeek(showWeek)  
{   
    var myDate= new Date();  
    var str = myDate.toLocaleDateString();  
    if (showWeek)  
    {   
        var Week = ['日','一','二','三','四','五','六'];  
        str += ' 星期' + Week[myDate.getDay()];  
    }  
    console.log(str) //2021-2-18 星期四
    return str;  
} 
showWeek(true) 
```

### 6.获取某年每个月天数&&某月天数
```JS
// 获取某年每个月的天数
function getDaysInYear() {
    var date = new Date();
    var daysArr =[];
    var year = date.getFullYear();
    for (let i = 1; i < 13; i++) {
        var days = new Date(year, i, 0);
        var numb = days.getDate();
        daysArr.push(numb)
    }
    console.log(daysArr) //[ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]
}
getDaysInYear();
```

```JS
// 获取某年某月的天数
function getDaysInMonth(nowyear, nowmonth) {
    //parseInt(number,type)这个函数后面如果不跟第2个参数来表示进制的话，默认是10进制。
    nowmonth = parseInt(nowmonth, 10)
    var temp = new Date(nowyear, nowmonth, 0)
    console.log(temp.getDate()) // 28
    return temp.getDate()
}
getDaysInMonth(2021, 02)
```

### 7.获取当前周是一年之中的第几周
```JS
function theWeek() {
    var totalDays = 0;
    now = new Date();
    years = now.getYear()
    console.log(years)
    if (years < 1000)
        years += 1900
    var days = new Array(12);
    days[0] = 31;
    days[2] = 31;
    days[3] = 30;
    days[4] = 31;
    days[5] = 30;
    days[6] = 31;
    days[7] = 31;
    days[8] = 30;
    days[9] = 31;
    days[10] = 30;
    days[11] = 31;
    //判断是否为闰年，针对2月的天数进行计算
    if (Math.round(now.getYear() / 4) == now.getYear() / 4) {
        days[1] = 29

    } else {
        days[1] = 28

    }
    if (now.getMonth() == 0) {
        totalDays = totalDays + now.getDate();

    } else {
        var curMonth = now.getMonth();
        for (var count = 1; count <= curMonth; count++) {
            totalDays = totalDays + days[count - 1];

        }
        totalDays = totalDays + now.getDate();

    }
    //得到第几周
    var week = Math.round(totalDays / 7);
    console.log(week)
    return week;

}
theWeek()
```