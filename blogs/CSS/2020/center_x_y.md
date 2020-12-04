---
title: 水平垂直居中
date: 2020-12-04
tags:
 - CSS
categories: 
 - CSS
---

### 1.定宽高元素水平垂直居中
:::tip   
1.子绝父相+负margin     
2.子绝父相+ margin auto      
3.子绝父相 + calc    
:::  

父元素宽度/高度：300px/300px     
子元素宽度/高度：200px/200px     
![1](https://gitee.com/zhaoshier/blogimage/raw/master/images/20201104center-1.png)
#### <font color=#3eaf7c> 1.1 子绝父相+负margin</font>
```html
<style type="text/css">
    * {
        margin: 0;
        padding: 0;
    }
    /* 样式代码 */
    .outer {
        border: 10px green dashed;
        width: 300px;
        height: 300px;
        margin: 100px 0 0 100px;
    }
        
    .inner {
        background-color: rgb(212, 123, 123);
        width: 200px;
        height: 200px;
    }
        
    /* 父元素相对定位 */
    .outerBox {
        position: relative;
    }
        
    /* 子元素绝对定位+负margin*/
    .innerBox {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -100px;
        margin-left: -100px;
        }
</style>
<body>
    <div class="outer outerBox">
        父
        <div class="inner innerBox">子</div>
    </div>
</body>

</html>
```
子元素绝对定位是相对于父元素的宽高，然后再借助子元素的外边距为子元素宽度一半的负值。       
:::tip  
优点：容易理解，兼容性也很好   
缺点：需要知道子元素的宽高    
:::
#### 1.2 子绝父相+ margin auto
```css
/* 父元素相对定位 */
.outerBox {
    position: relative;
}

/* 子元素绝对定位 + magin：auto + 各个方向距离都为0*/
.innerBox {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
}
```
:::tip  
优点：兼容性很好   
缺点：需要知道子元素的宽高    
:::
#### 1.3 子绝父相 + calc
```css
/* 父元素相对定位 */
        
.outerBox {
    position: relative;
}
/* 子元素绝对定位 + 计算属性calc*/
/*注意: 减号两边必须留空格*/
        
.innerBox {
    position: absolute;
    top: calc(50% - 100px);
    left: calc(50% - 100px);
}
```
:::tip  
优点：代码简单   
缺点：需要兼顾clac的兼容性（IE 9+），也需知道子元素的宽高    
:::
### 2.不定宽高元素水平垂直居中
:::tip   
1.子绝父相 + transform   
2.flex布局     
3.lineheight  
4.css-table    
:::
#### 2.1 子绝父相 + transform
```html
<html>
<head>
    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
        }
        
        /* 样式代码 */
        .outer {
            border: 10px green dashed;
            margin: 100px 0 0 100px;
        }
        .inner {
            background-color: rgb(212, 123, 123);
        }
        
        /* 父元素相对定位 */
        .outerBox {
            position: relative;
        }
        
        /* 子元素绝对定位 + transform*/
        /*内容撑开父/子元素*/
        .innerBox {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    </style>
</head>
<body>
    <div class="outer outerBox">
        父
        <div class="inner innerBox">子元素：内容撑开盒子</div>
    </div>
</body>
</html>
```

实现效果图如下：      
![](https://gitee.com/zhaoshier/blogimage/raw/master/images/20201204221230.png)

#### <font color=#3eaf7c> 2.2 flex布局 </font>
```css
/* 父元素flex */
.outerBox {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

![](https://gitee.com/zhaoshier/blogimage/raw/master/images/20201204221329.png)

#### 2.3 lineheight 
```css
/* 父元素设置行高，内容居中 */
.outerBox {
    line-height: 100px;
    text-align: center;
}

/* 子元素行高使用initial*/
/*内容撑开子元素*/
.innerBox {
    display: inline-block;
    vertical-align: middle;
    line-height: initial;
    text-align: left;/* 修正文字 */
}
```
![](https://gitee.com/zhaoshier/blogimage/raw/master/images/20201204221559.png)

#### <font color=#3eaf7c> 2.4 css-table </font>
```css
.outerBox {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}

.innerBox {
    display: inline-block;
}
```
![](https://gitee.com/zhaoshier/blogimage/raw/master/images/20201204222518.png)
#### 2.5 grid 
```css
.outerBox {
    display: grid;
    align-items: center;
    justify-items: center;
}
/*子元素内容撑开盒子*/
```
![](https://gitee.com/zhaoshier/blogimage/raw/master/images/20201204223403.png)


### 3.总结    

> 1. PC端有兼容性要求，宽高固定，用“子绝父相+负margin ”  
> 1. PC端有兼容性要求，宽高不固定，用“css-table ”  
> 1. PC端无兼容性要求，宽高不固定，用“flex ”  
> 1. 移动端使用flex

[参考文章](https://www.jianshu.com/p/907f99004c3e)