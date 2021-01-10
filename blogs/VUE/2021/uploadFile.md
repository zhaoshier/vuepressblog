---
title: vue中附件上传与回显
date: 2021-01-09
tags:
 - Vue
categories: 
 - Vue
---

### 1.文件上传与回显的步骤
:::tips
定义HTML
在data中初始化变量
定义upload本身自带函数
定义附件上传与回显函数
###### :::


### 2.定义HTML
```html
<el-upload
    class="upload-demo"
    :action="filePath"   //必需，上传地址
    :on-preview="handlePreview" //点击文件列表中已上传的文件时的钩子
    :on-remove="handleRemove" //文件列表移除文件时的钩子
    :before-remove="beforeRemove" //删除文件之前的钩子，参数为上传的文件和文件列表
    multiple 
    :limit="3"
    :on-exceed="handleExceed" //文件超出个数限制时的钩子
    :on-change="handleChange" //文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    :file-list="fileList" //上传的文件列表
    v-model="editForm.attachments" //双向绑定
>
    <el-button size="small" type="primary" v-if="uploadButtonShow"
    >点击上传</el-button>
</el-upload>
```
### 3.在data中初始化数据
```js
data(){
    fileList:[],
    fj:[],
    filePath:"",
    configID:"",
    editForm: {
        attachments: "",
      },
      downloads: "bond/attach/",
      fjid: "",
      strs:"",
}
```
### 4.在methods中定义附件的上传与回显
#### 4.1 附件上传
```js
//文件上传
// 编辑时，初始化附件， 获取文件的动态上传路径 
if(status == "ACCEPT"){
    this.$http
            .post(
              "/bond/guaranteeLetter/handle/initAttachment",//初始化附件接口
              {
                params: { applyId },
              },
              { emulateJSON: false }
            )
            .then(({ body: { code, data, message } }) => {
              if (code === 200) {
                var str = data;
                //定义附件上传的路径,上传路径是动态拼接的
                var obj = new Function("return " + str)();
                this.configID = obj.types[0].configId;
                this.filePath= "bond/attach/upload?configId=" + this.configID
} else {
                this.$message({
                  type: "error",
                  message: message,
                });
              }
            });

```

#### 4.2 附件回显
```js
//初始化页面，从后端获取附件信息
this.$http
            .get(
              "/bond/guaranteeLetter/handle/viewInfo",
              {
                params: { applyId },
              },
              { emulateJSON: false }
            )
            .then(({ body: { code, data, message } }) => {
                if (code === 200) {
                  if (data.length > 0) {
                  //定义附件回显列表，并赋请求到的值
                    this.fj = data[0].attachments.uploadeds;
                    for (var i = 0; i < this.fj.length; i++) {
                      this.fileList.push({
                        name: this.fj[i].originalName,
                        attachId: this.fj[i].attachId,
                        url: this.fj[i].downloadUrl,
                      });
                    }
                  }
                } else {
                  this.$message({
                    type: "error",
                    message: message,
                  });
                }
              },
              (res) => {
                let resStr = res.data.message.replace(
                  "SESSION失效或用户未登录",
                  "未登录或会话超时"
                );
                this.$message({
                  type: "error",
                  message: resStr,
                });
                if (resStr == "未登录或会话超时") {
                  this.$router.push("../login");
                }
              }
            );
```

### 5.在methods中定义upload自带函数
```js
// 预览上传的文件
//file参数为点击的那个文件
handlePreview(file) {
      window.open(
        this.downloads + "download?attachId=" + file.attachId,
        "_blank"
      );
},

handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    
    beforeRemove(file, fileList) {
      // 移除上传的文件
      return this.$confirm(`确定移除 ${file.name}？`);
    },
```

```js
handleRemove(file, fileList) {
      // 删除上传的文件
      var p = file.response.downloadUrl;
      for (var i = 0; i < 10; i++) {
        p = p.replace("/", "_");
      }
      this.$http
        .post(
          this.filePath + "deleteFile",
          {
            configId: file.response.configId,
            attachId: file.response.attachId,
          },
          { emulateJSON: false }
        )
        .then(
          function (res) {
            var msg = 0;
            if (res.data.success) {
              msg = 0;
              this.$message({
                type: "success",
                message: "删除成功",
              });
            } else {
              msg = 1;
              this.$message({
                type: "error",
                message: "删除失败",
              });
            }
          },
          function (res) {
            var resStr = res.data.message.replace(
              "SESSION失效或用户未登录",
              "未登录或会话超时"
            );
            this.$message({
              type: "error",
              message: resStr,
            });
            if (resStr == "未登录或会话超时") {
              this.$router.push("../login");
            }
          }
        );
    },
```

```js
//更改上传附件
    handleChange(file, fileList) {
      if (file.response) {
      //若新上传了一个file，获取它的attachId，将其拼接到strs中，用于附件回显
        var fileConfig = file.response.attachId
        this.fjid += fileConfig + ",";
        this.fjid.substring(0, this.fjid.length - 1);

        this.strs = this.fjid.substring(0, this.fjid.length - 1);
      }
      //自动获取该函数的fileList，并赋值
      this.fileList = fileList; //.slice(-3);
    },
```