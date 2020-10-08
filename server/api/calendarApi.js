var URL = require('url'); //获取url参数 依赖于url模块 使用前需要使用 require('url')
var express = require('express');
var router = express.Router();
var models = require('../db');//数据库链接信息
var mysql = require('mysql');
var $sql = require('../sqlfun');//sql语句

//链接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();


router.post('/selectContents',function(req, res){
    var sql = $sql.calendar.selectcontents;
    var params = req.body;
    conn.query(sql, [params.tel,params.date], function(err, result){
        if(err){
             res.send({
            code:err.code
        })
            return;
        }
        if (result.length==0) {
            //没有找到内容
            res.send({
                code: '500',
            })
        }else {
          res.send({
            code: '000',
            result
        })  
      }

        
    })
})

module.exports = router;