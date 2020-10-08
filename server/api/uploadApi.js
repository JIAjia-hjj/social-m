
var URL = require('url'); //获取url参数 依赖于url模块 使用前需要使用 require('url')
var express = require('express');
var router = express.Router();
var models = require('../db');//数据库链接信息
var mysql = require('mysql');
var $sql = require('../sqlfun');//sql语句

var fs = require('fs');
var multer  = require('multer');

//链接数据库

var conn = mysql.createConnection(models.mysql);
conn.connect();


// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        cb(null, 'public/photoimgs/');    
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 时间戳 +随机数+ 文件原始名，比如 151342376785-123.jpg
        cb(null, Date.now() + Math.random().toString().substr(2,5) + file.originalname);  
        console.log(file)
    }
});

var storageContentImg = multer.diskStorage({
    destination: function (req, file, cb) {
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        cb(null, 'public/contentimgs/');    
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 时间戳 +随机数+ 文件原始名，比如 151342376785-123.jpg
        cb(null, Date.now() + Math.random().toString().substr(2,5) + file.originalname);  
        console.log(file)
    }
});


// 创建文件夹
var createFolder = function(folder){
    try{
        // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
        // 如果文件路径不存在将会抛出错误"no such file or directory"
        fs.accessSync(folder); 
    }catch(e){
        // 文件夹不存在，以同步的方式创建文件目录。
        fs.mkdirSync(folder);
    }  
};
//头像文件
var uploadFolder = './public/photoimgs/';
createFolder(uploadFolder);

//内容图片文件
var uploadContentImgFolder = './public/contentimgs/';
createFolder(uploadContentImgFolder);

// 创建 multer 对象
var upload = multer({ storage: storage });

var uploadContentImg = multer({ storage: storageContentImg });


/* POST upload listing. */
//获取上传的图片路径
router.post('/uploadPhoto', upload.single('file'), function(req, res, next) {
    var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    console.log(req.body)
    console.log(file)
    // 接收文件成功后返回数据给前端
    res.json({res_photourl: file.path});


});
// 重新上传的图片保存到数据库
router.post('/updatePhotoimgurl',function(req,res){
        var sql = $sql.mypage.updatephotoimgurl;
        var params=req.body;
        console.log(params)
        conn.query(sql, [params.photoimgurl,params.tel], function(err, result){
        if(err){
             res.send({
            code:err.code
        })
            return;
        }
        res.send({
            code: '000',
            result
        })
})
    });
//显示
router.post('/showPhotoimg',function(req,res){
        var sql = $sql.mypage.showphotoimg;
        var params=req.body;
        console.log(params)
        conn.query(sql, [params.tel], function(err, result){
        if(err){
             res.send({
            code:err.code
        })
            return;
        }
        res.send({
            code: '000',
            result
        })
})
    });

///////////////////////////////////////////////

//获取上传的图片路径
router.post('/uploadContentImg', uploadContentImg.single('file'), function(req, res, next) {
    var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    console.log(req.body)
    console.log(file)
    // 接收文件成功后返回数据给前端
    res.json({res_contentimgurl: file.path});


});
//保存到数据库
// index.post('/saveContentImgUrl',function(req,res){
//         var sql = $sql.mypage.savecontentimgurl;
//         var params=req.body;
//         console.log(params)
//         conn.query(sql, [params.tel], function(err, result){
//         if(err){
//              res.send({
//             code:err.code
//         })
//             return;
//         }
//         res.send({
//             code: '000',
//             result
//         })
// })
//     });


//显示
router.post('/showContentImg',function(req,res){
        var sql = $sql.mypage.showcontentimg;
        var params=req.body;
        console.log(params)
        conn.query(sql, [params.tel], function(err, result){
        if(err){
             res.send({
            code:err.code
        })
            return;
        }
        res.send({
            code: '000',
            result
        })
})
    });



// 导出模块（在 app.js 中引入）
module.exports = router;
