---
title: 什么是BFC？
date: 2020-11-03
tags:
 - CSS
categories: 
 - CSS
---


### 1.BFC定义
:::tip   
BFC(Block formatting context)--"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。    
:::   
从定义看出来，这个东西是对上下文起作用的。可上下文是指哪里？
MDN官方定义的：一个块格式化上下文（block formatting context） 是Web页面的可视化CSS渲染出的一部分。它是块级盒布局出现的区域，也是浮动层元素进行交互的区域。 
### 2.BFC布局规则   
1. 内部的Box会在垂直方向，一个接一个地放置。
1. Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。
1. 每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
1. BFC的区域不会与float box重叠。
1. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
1. 计算BFC的高度时，浮动元素也参与计算。
### 3.如何创建BFC
:::tip   
一个块格式化上下文由下列之一创建：   
1. 根元素或其它包含它的元素
2. 浮动元素 (元素的 float 不是 none)
3. 绝对定位元素 (元素具有 position 为 absolute 或 fixed)
4. 内联块 (元素具有 display: inline-block)
5. 表格单元格 (元素具有 display: table-cell，HTML表格单元格默认属性)
6. 表格标题 (元素具有 display: table-caption, HTML表格标题默认属性)
7. 具有overflow 且值不是 visible 的块元素，
8. display: flow-root
9. column-span: all 应当总是会创建一个新的格式化上下文，即便具有 column-span: all 的元素并不被包裹在一个多列容器中。
10. 一个块格式化上下文包括创建它的元素内部所有内容，除了被包含于创建新的块级格式化上下文的后代元素内的元素。
:::

块格式化上下文对于定位 (参见 float) 与清除浮动 (参见 clear) 很重要。定位和清除浮动的样式规则只适用于处于同一块格式化上下文内的元素。浮动不会影响其它块格式化上下文中元素的布局，并且清除浮动只能清除同一块格式化上下文中在它前面的元素的浮动。

### 4.BFC的功能
- 清除浮动
- 利用BFC避免margin重叠
- 自适应两栏布局


#### 4.1 清除浮动
当我们不给父节点设置高度，子节点设置浮动的时候，会发生高度塌陷，此时就需要清除浮动。
```css
.out1 {
    border: 10px green dashed;
    width: 1500px;
}
        
.out2 {
    display: inline-block;
}
        
.in1 {
    background-color: rgb(204, 62, 62);
    height: 200px;
}
        
.in2 {
    float: left;
}
```
![](https://gitee.com/zhaoshier/blogimage/raw/master/images/20201103BFC-1-2.png)   
图1是正常文档流中，块级元素按照从上到下顺序排列的。    

如果给子元素一个float或者绝对定位，父元素发生高度塌陷，如图2所示。

<font color=#3eaf7c>根据计算BFC的高度是，浮动元素也参与计算。</font>可让**父元素产生一个BFC，将盒子撑起来。**

#### 4.2 利用BFC避免margin重叠
```html
<html>

<head>

    <style type="text/css">
        .marginStyle {
            width: 700px;
            color: rgb(14, 13, 13);
            line-height: 400px;
            text-align: center;
            margin: 100px;
        }
        
        .bac1 {
            background: rgb(92, 165, 92);
        }
    </style>

</head>

<body>
    <div class="bac1 marginStyle">
        看看我的margin是多少？
    </div>
    <div class="bac1 marginStyle">
        看看我的margin是多少？
    </div>
</body>

</html>
```
页面的生成效果：   
![](https://gitee.com/zhaoshier/blogimage/raw/master/images/20201103BFC-1-3.png)   
根据<font color=#3eaf7c>属于同一个BFC的两个相邻的Box会发生margin重叠。</font>所以可以设置，两个不同的BFC，也即把第二个块用div包起来，然后激活它使其成为一个BFC.
```html
<html>

<head>

    <style type="text/css">
        .marginStyle {
            width: 700px;
            color: rgb(14, 13, 13);
            line-height: 400px;
            text-align: center;
            margin: 100px;
        }
        
        .bac2 {
            background: rgb(207, 35, 35);
        }
        
        .flo {
            overflow: hidden;
        }
    </style>

</head>

<body>
    <div>
        <div class="bac2 marginStyle">
            看看我的margin是多少？
        </div>
        <div class="flo">
            <div class="bac2 marginStyle">
                看看我的margin是多少？
            </div>
        </div>
    </div>
</body>

</html>
```
![](https://gitee.com/zhaoshier/blogimage/raw/master/images/20201103BFC-1-4.png)

#### 4.3 自适应两栏布局
每个盒子的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
```html
<style type="text/css">
    * {
        margin: 0;
        padding: 0;
    }
        
    body {
        width: 100%;
        position: relative;
    }
        
    .left {
        width: 100px;
        height: 200px;
        float: left;
        background: rgb(197, 105, 105);
        line-height: 200px;
        text-align: center;
    }
        
    .right {
        width: 500px;
        height: 300px;
        background: rgb(78, 134, 78);
        line-height: 300px;
        text-align: center;
    }
        
    .right1 {
        overflow: hidden;
    }
</style>

<body>
<!--第一个盒子-->
    <div>
        <div class="left">
            left
        </div>
        <div class="right">
            right
        </div>
    </div>
<!--第二个盒子  -->
    <div>
        <div class="left">
            left
        </div>
        <div class="right right1">
            right
        </div>
    </div>
</body>

</html>
```
![](https://gitee.com/zhaoshier/blogimage/raw/master/images/20201103BFC-1-5.png)   
因<font color=#3eaf7c>BFC的区域不会与float box重叠</font>，让right单独变成一个BFC，right会自动适应宽度，形成两栏自适应布局。