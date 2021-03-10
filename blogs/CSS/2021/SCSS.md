---
title: SCSS语法
date: 2021-03-10
tags:
 - CSS
categories: 
 - CSS
---

### 1.文件引入    
```html
eg1：

<style lang="scss" scoped>
@import '../../styles/readBid.scss';
</style>
```
### 2.变量
通过$符号声明变量，使用“-中划线”，变量默认值使用!default
```scss
eg2：

$warnning-color: red;
$warnning-border: 1px solid $warning-color;    
//$warning-color的值将会替换所有引用他们的位置
// !default !important的反义词
$set-width: 400px !default; 
```

### 3.嵌套
#### 3.1 父选择器 &
```scss
eg3： 

.content {
  a {
    &:hover { margin-bottom: 1.4em }
  }
}
// 转换后
.content a:hover {margin-bottom: 1.4em}
```
#### 3.2 组合嵌套
```scss
eg4：

.container {
  h1, h2, h3 {margin-bottom: .8em}
}
// 转换后
.container h1, .container h2, .container h3 { margin-bottom: .8em }
```

```scss
eg5：

nav, aside {
  a {color: blue}
}
// 转换后
nav a, aside a {color: blue}
```
#### 3.3 结合css+ > ~选择器
```scss
eg6：

article {
  ~ article { border-top: 1px dashed #ccc }
  > section { background: #eee }
  dl > {
    dt { color: #333 }
    dd { color: #555 }
  }
  nav + & { margin-top: 0 }
}
// 转换后
article ~ article { border-top: 1px dashed #ccc }
article > footer { background: #eee }
article dl > dt { color: #333 }
article dl > dd { color: #555 }
nav + article { margin-top: 0 }
```
#### 3.4 属性嵌套
```scss
eg7：

nav {
  border: 1px solid #ccc {
  left: 0px;
  right: 0px;
  }
}
// 转换后
nav {
  border: 1px solid #ccc;
  border-left: 0px;
  border-right: 0px;
}
```

### 4.混合@mixin
混合用来定义在页面中复用的CSS声明，可向mixin传递变量参数（eg：该特性在添加浏览器兼容性前缀的时候非常有用）

@mixin定义的函数通过@include来引入
```scss
eg8：

@mixin border-radius($radius) {
          border-radius: $radius;
      -ms-border-radius: $radius;
     -moz-border-radius: $radius;
  -webkit-border-radius: $radius;
}

.box {
  @include border-radius(10px);
}
```
上面代码定义了一个名字为border-radius的mixin，$radius为参数。

上面代码编译效果如下：
```scss
eg9：

.box {
  border-radius: 10px;
  -ms-border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px; }
```
下面再举一个通过mixin实现样式复用的例子：
```scss
eg10：

@mixin no-bullets {
  list-style: none;
  li {
    list-style-image: none;
    list-style-type: none;
    margin-left: 0px;
  }
}

//引入混合器
ul.plain {
  color: #444;
  @include no-bullets;
}
```
上例编译后代码：
```scss
eg11：

ul.plain {
  color: #444;
  list-style: none;
}
ul.plain li {
  list-style-image: none;
  list-style-type: none;
  margin-left: 0px;
}
```
### 5.继承@extend

继承可通过@extend指令在选择器之间复用css属性
```scss
eg12：

// 这段代码不会被输出到最终生成的CSS文件，因为它没有被任何代码所继承。
%other-styles {
  display: flex;
  flex-wrap: wrap;
}

// 下面代码会正常输出到生成的CSS文件，因为它被其接下来的代码所继承。
%message-common {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.message {
  @extend %message-common;
}

.success {
  @extend %message-common;
  border-color: green;
}

.error {
  @extend %message-common;
  border-color: red;
}

.warning {
  @extend %message-common;
  border-color: yellow;
}
```
上面代码编译成下面代码
```scss
eg13：

.message, .success, .error, .warning {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333; }

.success {
  border-color: green; }

.error {
  border-color: red; }

.warning {
  border-color: yellow; }
```

> 关于@mixin 和 @extend 对比
@minxin 相对@extend更可控，
更易减少复杂度 尤其@mixin可以多层嵌套和传入参数
在使用gzip后 @mixin 比@extend的压缩比更大

### 6.控制命令
#### 6.1 @if
```scss
eg14：

@mixin txt($weight) {
    color: white;
    @if $weight == bold { font-weight: bold;}
    @else if $weight == light { font-weight: 100;}
    @else if $weight == heavy { font-weight: 900;}
    @else { font-weight: normal;}
}

.txt1 {
    @include txt(none);
}

.txt2 {
    @include txt(bold);
}

.txt3 {
    @include txt(light);
}

//转化后
.txt1 {
    color: white;
}

.txt2 {
    color: white;
    font-weight: bold;
}

.txt3 {
    color: white;
    font-weight: 100;
}

```

#### 6.2 @for
```scss
eg15：

@for $i from 1 through 4 {
    .col-#{$i} { width: 100/4 * $i + %;}
}
```

#### 6.3 @each
```scss
eg16：

@each $usr in bob, john, bill, mike {
    .#{$usr}-avatar {
        background-image: url('/img/#{$usr}.png');
     }
}
```

#### 6.4 @while
```scss
eg17：

$x:1;

@while $x < 13 {
    .col-#{$x} { width: 100/12 * $x;}
    $x: $x + 1;
};
```

### 7.操作符
- 判断严格相等 是使用==
- 逻辑操作符是 and or not

```scss
eg18：

$list-map: (success: lightgreen, alert: tomato, info: lightblue);

@mixin button-state($btn-state) {
    @if (length($list-map) > 2 and length($list-map) < 5) {
        background-color: map-get($list-map, $btn-state);
    }
}

.btn {
    @include button-state(success);
}
```
### 8.颜色运算
**(使用rgba hsl请保证透明通道一致)**
```scss
eg19：

color: rgba(70, 132, 153, 1) + rgba(32, 68, 121, 1);
color: #468499 + #204479;
```