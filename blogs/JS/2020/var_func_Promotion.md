---
title: 变量声明与函数声明
date: 2020-10-10
tags:
 - Javascript
categories:
 -  Javscript
---
先思考下面两段代码分别输出什么？
```js
example 1:
function func1(){
    var a = 1;
    function a() {}
    console.log(a);
}
func1();

example 2:
function func2(){
    var a;
    function a() {}
    console.log(a);
}
func2();

<!--example 1的输出结果为1，example 2的输出结果为函数a()-->
```
为什么两个example的输出结果是这样呢？这就涉及到JS中的变量提升和函数提升的不同之处了。  
### 1.变量提升
```js
example 3:

var a = 1;
var b = 2;
```
example 3的实际解析过程如下:
```js
var a;
var b;
a = 1;
b = 2;
```
由example 3可以看出，JS在定义一个变量时，并不是声明后立刻赋值；而是把所有的变量全部声明后，再到变量赋值的地方进行赋值。变量的声明过程也就是我们所说的变量提升。

为了验证上述说法，我们看一下example 4：
```js
example 4:
function func4(){
    var a = 1;
    console.log(a);
    console.log(b);
    var b = 2;
}
func4();
```
example 4的实际解析过程如下:
```js
function func4(){
    var a;
    var b;
    a = 1;
    console.log(a); //1
    console.log(b); //undefined
    b = 2;
}
func4();
```
由example 3和example 4知：变量的提升，提升的其实是变量的声明，而不是变量的赋值

### 2.函数的提升

函数的提升和变量的提升类似，都是提升到作用域的最开始的位置，只不过变量的提升分两步：第一步是变量声明的提升；第二步是变量的赋值。而<font color=#3eaf7c>**函数的提升是直接将整个函数提升到作用域的最开始位置，相当于直接剪切过去一样**。</font>

### 3.变量提升和函数提升的顺序
在作用域中，不管是变量还是函数，都会提升到作用域最开始的位置，不同的是：<font color=#3eaf7c>**函数的提升后的位置是在变量提升后的位置之后的。**</font>
```js
example 5:
function func5(){
    console.log(a);
    var a = 1;
    console.log(a);
    function a() {}
    console.log(a);
}
func5();
```
example 5的实际解析过程如下:
```js
function func5(){
    var a;
    function a() {}
    console.log(a); //a()
    a = 1;
    console.log(a); //1
    console.log(a); //1 
}
func5();
```
为验证**函数的提升后的位置是在变量提升后的位置之后**，调换一下var a = 1;与 function a (){ }的位置。
```js
example 6:
function func6(){
    console.log(a);
    function a() {}
    var a = 1;
    console.log(a);
    console.log(a);
}
func6();
```
example 6的解析过程与example 5一样:
```js
function func6(){
    var a;
    function a() {}
    console.log(a); //a()
    a = 1;
    console.log(a); //1
    console.log(a); //1 
}
func6();
```

下面再看一个更复杂一点的例子：
```js
example 7:
function func7(){
    console.log(a);
    var a = 1;
    console.log(a);
    function a() {}
    console.log(a);
    console.log(b);
    var b = 2;
    console.log(b);
    function b() {}
    console.log(b);
}
func7();
```
```js
function func7(){
    var a;
    var b;
    function a() {}
    function b() {}
    console.log(a); //a()
    a = 1;
    console.log(a); //1
    console.log(a); //1
    console.log(b); //b()
    b = 2;
    console.log(b); //2
    console.log(b); //2
}
func7();
```

**注意：只有声明的变量和函数才会提升，隐式全局变量不会提升！！** 

example 8 中，b不会进行变量提升
```js
example 8:
function func8() {
  console.log(a); //undefined
  console.log(b); // 报错
  b = 'aaa';
  var a = 'bbb';
  console.log(a);
  console.log(b);
}
func8();
```

