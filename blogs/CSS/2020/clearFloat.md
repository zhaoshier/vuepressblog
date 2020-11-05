---
title: 清除浮动的4种方法
date: 2020-11-03
tags:
 - CSS
categories: 
 - CSS
---

:::danger
清除浮动的4种方法：
1. 额外标签法 :x:
2. 父级添加overflow属性 :x:
3. 使用after伪元素清除浮动 :heavy_check_mark:
4. 使用before和after双伪元素清除浮动 :heavy_check_mark:
:::
**为什么要清除浮动？**  
清除浮动主要是为了解决：不给父节点设置高度，子节点设置浮动的时候，会发生高度塌陷。

给父盒子设置一个boder，内部放两个盒子1和2 ，未给1和2设置浮动，它们会默认撑开父盒子，如下图:
![](https://gitee.com/zhaoshier/blogimage/raw/master/images/20201103BFC-1-6.png)

当给内部的1和2盒子加上float属性时， 3盒子会跑到最上面；父盒子因没有宽度变成一条线；1和2盒子已经浮动了。  
![](https://gitee.com/zhaoshier/blogimage/raw/master/images/20201103BFC-1-7.png)     

### 1.额外标签法
**（在最后一个浮动标签后，新加一个标签，给其设置clear：both；）（不推荐）**
```html
<html>

<head>

    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
        }
        
        .father {
            border: 10px green dashed;
            width: 500px;
        }
        
        .one {
            width: 200px;
            height: 200px;
            background: rgb(243, 201, 150);
            float: left;
        }
        
        .two {
            width: 120px;
            height: 120px;
            background: rgb(169, 181, 252);
            float: left;
        }
        
        .three {
            width: 900px;
            height: 100px;
            background: rgb(231, 170, 170);
        }
        
        .clear {
            clear: both;
        }
        
        .apage {
            height: 300px;
        }
    </style>

</head>

<body>
    <div class="father">
        <div class="one">1</div>
        <div class="two">2</div>
        <div class="clear">额外标签法</div>
    </div>
    <div class="three">3</div>


</body>

</html>
```
效果如图：    
![](https://gitee.com/zhaoshier/blogimage/raw/master/images/20201103BFC-1-8.png)

 如果我们清除了浮动，父元素自动检测子盒子最高的高度，然后与其同高。  
 
 <font color=#3eaf7c>**clear：both**</font>的本质就是闭合浮动， 就是让父盒子闭合出口和入口，不让子盒子出来。
 
:::tip   
优点：通俗易懂，方便

缺点：添加无意义标签，语义化差

不建议使用。    
:::

### 2.父级添加overflow属性 
**（父元素添加overflow:hidden）（不推荐）**

通过触发BFC方式，实现清除浮动
```css
 .father{
        border: 10px green dashed;
        width: 500px;
        overflow: hidden;
}
```
效果图：    
![](https://gitee.com/zhaoshier/blogimage/raw/master/images/20201103BFC-1-9.png)

:::tip
优点：代码简洁

缺点：内容增多的时候容易造成不会自动换行导致内容被隐藏掉，无法显示要溢出的元素。 如下图。   
:::      
![](https://gitee.com/zhaoshier/blogimage/raw/master/images/20201105clearFloat-2.png)

### 3.使用after伪元素清除浮动（推荐使用）
```html
.clearfix:after {
        /*伪元素是行内元素 正常浏览器清除浮动方法*/
        content: "";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
        
    .clearfix {
        *zoom: 1;
        /*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
    }
<body>
    <div class="father  clearfix">
        <div class="one">1</div>
        <div class="two">2</div>
    </div>
    <div class="three">3</div>
</body>
```

实现效果：    
![](https://gitee.com/zhaoshier/blogimage/raw/master/images/20201103BFC-1-9.png)    
 
:::tip     
优点：符合闭合浮动思想，结构语义化正确

缺点：ie6-7不支持伪元素：after，使用zoom:1触发hasLayout.    
:::    
### 4.使用before和after双伪元素清除浮动
```html
.clearfix:after, .clearfix:before {
        content: "";
        display: table;
}

.clearfix:after{
    clear:both;
}

.clearfix {
        *zoom: 1;
}

<body>
    <div class="father  clearfix">
        <div class="one">1</div>
        <div class="two">2</div>
    </div>
    <div class="three">3</div>
</body>

```

实现效果：    
![](https://gitee.com/zhaoshier/blogimage/raw/master/images/20201103BFC-1-9.png)    
 
:::tip     
优点：代码更简洁

缺点：用zoom:1触发hasLayout.   
:::      

