---
title: FormData,Blob,File,FileReader,URL,URLSearchParams，Base64,Unit8Array等数据类型
date: 2020-11-02
tags:
 -  Browser
categories:
 -  Browser
---

### 1.FormData

FormData对象,可通过JavaScript用一些键值对来模拟一系列表单控件,我们还可以使用XMLHttpRequest的send()方法来异步的提交这个"表单".比起普通的ajax,使用FormData的最大优点就是我们可以异步上传一个二进制文件。

#### 1.1 构造函数
FormData()可用于创建一个新的FormData对象
#### 1.2 formData的方法
![](https://gitee.com/zhaoshier/blogimage/raw/master/images/20201030formData-1.png)

```js
var formData = new FormData();
formData.append("k1", "v1"); //append()方法的第二个参数可以是File,Blob对象
formData.append("k1", "v2");
formData.get("k1"); // // "v1" 获取key为name的第一个值
formData.getAll("k1"); // ["v1","v2"] 返回一个数组，获取key为name的所有值
formData.set("k1", "1"); //设置修改数据
formData.has("k1"); // true 来判断是否有对应的key值
formData.has("k2"); // false
formData.delete("k1"); //删除数据
```
example 1：根据已有form表单初始化一个formData对象
```js
// 获取页面已有的一个form表单
var form = document.getElementById("myForm");
// 用表单来初始化
var formData = new FormData(form);
// 我们可以根据name来访问表单中的字段
var name = formData.get("name"); // 获取名字
var psw = formData.get("pw"); // 获取密码
// 当然也可以在此基础上，添加其他数据
formData.append("token","kshdfiwi3rh");
```
example 2:发送一个二进制流
```js
var content = '<a id="a"><b id="b">hey!</b></a>'; 
var blob = new Blob([content], { type: "text/xml"});
formData.append("file", blob);
axios.post('http://demo.api.com/doSomething', formData,
    {
        headers: {
            'Content-Type': 'multipart/form-data'
       }
   }
)
```

### 2.Blob
```js
/**
* Blob构造函数：
* dataArray：数组，包含了要添加到Blob对象中的数据，数据可以是Int32Array、Uint8Array、Float32Array等，或者连续内存缓冲区ArrayBuffer，ArrayBufferView， Blob，或者 DOMString对象。
* opt：对象，用于设置Blob对象的属性（如：MIME类型）
**/
var blob = new Blob(dataArr:Array<any>, opt:{type:string});
```

#### 2.1 创建一个装填DOMString对象的Blob对象
example 3:
```js
var s = '<div>hello</div>'
var blobObj = new Blob([s], {type: 'text/xml'})
```
#### 2.2 创建一个装填ArrayBuffer对象的Blob对象
example 4:
```js
var abf = new ArrayBuffer(8)
var blobOjb = new Blob([abf], {type: 'text/plain'})
```

#### 2.3 Bolb.slice()
此方法返回一个新的Blob对象，包含了原Blob对象中指定范围内的数据，利用此发放可以实现大文件的分片上传
```js
/**
* start：开始索引，默认为0
* end：截取结束索引（不包括end）
* contentType：新Blob的MIME类型，默认为空字符串
**/
Blob.slice(start:number, end:number, contentType:string)
```

#### 2.4 Canvas.toBlob()
canvas转为blob对象

#### 2.5 实现url下载文件
window.URL对象可以为Blob对象生成一个网络地址，结合a标签的download属性，可以实现点击url下载文件
```js
function createDownload(fileName, content){
    var blob = new Blob([content]);
    var link = document.createElement("a");
    link.download = fileName;
    link.href = URL.createObjectURL(blob); //可以直接当作image的src属性来显示图片
    link.click()
}
```

### 3.File

:::tip    
File是Blob的子类，比blob主要多出一个name的属性。    
:::     
我们常用的文件选择标签<input type="file" />元素就拥有一个files属性，这个files就是File类型.
```js
var input = document.querySelector('input[type=file]');
console.log(input.files) // FileList {0: File(3044232), length: 1}
```

### 4.URL
:::tip
除了可以使用base64字符串作为内容的DataURI将一个文件嵌入到另外一个文档里，还可以使用URL对象。URL对象用于生成指向File对象或Blob对象的URL
:::
#### 4.1 实例属性：
```js
var url = new URL(location.href)
url.href //包含完整 URL 的DOMString
url.protocol //包含 URL 协议名的DOMString,末尾带 ':'。
url.host //包含 URL 域名，':'，和端口号的DOMString
url.hostname //包含 URL 域名的DOMString
url.port //包含 URL 端口号的DOMString
url.pathname //以 '/' 起头紧跟着 URL 文件路径的DOMString
url.search //以 '?' 起头紧跟着 URL 请求参数的DOMString
url.hash //以 '#' 起头紧跟着 URL 锚点标记的DOMString
url.username //包含在域名前面指定的用户名的DOMString
url.password //包含在域名前面指定的密码的DOMString
url.origin //返回一个包含协议名、域名和端口号的DOMString
url.searchParams //返回一个用来访问当前 URL GET 请求参数的URLSearchParams对象
```
#### 4.2 方法
- URL.createObjectURL()
- URL.revokeObjectURL()

**(1) URL.createObjectURL()**   

该方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。

```js
var objectURL = URL.createObjectURL(blob);
```
blob是用来创建 URL 的 File 对象或者 Blob 对象​

**(2) URL.revokeObjectURL()**
该方法用来释放一个之前通过调用 URL.createObjectURL() 创建的已经存在的 URL 对象。当你结束使用某个 URL 对象时，应该通过调用这个方法来让浏览器知道不再需要保持这个文件的引用了。

```js
window.URL.revokeObjectURL(objectURL);
```
objectURL是一个 DOMString，表示通过调用 URL.createObjectURL() 方法产生的 URL 对象

### 5.URLSearchParams
:::tip   
 URLSearchParams 接口定义了一些实用的方法来处理 URL 的查询字符串。   
:::

方法：
![](https://gitee.com/zhaoshier/blogimage/raw/master/images/20201030URLSearchParams-1.png)
基本用法：
```js
var paramsString = "https://www.baidu.com?topic=api&target=bank"
var searchParams = new URLSearchParams(paramsString);

searchParams.has('topic') // true
searchParams.get('topic') // "api"
searchParams.get('target') // "bank"
searchParams.getAll('topic') // ["api"]

searchParams.get('foo') // null，注意Firefox返回空字符串
searchParams.set('foo', 2);
searchParams.get('foo') // 2

searchParams.append('topic', 'webdev');
searchParams.toString() // "q=URLUtils.searchParams&topic=api&foo=2&topic=webdev"

searchParams.append('foo', 3);
searchParams.getAll('foo') // [2, 3]

searchParams.delete('topic');
searchParams.toString() // "q=URLUtils.searchParams&foo=2&foo=3"
```

在一些场景里使用axios发送数据时若需要以application/x-www-form-urlencoded格式发送数据，在浏览器端可以用URLSearchParams的实例当作POST数据发送，所有数据都会URL编码。（请注意，由于URLSearchParams支持性不好，可以使用polyfill来转换，可以在入口文件引入）
```js
import 'url-search-params-polyfill';
```
在node环境里可以使用querystring模块进行编码
```js
var querystring = require('querystring');
axios.post('http://something.com/', querystring.stringify({ foo: 'bar' });
```

DOM 的 a 元素节点的 searchParams 属性，就是一个 URLSearchParams 实例。
```js
var a = document.createElement('a');
a.href = 'https://example.com?filter=api';
a.searchParams.get('filter') // "api"
```
URLSearchParams 还可以与 URL 接口结合使用:
```js
var url = new URL(location);
var foo = url.searchParams.get('foo') || 'somedefault';
```

### 6.FileReader
:::tip   
我们知道Blob对象只是二进制数据的容器，本身并不能操作二进制，FileReader对象就是专门操作二进制数据的，FileReader主要用于将文件内容读入内存，通过一系列异步接口，可以在主线程中访问本地文件。
:::

创建实例：
```js
var reader = new FileReader();
```

**方法（入参都是File或Blob对象）：**
- reader.abort() 终止文件读取操作
- reader.readAsArrayBuffer(file) 异步按字节读取文件内容，结果用ArrayBuffer对象表示
- reader.readAsBinaryString(file) 异步按字节读取文件内容，结果为文件的二进制串
- reader.readAsDataURL(file) 异步读取文件内容，结果用data:url(即Base64格式)的字符串形式表示
- reader.readAsText(file, encoding) 异步按字符读取文件内容，结果用字符串形式表示

**事件名称：**
- onabort 当读取操作被中止时调用
- onerror 当读取操作发生错误时调用
- onload 当读取操作成功完成时调用
- onloadend 当读取操作完成时调用,不管是成功还是失败
- onloadstart 当读取操作将要开始之前调用
- onprogress 在读取数据过程中周期性调用

**实际应用场景:**   

(1) 图片上传预览
```js
var input  = document.getElementById("file"); //input file
input.onchange = function(){
    var file = this.files[0];
    if(!!file){
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(){
            //读取完毕后输出结果
           document.getElementById("file_img").src = reader.result //显示上传的图片
           console.log(reader.result);
        }
    }
}
```
(2) 图片转二进制Blob
```js
input.addEventListener('change', function() {
  var file = this.files[0],
      fr = new FileReader(),
      blob;
  fr.onload = function() {
      blob = new Blob([this.result]);
      var formdata = new FormData()
      formdata.append('file', blob)
  };
  fr.readAsArrayBuffer(file)
});
```

(3) 图片Image转Base64
```js
function getImgToBase64(url,callback){
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    var img = new Image
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img,0,0);
        var dataURL = canvas.toDataURL('image/png'); //base64格式
        callback(dataURL);
        canvas = null;
    };
    img.src = url;
}
```

(4) Base64转为Blob、File
```js
function base64ToBlob(base64){
    var arr = base64.split(',')
    var mime = arr[0].match(/:(.*?);/)[1]
    var bytes = atob(arr[1])      //对用base64编码过的二进制进行解码  
    var n = bytes.length
    var u8arr = new Uint8Array(n)
    while(n--){
        u8arr[n]=bytes.charCodeAt(n);   //将编码转换成Unicode编码
    }
    return new Blob([u8arr], {type: mime})
    //or: return new File(u8arr], {type:mime})  //base64转换为文件

   //以二进制的方式传参：
    var formdata = new FormData()
    formdata.append('file', new Blob([u8arr], {type: mime}))
    xhr.send(formdata)
}
```

### 7.Base64
[参考博客：图片的Base64编码](https://www.cnblogs.com/coco1s/p/4375774.html)

图片的 base64 编码就是可以将一副图片数据编码成一串字符串，使用该字符串代替图像地址。
#### 7.1 base64编码的格式
```css
<!--在css中的写法-->

#fkbx-spch, #fkbx-hspch {
  background: url(data:image/gif;base64,R0lGODlhHAAmAKIHAKqqqsvLy0hISObm5vf394uLiwAAAP///yH5B…EoqQqJKAIBaQOVKHAXr3t7txgBjboSvB8EpLoFZywOAo3LFE5lYs/QW9LT1TRk1V7S2xYJADs=) no-repeat center;
}
```
```html
<!--在标签里的写法-->
<img src="data:image/gif;base64,R0lGODlhHAAmAKIHAKqqqsvLy0hISObm5vf394uLiwAAAP///yH5B…EoqQqJKAIBaQOVKHAXr3t7txgBjboSvB8EpLoFZywOAo3LFE5lYs/QW9LT1TRk1V7S2xYJADs=">
```
#### 7.2 Base64应用场景
用base64传输图片文件，可以节省一个http请求，但需在被base64编码的图片尺寸足够小（图片被编码后，生成的字符串编码大小一般比原文件稍大一些）
#### 7.3 CssSprites 与 Base64编码

使用CssSprites合并为一张大图：
- 页面具有多种风格，需要换肤功能，可使用CssSprites
- 网站已经趋于完美，不会再三天两头的改动（例如button大小、颜色等）
- 使用时无需重复图形内容
- 没有 Base64 编码成本，降低图片更新的维护难度。（但注意 Sprites 同时修改 css 和图片某些时候可能造成负担）
- 不会增加 CSS 文件体积

使用base64直接把图片编码成字符串写入CSS文件：
- 无额外请求
- 对于极小或者极简单图片
- 可像单独图片一样使用，比如背景图片重复使用等
- 没有跨域问题，无需考虑缓存、文件头或者cookies问题  
 
#### 7.4 Base64编码缺点
**(1) 使用 Base64 不代表性能优化**
使用 Base64 的好处是能够减少一个图片的 HTTP 请求，然而，与之同时付出的代价则是 CSS 文件体积的增大.
**(2) 页面解析 CSS 生成的 CSSOM 时间增加**
Base64 跟 CSS 混在一起，大大增加了浏览器需要解析CSS树的耗时。其实解析CSS树的过程是很快的，一般在几十微妙到几毫秒之间。

### 8.Uint8Array
Uint8Array 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0。创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。
