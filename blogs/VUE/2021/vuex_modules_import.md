---
title: vue文件调用多个modules的mapState,mapGetters,mapMutations,mapActions
date: 2021-09-17
tags:
 - Vuex
categories: 
 - Vuex
---

```js
//toolbar.js， test.js为某个vuex的module
import { createNamespacedHelpers, mapGetters, mapActions } from "vuex";
const { mapGetters:toolBarMapGetters, mapActions:toolBarMapActions } = createNamespacedHelpers('toolbar');
const { mapGetters:testMapGetters, mapActions:testMapActions } = createNamespacedHelpers('test');

...mapGetters(['get'])
...toolBarMapGetters(['toolBarGet'])
...testMapGetters(['testGet'])

...mapActions(['actions'])
...toolBarMapActions(['toolBarActions'])
...testMapActions(['testActions'])
```