---
title: prototype、__proto__与constructor
date: 2020-10-12
tags:
 - Javascript
categories:
 -  Javscript
---

[参考文档](https://blog.csdn.net/cc18868876837/article/details/81211729?utm_medium=distribute.pc_relevant.none-task-blog-title-2&spm=1001.2101.3001.4242)
### 1.举例
**创建一个构造函数Foo(),并用new关键字实例化该构造函数得到一个实例化对象f1。**
```js
function Foo() {...};
let f1 = new Foo();
```

**new操作符将函数作为构造器进行调用时的过程**：<font color=#3eaf7c>函数被调用，然后新创建一个对象，并且成了函数的上下文（也就是此时函数内部的this是指向该新创建的对象，这意味着我们可以在构造器函数内部通过this参数初始化值），最后返回该新对象的引用。</font>

![1](https://gitee.com/zhaoshier/blogimage/raw/master/images/20202022Prototype1.png)

### 2. __proto__属性
**记住**：①__proto__和constructor属性是**对象**所独有的；② prototype属性是**函数**所独有的。
JS中的函数也是一种对象，因此函数拥有__proto__、constructor、prototype三种属性。

![2](https://gitee.com/zhaoshier/blogimage/raw/master/images/20202022Prototype2.jpg)

图：__proto__属性都是由一个对象指向一个对象，即指向它们的原型对象（也可以理解为父对象），那么这个属性的作用是什么呢？它的作用就是<font color=#3eaf7c>当访问一个对象的属性时，如果该对象内部不存在这个属性，那么就会去它的__proto__属性所指向的那个对象（可以理解为父对象）里找，如果父对象也不存在这个属性，则继续往父对象的__proto__属性所指向的那个对象（可以理解为爷爷对象）里找，如果还没找到，则继续往上找…直到原型链顶端null（可以理解为原始人。。。），再往上找就相当于在null上取值，会报错</font>（可以理解为，再往上就已经不是“人”的范畴了，找不到了，到此结束，null为原型链的终点），由以上这种通过__proto__属性来连接对象直到null的一条链即为我们所谓的原型链。

### 3. prototype属性
 prototype属性是**函数**所独有的。它是从**一个函数指向一个对象**。
它的含义是**函数的原型对象**，也就是这个函数（其实所有函数都可以作为构造函数）所创建的实例的原型对象，由此可知：f1.__proto__ === Foo.prototype，它们两个完全一样。
**prototype属性的作用**：<font color=#3eaf7c>让该函数所实例化的对象们都可以找到公用的属性和方法。任何函数在创建的时候，其实会默认同时创建该函数的prototype对象。</font>

![3](https://gitee.com/zhaoshier/blogimage/raw/master/images/20202022Prototype3.png)

### 4. constructor属性
对象独有的，它是从**一个对象指向一个函数**，含义就是指向**该对象的构造函数**。
从图中可以看出：**Function这个对象比较特殊，它的构造函数就是它自己**（因为Function可以看成是一个函数，也可以是一个对象），所有函数和对象最终都是由Function构造函数得来，所以constructor属性的终点就是Function这个函数。

![4](https://gitee.com/zhaoshier/blogimage/raw/master/images/20202022Prototype4.png)

**每个对象都有构造函数**，即每个对象都可找到对应的constructor，创建对象的前提是需要有constructor，constructor可以是对象自己本身显式定义的或者通过__proto__在原型链中找到的。
**单从constructor这个属性来讲，只有prototype对象才有**。函数在创建的时候，JS会同时创建一个该函数对应的prototype对象，而<font color=#3eaf7c>**函数创建的对象.__proto__ === 该函数.prototype，该函数.prototype.constructor===该函数本身**</font>，故通过函数创建的对象即使自己没有constructor属性，它也能通过__proto__找到对应的constructor，所以任何对象最终都可以找到其构造函数（null如果当成对象的话，将null除外）

![5](https://gitee.com/zhaoshier/blogimage/raw/master/images/20202022Prototype5.png)

### 5. 总结
- 牢记两点：①__proto__和constructor属性是对象所独有的；② prototype属性是函数所独有的，因为函数也是一种对象，所以函数也拥有__proto__和constructor属性。
-  __proto__属性的作用就是当访问一个对象的属性时，如果该对象内部不存在这个属性，那么就会去它的__proto__属性所指向的那个对象（父对象）里找，一直找，直到__proto__属性的终点null，再往上找就相当于在null上取值，会报错。通过__proto__属性将对象连接起来的这条链路即我们所谓的原型链。
- **prototype属性的作用**就是让该函数所实例化的对象们都可以找到公用的属性和方法，即f1.__proto__ === Foo.prototype。
- constructor属性的含义就是指向该对象的构造函数，所有函数（此时看成对象了）最终的构造函数都指向Function。