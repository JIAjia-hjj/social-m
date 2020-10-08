// node 后端服务器

const fs = require('fs');

//引入了 path模块，返回应用程序的规范路径，即字符串。
const path = require('path');
//引入了 bodyParser模块，对post请求的请求体进行解析
const bodyParser = require('body-parser');
///引入了 express 模块
const express = require('express');
// 创建一个Express应用程序
const app = express();
 // ，可分别对以JSON格式的post参数和urlencoeded的post参数进行解析，均可获得一个JSON化的req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//dist文件设置为静态文件路径
app.use(express.static("../dist"));
//客户端发起请求，服务器端响应 ./dist/index.html的页面。
app.get('/',function(req, res) {
    res.sendfile("./index.html");
})
// 这里给出的是基于express框架的，图片放在项目根目录下的public/images,为了省事，直接写在app.js里面,不要写在路由那边，不然路径一改就要去手动改动。
app.get('/public/photoimgs/*', function (req, res) {
    res.sendFile( __dirname + "/" + req.url );
    // console.log("Request for " + req.url + " received.");
})
app.get('/public/contentimgs/*', function (req, res) {
    res.sendFile( __dirname + "/" + req.url );
    // console.log("Request for " + req.url + " received.");
})
// 后端api路由
app.use('/api/user', userApi);

// 监听端口
app.listen(3001,function(){
	console.log("running in http://127.0.0.1:3001")
})
