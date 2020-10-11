# 概况

+ 是一个类似于树洞，让用户可以记录、分享自己的状态的一个webapp，但是主要目的是想要了解完整的一套开发流程是如何进行的，学习node模块化开发，项目基于Node.js+vue-cli3.0+MySQL。

+ **已经完成的：**实现了登录注册、内容编辑和发布、添加标签、图片上传、时间轴、评论、赞、日历、个人信息编辑等模块功能。

# 技术栈

**前端技术栈：** vue2 + vuex + vue-index + webpack + ES6/7 + less 

**服务端技术栈：** Node.js

**数据库：** MySQL

## 目录说明

**web：**前端开发

**server:** 服务端文件

**db：** 导出的数据库

# 运行

### 运行服务器

+ 进入server目录
+ 下载依赖文件：npm install
+ 运行： node  app.js

### 前端开发运行

+ 进入web前端开发目录

+ 下载依赖文件：npm install
+ 运行：npm run serve
+ 打包：npm run build

# 其他

### 数据库设计

+ 用户信息表（users）

+ 内容信息表（contents）

+ 点赞信息表（zans）

+ 评论表（comments）

+ 回复表（replaycomments）
