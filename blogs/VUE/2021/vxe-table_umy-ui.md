---
title: 基于vue项目的两个插件介绍
date: 2021-09-10
subSidebar: true
tags:
 - vue
categories:
 -  vue
---

前言：最近接触到一个具有超大数据量表格相关的项目，发现当非树形表格数据量>2000条，或树形表格数据量>1000条，el-table的表格渲染非常的卡顿，当数据超过10000条时，页面经常会卡死，用户体验效果非常不好。

目标：兼容当前的element UI组件，且提升大数据表格的渲染速度。

经过我不懈的查找and百度，终于找到两个分别适合普通表格和树形表格的插件（分别为[vxe-table](https://xuliangzhan_admin.gitee.io/vxe-table/#/table/start/install) 和[umy-ui
](https://note.youdao.com/)），且完全兼容element UI的组件库。

### 1.vxe-table介绍
#### 1.1 插件安装
> vxe-table官网推荐使用npm安装，可以更好地和webpack打包工具配合

npm安装命令：
```
npm install xe-utils@3 vxe-table@3
```
在main.js中引用：
```
import Vue from 'vue'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

Vue.use(VXETable)

// 给 vue 实例挂载内部对象，例如：
// Vue.prototype.$XModal = VXETable.modal
// Vue.prototype.$XPrint = VXETable.print
// Vue.prototype.$XSaveFile = VXETable.saveFile
// Vue.prototype.$XReadFile = VXETable.readFile
```
#### 1.2 主要的几种类型表格介绍

![](https://gitee.com/zhaoshier/blogimage/raw/master/images/vxe-table目录.png)

**1.2.1 复杂表格**   
我觉得vxe-table的复杂表格最具特色的是可实现：1.自定义列头筛选；2.自定义排序和筛选图标；3.在表格上方可设置“导出”、“打印”等快捷设置功能。

**1.2.2树表格**   
树表格，通过配置 tree-config 和指定列 tree-node 属性来开启树表格，通过 row-id 指定主键，还可以通过 trigger 指定触发方式
(注：树结构不支持大量数据，如果数据量超过 2000 条，请谨慎使用！当数据量很大时，可考虑用umy-ui插件)
**1.2.3 虚拟滚动**   
虚拟滚动（最大可以支撑 5w 列、30w 行），启用后只会渲染指定范围内的可视区数据，其他的数据将被卷去收起，当滚动到可视区时才被渲染出来，非常适合大数据量的普通表格。    

大数据不建议使用双向绑定的 data 属性（vue 监听会大数据会短暂的卡顿），建议使用 loadData/loadColumn 函数

### 2.umy-ui介绍

#### 2.1 安装
```
npm install umy-ui
```

main.js中引用：
```
  import UmyUi from 'umy-ui'
  import 'umy-ui/lib/theme-chalk/index.css';// 引入样式
//注：umy-ui中的样式会影响element-ui的icon显示，若非必要使用umy-ui样式，就不要全局引用了
  Vue.use(UmyUi);
```

#### 2.2介绍

umy-ui的虚拟表格u-table可以解决大数据量树形表格渲染时的卡顿问题，若表格数据量不大，请选择使用element-ui中的el-table。


> 1. 若想提升加载渲染速度，需使用use-virtual属性； 
> 2. 使用u-table 开启use-virtual虚拟可以支持微小的合并行|列 如2列 2行，支持多级头, 超过2行2列可能布局错乱，因为虚拟滚动的原理导致某些节点并未渲染；  
> 3. 使用u-table 开启use-virtual不支持开展行，如果需要展开行，需用虚拟表格部分的ux展开行；
> 4. ux-grid解决列多 行多导致卡的情况； u-table解决行多的情况，不解决列多的情况。（如你的列超过70+，你可能就需要使用ux-grid了，因为此时你需要把列也虚拟） ；
> 5. 使用use-virtual,必须给表格设置一个row-height属性（eg：row-height值要写成“80”，不能写成“80px”）；
> 6. 在使用虚拟树表格时,必须使用row-id属性，给表格的每一个添加一个唯一的id；
> 7. 对于树形表格，需要给子元素定义tree-config属性。
