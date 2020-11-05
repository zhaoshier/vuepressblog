---
title: 父子组件通信
date: 2020-11-04
tags:
 - Vue
categories: 
 - Vue
---


父子组件通信包括：
1. 父组件 => 子组件传值
2. 子组件 => 父组件传值    


### 1.父组件向子组件通信
:::tip   
父组件：需要引入子组件，然后通过v-bind绑定需要传给子组件的属性值。    
子组件：通过props属性，在子组件中接收父组件传过来的值。    
:::    

**父组件代码实现：**
```html
<template>
<div class="my-parent">
    <h4>我是父组件</h4>
    <p>父组件的年龄是：{{parentAge}}</p>
    <p>下面通过v-bind语法糖绑定一个属性deliverParentAge，将父组件里的值传到子组件，实现父 -> 子组件通信</p>
    <p>下面引入子组件</p>
    <child :deliverParentAge="parentAge"></child>
</div>
</template>

<script>
import child from "./child";
export default {
    name: "parent",
    components: {child},
    data() {
        return {
            parentAge: 50
        };
    }
}
</script>
```

**子组件代码实现：**
```html
<template>
<div class="my-child">
    <h4>我是子组件</h4>
    <p>子组件的年龄是：{{childAge}}</p>
    <p>我是子组件，通过props属性来接受父组件传过来的值：{{deliverParentAge}}</p>
</div>
</template>

<script>
export default {
    name: "child",
    data() {
        return {
            childAge: 26
        };
    },
    props: {
        deliverParentAge: Number
    }
}
</script>
```

实现效果图：     
![1](https://gitee.com/zhaoshier/blogimage/raw/master/images/009c075966151d9648262f9d13824d1.png)     
### 2.子组件向父组件通信

:::tip   
子组件：用$emit()来触发事件
父组件：通过v-on来监听子组件事件，在父组件中接收子组件传过来的值。    
:::    

**子组件代码实现**：
```html
<template>
<div class="my-child">
    <h4>我是子组件</h4>
    <p>子组件的年龄是：{{childAge}}</p>
    <p>----------------------------------</p>
    <p>我可以修改父组件传过来的值：{{deliverParentAge}}，我让值<button @click="addAge">加1</button>
        。但我需要在点击事件函数里，通过this.$emit方法提交一个事件addParentAge，将修改过后的值传给父组件</p>
</div>
</template>

<script>
export default {
    name: "child",
    data() {
        return {
            childAge: 26
        };
    },
    props: {
        deliverParentAge: Number
    },
    computed: {
        parentNewAge() {
            return this.deliverParentAge + 1;
        }
    },
    methods: {
        addAge() {
            this.$emit("parentActualAge",
                this.parentNewAge)
        }
    }
}
</script>
```
**父组件代码实现：**
```html
<template>
<div>
    <div class="my-parent">
        <h4>我是父组件</h4>
        <p>父组件的年龄是：{{parentAge}}</p>
        <p>-------------------------------</p>
        <p>我在子组件中通过on-click方法监听子组件提交的事件parentActualAge，父组件最后年龄为{{lastAge}},实现 子 -> 父 通信</p>
        <p>下面引入子组件</p>
    </div>
    <child :deliverParentAge="parentAge" @parentActualAge="handleParentAge"></child>
    <p>
    </p>
</div>
</template>

<script>
import child from "./child";
export default {
    name: "parent",
    components: {child},
    data() {
        return {
            parentAge: 50,
            lastAge: ''
        };
    },
    methods: {
        handleParentAge(age) {
            this.lastAge = age
            console.log(age)
        }
    }
}
</script>
```

实现效果图：      
![2](https://gitee.com/zhaoshier/blogimage/raw/master/images/20201104CtoP-1.png)