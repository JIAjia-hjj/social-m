# app

### 技术栈

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

| 序号 | 中文名称   | 字段名           | 类型    | 长度 | 是否为空 | 主关键字 | 备注 |
| ---- | ---------- | ---------------- | ------- | ---- | -------- | -------- | ---- |
| 1    | 电话号码   | tel              | char    | 11   | N        | Y        | 主键 |
| 2    | 昵称       | username         | varchar | 10   | N        | N        |      |
| 3    | 密码       | password         | varchar | 16   | N        | N        |      |
| 4    | 个性签名   | signature        | varchar | 50   | Y        | N        |      |
| 5    | 头像       | photoimgurl      | varchar | 200  | Y        | N        |      |
| 6    | 感兴趣标签 | interestedlabels | varchar | 20   | N        | N        |      |

+ 内容信息表（contents）

| 序号 | 中文名称       | 字段名         | 类型    | 长度 | 是否为空 | 主关键字 | 备注 |
| ---- | -------------- | -------------- | ------- | ---- | -------- | -------- | ---- |
| 1    | 内容id         | id             | int     | 11   | N        | Y        | 主键 |
| 2    | 电话号码       | tel            | char    | 11   | N        | N        | 外键 |
| 3    | 日期           | date           | date    | -    | N        | N        |      |
| 4    | 时间           | time           | time    | -    | N        | N        |      |
| 5    | 星期           | week           | varchar | 2    | N        | N        |      |
| 6    | 是否添加至社区 | isaddcommunity | varchar | 2    | N        | N        |      |
| 7    | 赞的个数       | seenumber      | Int     | 11   | N        | N        |      |
| 8    | 访客数         | seenumber      | int     | 11   | N        | N        |      |
| 9    | 内容           | content        | varchar | 800  | N        | N        |      |
| 10   | 内容图片       | contentimgurls | varchar | 800  | Y        | N        |      |
| 11   | 内容的标签     | contentlabel   | varchar | 20   | Y        | N        |      |

+ 点赞信息表（zans）

| 序号 | 中文名称           | 字段名 | 类型 | 长度 | 是否为空 | 主关键字 | 备注 |
| ---- | ------------------ | ------ | ---- | ---- | -------- | -------- | ---- |
| 1    | 内容id             | id     | int  | 11   | N        | N        |      |
| 2    | 赞该内容用户的电话 | tel    | char | 11   | N        | N        | 外键 |

+ 评论表（comments）

| 序号 | 中文名称 | 字段名    | 类型    | 长度 | 是否为空 | 主关键字 | 备注 |
| ---- | -------- | --------- | ------- | ---- | -------- | -------- | ---- |
| 1    | 评论id   | id        | int     | 11   | N        | Y        | 主键 |
| 2    | 内容id   | contentid | int     | 11   | N        | N        | 外键 |
| 3    | 电话号码 | tel       | char    | 11   | N        | N        | 外键 |
| 4    | 日期     | date      | date    | -    | N        | N        |      |
| 5    | 时间     | time      | time    | -    | N        | N        |      |
| 6    | 评论     | content   | varchar | 800  | N        | N        |      |

+ 回复表（replaycomments）

| 序号 | 中文名称 | 字段名        | 类型    | 长度 | 是否为空 | 主关键字 | 备注 |
| ---- | -------- | ------------- | ------- | ---- | -------- | -------- | ---- |
| 1    | 回复id   | id            | int     | 11   | N        | Y        | 主键 |
| 2    | 评论id   | contentid     | int     | 11   | N        | N        | 外键 |
| 3    | 电话号码 | tel           | char    | 11   | N        | N        | 外键 |
| 4    | 日期     | date          | date    | -    | N        | N        |      |
| 5    | 时间     | time          | time    | -    | N        | N        |      |
| 6    | 回复     | replaycomment | varchar | 800  | N        | N        |      |