---
title: 如何在markdown中插入图片
date: 2020-10-15
tags:
 - other
categories:
 -  other
---

1.新建Markdown类型的笔记；   

2.使用工具栏按钮，插入有道云示例图片。    
   
![工具栏按钮1](https://gitee.com/zhaoshier/blogimage/raw/master/images/[markdownInsert]1.png) 


3.进行上两步操作后，出现
```js
![image](https://note.youdao.com/favicon.ico)  
```
该语法的语法结构为：
```js
![图片提示文字](图片链接)
```
4.在相同项目结构下，**新建同名普通笔记**，用于存储markdown所需的所有图片资源，便于管理。
![2](https://gitee.com/zhaoshier/blogimage/raw/master/images/[markdownInsert]2.png)


5.要想在有道云的markdown笔记中能访问该图片，需获取该图片的网络地址。有道云访问该地址时，是与账号无关的。所以，应**将该笔记分享，得到网络地址**。 
![3](https://gitee.com/zhaoshier/blogimage/raw/master/images/[markdownInsert]3.png)
![4](https://gitee.com/zhaoshier/blogimage/raw/master/images/[markdownInsert]4.png)

   

6.上一步，分享得到的是图片所在笔记的网址，而不是笔记中某一图片的网址。所以**在浏览器中打开该笔记，找到相应图片，右击，复制图片地址。**     
![5](https://gitee.com/zhaoshier/blogimage/raw/master/images/[markdownInsert]5.png)