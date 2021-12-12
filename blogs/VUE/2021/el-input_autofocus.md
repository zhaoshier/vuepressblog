---
title: el-input的自动聚焦
date: 2021-06-22
tags:
 - Vue
categories: 
 - Vue
---

最近看element ui官方文档，发现el-input有个属性：autofocus，它的属性介绍如下：

![autofocus属性介绍](https://gitee.com/zhaoshier/blogimage/raw/master/images/autofocus.png)

但是element中的el-input组件外面还有其他组件, 导致autofocus失效, 只能手动调用focus方法来聚集。   

根据这个问题，可通过以下方式来解决。

### 1.vue指令方式（directives）
```
<el-input v-focus></el-input>

directives: {
  // 注册一个局部的自定义指令 v-focus
  focus: {
    // 指令的定义
    inserted: function (el) {
      // 聚焦元素
      el.querySelector('input').focus()
    }
  }
},
```

### 2.vue的ref属性
```
<el-input v-model="input" placeholder="请输入内容" ref="input"></el-input>
1
this.$nextTick(() => {
     this.$refs.input.focus()
})
```