---
**<font color=#3eaf7c>-----2020.10.10补充-----</font>**    
当在函数体内部调用自身时，对应的函数提升与变量提升如example 9：
```js
example 9:

console.log(typeof a); //function
a(); //function
var a = 3;
function a() {
 console.log(typeof a);
}
console.log(typeof a); //number
a = 6;
a(); //a is not a function
```
example 9的解析过程：
```js
var a;
function a() {
    console.log(typeof a);
}
console.log(typeof a); //function
a(); //function (因函数体内部可以调用自身，所以typeof a 为 function)
a = 3;
console.log(typeof a); //number
a = 6;
a(); //a is not a function
```

**函数提升**  
函数提升和变量提升还有点不一样。函数提升，只会提升函数声明，而不会提升函数表达式。
```js
example 10:

f(); //0
fn(); //fn is not a function 

//函数表达式
var fn = function(){
    console.log(1)
}

//函数声明
function f(){
    console.log(0)
}
```
example 10解析过程：
```js
var fn;
//函数声明
function f(){
    console.log(0)
}

f(); //0
fn(); //fn is not a function 

//函数表达式
fn = function(){
    console.log(1)
}
```
**代码块中的函数提升与变量提升**    
当变量声明或函数声明放在某个代码块时，对应的变量提升和函数提升是什么样的呢？ 

代码块中的变量声明如example 11所示：
```js
example 11:

console.log(a); //undefined
if(true){
    var a =1;
}
console.log(a) //1
```
example 11解析过程：
```js
var a;
console.log(a); //undefined
if(true){
    a =1;
}
console.log(a) //1
```
**代码块中的函数声明（重点）**   
正常情况下函数声明会有声明提升的现象，会被提升到当前作用域的顶部，但如果函数声明出现在代码块中会出现不一样的情况。

```js
example 12:

console.log(a); //undefined
if(true){
    function a() {
        console.log('aaaa')
    }
}
console.log(a) //a()
a() //aaa
```
按照正常的函数提升流程，在第一行console.log(a)会输出a(),但输出却为undefined，这说明当前作用域是有a变量的。      
然后，在代码块之前，调用函数a，如example 13所示：
```js
example 13:

console.log(a); //undefined
a() //a is not a function
if(true){
    function a() {
        console.log('aaaa')
    }
}
console.log(a) 
a() 
```
这里会报错"a is not a function"，这里报错和函数表达式的声明提升报错一样。   
说明：**代码块中的函数声明会被转换成表达式声明**，在全局作用域中创建了这个变量声明，但具体的值需在代码执行后才能被赋予。

为了验证大家学的怎么样，再来看一个复杂点的例子
```js
example 14:

console.log(a); //undefined
console.log(typeof f); //undefined

var flag = true;
if (!flag) {
    var a = 1;
};

if (flag) {
    function f(a) {
        f = a;
        console.log("1");
    };
}
console.log(typeof f); //function
console.log(f); //f(a)
f() //1
```
example 14 的解析过程：

```js
var flag;
var a;
var f; //在块级作用域中，函数声明转换成函数表达式形式，f相当于函数f(a)的函数表达式方式的变量提升。

console.log(a); //undefined
console.log(typeof f); //undefined

flag = true;
if (!flag) {
    a = 1;
};

if (flag) {
    function f(a) {
        f = a;
        console.log("1");
    };
}
console.log(typeof f); //function
console.log(f); //f(a)
f() //1
```
最后，再来看一个跟example14联系的例子，纯粹为了巩固所学。
```js
console.log(typeof fun1); //function
console.log(typeof fun2); //function
fun1(); //fun1
fun2(); //fun2
function fun1(){
    console.log("fun1")
}
function fun2(){
    console.log("fun2")
}

function fun3(){
   //局部作用域
    console.log(typeof fun1);// function
    console.log(typeof fun2);//undefined
    fun1();//11
    fun2();//Uncaught TypeError: fun2 is not a function
    function fun1(){console.log("11")}//函数声明
    var fun2=function(){console.log("22")}//函数表达式

}
fun3();
```