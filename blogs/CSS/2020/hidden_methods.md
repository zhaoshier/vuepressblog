---
title: CSS中隐藏元素的方法
date: 2020-11-03
tags:
 - CSS
categories: 
 - CSS
---


:::danger
隐藏元素的6种方法：
1. display:none    (脱标，不占据任何空间，不响应任何交互)
2. visibility:hidden(不脱标，占据原空间，不响应任何用户的交互)
3. opacity:0 (不脱标，占据原空间，会响应用户的交互)
4. position:absolute(脱标，通过定位将元素定到远离页面的位置)
5. cli-path:polygon(0px 0px , 0px 0px,0px 0px,0px 0px) (不脱标，通过裁剪盒子)
6. position:absolute;与clip:rect(0px 0px 0px 0px)配合(脱标，通过裁剪绝对定位的盒子)
:::


**几种方法的简单介绍**
### 1. display:none   
```css
.hide {
     display:none;
}
```
将元素设置为display:none后，元素在页面上将彻底消失，元素本来占有的空间就会被其他元素占有，也就是说它会导致浏览器的重排和重绘。

不会触发其点击事件。
### 2. visibility:hidden   
和display:none的区别在于，元素在页面消失后，其占据的空间依旧会保留着，所以它只会导致浏览器重绘而不会重排。
```css
.hidden{
    visibility:hidden;
}
```   
visibility:hidden适用于那些元素隐藏后不希望页面布局会发生变化的场景。   
设置元素的visibility后无法触发点击事件，说明这种方法元素也是消失了，只是依然占据着页面空间。
### 3. opacity:0
这种方法和visibility:hidden的一个共同点是元素隐藏后依旧占据着空间，元素只是隐身了，它依旧存在页面中。
```css
.hidden{
    opacity:0;
}
```  
设置元素透明度为0后，元素只是相对于人眼不存在而已，对浏览器来说，它还是存在的，所以可以触发点击事件。
### 4. 设置height，width等盒模型属性为0
```css
.hidden{
    margin:0;
    border:0;
    padding:0;
    height:0;
    width:0;
    overflow:hidden;
}
```
不实用，也可能存在着着一些问题。    
使用这种方法来隐藏元素，是否可以触发事件要根据具体的情况来分析。如果元素设置了border，padding等属性不为0，很显然，页面上还是能看到这个元素的，触发元素的点击事件完全没有问题。如果全部属性都设置为0，很显然，这个元素相当于消失了，即无法触发点击事件。