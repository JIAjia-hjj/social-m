var URL = require('url'); //获取url参数 依赖于url模块 使用前需要使用 require('url')
var express = require('express');
var router = express.Router();
var models = require('../db');//数据库链接信息
var mysql = require('mysql');
var $sql = require('../sqlfun');//sql语句

//链接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

// 保存修改的资料
router.post('/resiveProinfo',function(req, res){
    var sql = $sql.mypage.resiveproinfo;
    var params = req.body;
    conn.query(sql, [params.username,params.signature,params.tel], function(err, result){
        if(err){
             res.send({
            code:err.code
        })
            return;
        }
        res.send({
            code: '000',
            msg: '修改成功'
        })
        
    })
})
//获取信息
router.post('/getInfo',function(req, res){
    var sql = $sql.mypage.getinfo;
    var params = req.body;
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
})
module.exports = router;