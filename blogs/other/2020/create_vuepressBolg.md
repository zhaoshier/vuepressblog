---
title: 博客的搭建与部署（vuepress, github, vercel）
date: 2020-10-15
subSidebar: true
tags:
 - other
categories:
 -  other
---

### 1.搭建项目并在本地运行                                  
基于vuepress搭建一个项目，具体操作见vuepress官网教程。

### 2.部署上线         
**方式一**：自己买一个服务器，阿里云，腾讯云等，这种方式的好处就是可靠、速度有保障，可以被搜索引擎收录。坏处就是要花钱啊。  

**方式二**：使用github pages。什么是github pages呢？它是github提供的、用于搭建个人网站的静态站点托管服务。这种方式的好处是免费、方便，坏处是速度可能有点慢，不能被国内搜索引擎收录。

下面主要介绍方式二。
打开github，**新建两个仓库**，一个仓库用来托管项目的打包好后的静态文件，显示网站内容；一个负责日常的开发的修改代码。

#### **新建仓库一：USERNAME.github.io(不用克隆到本地)**
注意：**USERNAME必须是你自己github账号的名称，而不是其他！！！**   
例如：我的github账号名称是zhaoshier，那么新建仓库的名称就为zhaoshier.github.io    
![github用户名](http://note.youdao.com/yws/public/resource/2a7f5948a1875f91a869a910a9a07230/xmlnote/A78A7C6BFC534EB887E37070940494AC/2554)   

![仓库一名称](http://note.youdao.com/yws/public/resource/2a7f5948a1875f91a869a910a9a07230/xmlnote/8A5B4E7D948A4E80AAB77BC0458B7BCF/2556)     
这个仓库建好后不用克隆到本地，内容的修改都在第二个仓库中进行。 
#### **新建仓库二：随便起一个名字，如vuepressBLog(克隆到本地)**
这个仓库是用来开发博客的，以后只需修改这个项目就行。    
通过git pull将仓库二的内容拷贝到本地vueperessBlog文件夹中。    
然后将新搭建的项目拷贝到本地的vuepressBlog文件中。并在根目录下创建deploy.sh文件，内容如下：
```js
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd public

# 如果是发布到自定义域名
# echo 'zhaoshier.top' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果你想要部署到 https://<USERNAME>.github.io
git push -f git@github.com:zhaoshier/zhaoshier.github.io.git master
# git push -f git@github.com:zhaoshier/zhaoshier.github.io.git

# 如果发布到 https://<USERNAME>.github.io/<REPO>  REPO=github上的项目
# git push -f git@github.com:zhaoshier/vuepress.git master:gh-pages

cd -

```
通过
```js
git push -f git@github.com:zhaoshier/zhaoshier.github.io.git master
```
仓库一和仓库二就建立了联系。
再在package.json文件中添加发布命令
```js
"scripts": {
  "deploy": "bash deploy.sh"
}
```
最后运行发布命令
```js
npm run deploy
```
再(git add .)-(git commit)-(git push)
打开github Settings下面的链接[https://zhaoshier.github.io](https://zhaoshier.github.io)即可看到自己的主页。
![githubPages的链接](http://note.youdao.com/yws/public/resource/2a7f5948a1875f91a869a910a9a07230/xmlnote/19E8C4B0248C45C0822A5939C2D7F518/2558)

![博客首页](http://note.youdao.com/yws/public/resource/2a7f5948a1875f91a869a910a9a07230/xmlnote/A70FC3FD583E4FB588A47EDA73DF3FBA/2560)

### 3.将博客发布到自己的个人域名上
若不满足于[https://zhaoshier.github.io](https://zhaoshier.github.io)这样的域名，想要一个专属域名，如[https://zhaoshier.top](https://zhaoshier.top)，可进行如下操作：

#### **(1)购买并解析域名**
我是在腾讯云上买的域名，下面以腾讯云为例：
购买成功后，进入我的域名页面，点击[解析]

![腾讯云页面](http://note.youdao.com/yws/public/resource/2a7f5948a1875f91a869a910a9a07230/xmlnote/D51209DCBBAE4BD8B95BD168B19AE996/2605)     

![域名解析](http://note.youdao.com/yws/public/resource/2a7f5948a1875f91a869a910a9a07230/xmlnote/D3025AE18BE6451B9DDFAE2ED73E519C/2657)

![域名解析](http://note.youdao.com/yws/public/resource/2a7f5948a1875f91a869a910a9a07230/xmlnote/43750456F87D44C780C3CB48D772E3B9/2646)


#### 方式一：点击[快速添加网址邮箱解析]按钮，具体如下：   
![快速解析](http://note.youdao.com/yws/public/resource/2a7f5948a1875f91a869a910a9a07230/xmlnote/656E6B1F020B4745991DD072B8989F5B/2649)

然后再点击“网站解析”右侧的[立即设置]按钮。  
![立即设置](http://note.youdao.com/yws/public/resource/2a7f5948a1875f91a869a910a9a07230/xmlnote/1F0E54B59F4E4A90B6E9C44E214A2D6B/2653) 

在填写想要将域名解析到目的主机的IP地址，填写完毕后点击[确定]按钮。   
![确定button](http://note.youdao.com/yws/public/resource/2a7f5948a1875f91a869a910a9a07230/xmlnote/232131D91F6B44F5B5ECE6E11D982C77/2655) 

就会自动添加@和www两条消息记录，说明已成功将该域名解析到相应的主机空间中。   

#### 方式二：直接点击[添加记录]按钮，然后填写相应信息点击[保存]按钮即可。    
![方式二解析](http://note.youdao.com/yws/public/resource/2a7f5948a1875f91a869a910a9a07230/xmlnote/556C8C69A5E8442D92F33387146818F1/2651) 

#### **(2)注册vercel，并与github绑定**
首先，注册vercel账号，并关联你自己的github账号

然后，在vercel中引入你的远程仓库一，让两个关联起来。
在vercel网站首页，点击[Import Project]     
![importProjects](http://note.youdao.com/yws/public/resource/2a7f5948a1875f91a869a910a9a07230/xmlnote/F489BF9BD75044A0A98F3B3841D2AD96/2660)

然后，点击import Git Repository的[continue]
![import Res](http://note.youdao.com/yws/public/resource/2a7f5948a1875f91a869a910a9a07230/xmlnote/D7F30A62BC5A4526AC3336FE5C3997D0/2663)

选择该仓库下的你想绑定的项目，点击[continue]按钮
![importProject](http://note.youdao.com/yws/public/resource/2a7f5948a1875f91a869a910a9a07230/xmlnote/2C71AB1A9DA94F73B39E036C61EF5E93/2667)

添加你自己的项目名称，点击[deploy]         
![deploy](http://note.youdao.com/yws/public/resource/2a7f5948a1875f91a869a910a9a07230/xmlnote/1F0D30E891CF45668D43AB05806B7EC7/2669)

现在就创建成功啦，点击vist就可以直接访问   

![sucessPage](http://note.youdao.com/yws/public/resource/2a7f5948a1875f91a869a910a9a07230/xmlnote/3A8DEE462D114E0E873A0A3197B55594/2671)

现在，你在本地的vuepressBlog文件夹下修改的内容，当你把内容push到仓库二上时，在这边会自动更新你所修改的内容。

#### **(3)绑定域名**

在vercel的控制面板里打开你的项目(此处我的是zzzzzsssseee) => Settings => Domains              
![vercel](https://gitee.com/zhaoshier/blogimage/raw/master/images/[vuepressBlog]-2.png)

在输入框中输入你在第二部所解析的域名(此处我的是zhaoshier.top),点击添加，就可成功绑定了。   

![last](https://gitee.com/zhaoshier/blogimage/raw/master/images/[vuepressBlog]-1.png)