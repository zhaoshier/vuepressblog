---
title: background属性
date: 2020-11-02
tags:
 - CSS
categories: 
 - CSS
---


属性 | 可取值 | 描述 | CSS
---|--- |--- |---
color | white,#fff,rgb(255,255,255),rgba(255,255,255,0.5) | 背景颜色 | 1
position | (left right top bottom center) (x% y%)(xpos ypos) | 设置背景图像的起始位置 | 1
size | length,percentage,cover,contain | 背景图片的尺寸 | 3
repeat | repeat,repeat-x,repeat-y,no-repeat,inherit | 如何重复背景图像 | 1
origin | padding-box,border-box,content-box | 规定 background-position 属性相对于什么位置来定位 | 3
clip | padding-box,border-box,content-box | 背景的绘制区域 | 3
attachment | scroll,fixed,inherit | 背景图像是否固定或者随着页面的其余部分滚动 | 1 
image | url('URL'),none,inherit | 要使用的背景图像 | 1
inherit | -- | 应该从父元素继承 background 属性的设置像 | 1

background简写属性：
```css
body
  { 
  background: #00FF00 url(bgimage.gif) no-repeat fixed top;
  }
```
**建议使用这个属性，而不是分别使用单个属性**，因为这个属性在较老的浏览器中能够得到更好的支持，而且需要键入的字母也更少。
### 1.background-color
```css
background-color:red;

background-color:#0f3;

background-color:rgb(255,255,0);

background-color:rgba(255,255,0,0.1);
<!--rgba中的最后一个值为透明度，值：(透明)0--1(不透明)-->

background-color:transparent; 
<!--transparent为background-color的默认值-->
```
**元素背景的范围**   
background-color 颜色会填充元素的**内容、内边距和边框区域**，扩展到元素边框的外边界（但**不包括外边距**）。如果边框有透明部分（如虚线边框），会透过这些透明部分显示出背景色。

### 2.background-position
```css
background-position:top left;

background-position:center left;

background-position:bottom left;

<!--若仅规定了一个关键词，第二个值默认为"center"-->
background-position:top;

background-position:30% 20%;

background-position:100px 50px;

<!--可以混合使用 % 和 position 值-->
background-position:100px 50%;

<!--默认值-->
background-position:0% 0%;
```
在 Firefox 和 Opera 中,需把 background-attachment 属性设置为 "fixed"，该属性才会有效。

### 3.background-size
```css
background-size: 100px 100px;

background-size: 100px auto;

background-size: 100% 50%;

background-size: 20% auto;

<!--若只设置一个值，则第二个值会被设置为 "auto"-->
background-size: 100px;
background-size: 100%;

<!--把背景图像扩展至足够大，以使背景图像完全覆盖背景区域，背景图像的某些部分也许无法显示在背景定位区域中-->
background-size: cover;

<!--把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域-->
background-size: contain;
```
**背景图片铺满全屏：**   
四种方法比较
```css
background-size: cover;
background-size: contain;
background-size: 100% auto;
background-size: auto 100%;
```
![](https://gitee.com/zhaoshier/blogimage/raw/master/images/20201102backgroundSize.png)
**分析：**   
1. background-size: cover会尽可能地铺满全屏，**溢出部分不显示在背景**中；   
2. background-size: contain扩展至最大尺寸，使其**高度或宽**度适应内容区域；
3. background-size: 100% auto，使背景图片的宽度适应内容区域，高度按宽度的比例扩展；当picture.height < contain.height时，其表现效果与contain效果一样。
4. background-size: auto 100%，使背景图片的**高度**适应内容区域，宽度按高度的比例扩展；当picture.width < contain.width时，其表现效果与contain效果一样。
### 4.background-repeat
```css
<!--在垂直方向和水平方向重复-->
<!--默认值-->
background-repeat:repeat;

background-repeat:repeat-x;

background-repeat:repeat-y;

background-repeat:no-repeat;

background-repeat:inherit;
```

### 5.background-origin

```css
<!--背景图像相对于内边距框来定位-->
<!--默认值-->
background-origin:padding-box;

background-origin:border-box;

background-origin:content-box;
```
![](https://gitee.com/zhaoshier/blogimage/raw/master/images/20201102backgroundOrigin-1.png)
### 6.background-clip
```css
<!--背景被裁剪到内边距框-->
background-clip:padding-box;

<!--默认值-->
background-clip:border-box;

background-clip:content-box;
```
![](https://gitee.com/zhaoshier/blogimage/raw/master/images/20201102backgroundClip.png)

### 7.background-attachment
```css
<!--背景图像会随着页面其余部分的滚动而移动-->
<!--默认值-->
background-attachment:scroll;

<!--当页面的其余部分滚动时，背景图像不会移动-->
background-attachment:fixed;

<!--从父元素继承-->
background-attachment:inherit;
```

### 8.background-image
```css
background-image:url(/i/img/01.jpg)
```

