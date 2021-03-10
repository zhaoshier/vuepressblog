---
title: vue中的强制刷新方法
date: 2021-03-02
tags:
 - Vue
categories: 
 - Vue
---

之前在对表格数据进行修改时，我把修改后的详情数据保存传到后端，通过Network看我的数据已经成功地传到后端了。但是！表格中的数据并没有更新，而必须要按F5或者重新将进入列表页面，表格数据才会更新。为了解决这个问题，我在网上找到一个比较好的方法。

### 1.首先在app.vue中定义reload()方法
```html
<!--APP.vue-->
<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>
```

### 2.在需要强制刷新的页面引用
```html
<script>
export default {
data(){
    return{}
},
  inject: ['reload'],
  methods: {
    clickReload() { // 点击之后强制刷新,可自定义为任何函数
       this.reload()
     }
  }
}
</script>
```