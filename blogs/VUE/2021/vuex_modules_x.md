---
title: vuex-modules中互相调用actions
date: 2021-09-17
tags:
 - Vuex
categories: 
 - Vuex
---

### 1.同一个模块actions调用
 对于同一个modules文件中的actions函数，通过store.dispatch方法在一个actions中触发调用另外一个actions函数。
 
 举例：
 ```js
 const actions = {
     getAInfo({ commit }) {
     //在这里触发了getBInfo函数
         dispatch('getBInfo')
     },
     getBInfo({ commit }) {
        console.log("B actions函数")
     },
 }
 ```
 
 ### 2.不同模块actions调用
 actions 中提供如下方法：
 
 rootState 用于获取其它模块state；   
rootGetters 用于获取其他模块getter；
state 用于获取当前模块state
getters 用于获取当前模块getter；   
；
commit 用于调用mutation，当前模块和其他模块；
dispatch 用于调用action，当前模块和其他模块；   
   
 注意点：
 1.被引用模块必须有命名空间（namespaced:true）
 2.引用模块需要在modules中添加被引入模块的名字
 
 #### 2.1 引用其他模块actions
 举例：file.js为被引用模块；people.js为引用模块
```js
//file.js
const state = {
  fileObj: {}, 
};
const getters = {
  getFileObj: state => state.fileObj
};
const actions = {
    getFileInfo({ commit }, obj){
        commit('FILEINFO', obj);
    }
};
const mutations = {
  FILEINFO(state, payload) {
    state.fileObj = payload;
  }
 };
export default {
  namespaced: true, //被引用模块，namespaced必须为true
  state,
  getters,
  actions,
  mutations
};
```

```js
//people.js
const state = {
  peopleObj: '', 
};
const getters = {
  getPeopleObj: state => state.peopleObj
};
const actions = {
    getPeopleFiles({ dispatch }){
    //引入file.js中的getFileInfo actions函数，引用格式dispatch('file/getFileInfo', {}, {root: true})
    //第一个参数：必填，“file/getFileInfo”为actions的路径。
    //第二个参数：必填，如果没有参数，要传一个空对象。
    //第三个参数：必填，固定写法。
        dispatch('file/getFileInfo', { visible: true, bidSectionId: state.currentBidSection.bidSectionId }, {root: true})
    }
};
const mutations = {
  FILEINFO(state, payload) {
    state.peopleObj = payload;
  }
 };
  export default {
  namespaced: true,
  modules:{  //在modules中引入模块
    file
  },
  state,
  getters,
  actions,
  mutations
};
```
[vuex官网：modules的互相调用]([link](https://vuex.vuejs.org/zh/guide/modules.html))