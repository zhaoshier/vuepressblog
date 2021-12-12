---
title: vue子组件中改变props的值并更新到父组件中
date: 2021-07-30
tags:
 - Vue
categories: 
 - Vue
---

### 1.情况
> 父 => 子 组件传值（props传值）是单向的，如果想在子组件中修改props的值并更新到父组件，单纯的直接修改props值会报错且不会更新到父组件中。

针对这个问题，我一直都是通过```.sync+ this.$emit()```来实现。     
近期又发现了解决这个问题的新方法。

### 2.方法
####  2.1 v-model
 父组件代码实现：
 ```html
 <template>
    <div class="my-parent">
        <h4>我是父组件</h4>
        // 父组件上的v-model默认对应其子组件的props的value
        <child v-model="parentInfo"></child>
    </div>
</template>

<script>
    import child from "./child";
    export default {
        name: "parent",
        components: {child},
        data() {
            return {
                parentAge: '我是父组件数据'
            };
        }
    }
</script>
 ```
 
 子组件代码实现：
 ```html
<template>
    <div class="my-child">
        <h4>我是子组件</h4>
        <p>我是子组件，通过props属性来接受父组件传过来的值：{{deliverParentAge}}</p>
        <el-button @click="changeModelValue">点击改变子组件传过来的值</el-button>
    </div>
</template>

<script>
    export default {
        name: "child",
        data() {
            return {
                
            };
        },
        model: {
            prop: 'deliverParentAge',
            event: 'change'
          },
        props: {
            deliverParentAge: String
        },
        methods: {
            changeModelValue(){
              this.deliverParentAge = "子组件改变了父组件通过v-model传过来的值"
            },
        }
    }
</script>
 ```
![](https://gitee.com/zhaoshier/blogimage/raw/master/images/v-model-props.gif)
####  2.2 sync
  ```html
<template>
    <div class="my-parent">
        <h4>我是父组件</h4>
        <child :deliverParentAge.sync="parentAge"></child>
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
  子组件代码实现：
 ```html
 <template>
<div class="my-child">
    <h4>我是子组件</h4>
    <p>我是子组件，通过props属性来接受父组件传过来的值：{{deliverParentAge}}</p>
    <el-button @click="changeModelValue">点击改变子组件传过来的值</el-button>
</div>
</template>

<script>
export default {
    name: "child",
    data() {
        return {
            
        };
    },
    props: {
        deliverParentAge: String
        default: ''
    },
    methods: {
        changeModelValue(){
          this.$emit('update:deliverParentAge',"子组件改变了父组件通过v-model传过来的值");
        },
    }
}
</script>
 ```