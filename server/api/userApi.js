var URL = require('url'); //获取url参数 依赖于url模块 
var express = require('express');
var router = express.Router();//后端路由模块
var mysql = require('mysql');//mysq数据库模块
var models = require('../db');//数据库链接信息
var $sql = require('../sqlfun');//sql语句映射文件
//链接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

// 登录用户接口
router.post('/login', function(req, res){
    var sql = $sql.user.login;
    var params = req.body;
    conn.query(sql, params.tel,function(err, result){
        if(err){
             res.send({
           err:err.code
        })
            return;
        }
        //result 数据库login的数据是个数组 在数据库中按tel找 有没有相关的记录  有看密码一样吗 没有出错
        if(result.length !=0){
        //有tel，看密码是否相同
             if(result[0].password == params.password){
                    res.send({
                        code: '000',
                    })
                }else{
                    res.send({
                        code: '500',
                    })
                }
        }else{
            res.send({
                code: '501',
            })
        }     
    })
})

//判断用户注册了么
router.post('/isRegister',function(req, res){
    var sql = $sql.user.login;
    var params = req.body;
    conn.query(sql, params.tel, function(err, result){
        if(err){
             res.send({
            code:err.code
        })
            return;
        }
        if (result.length!=0) {
            //用户存在
              res.send({
                code: '500',
            })
        }else {
            //用户不存在，发送验证码注册
            var confirmNum=""
            for (var i = 0; i < 4; i++) {
              var num=Math.floor(Math.random()*10).toString()
              confirmNum+=num
            }
             res.send({
                code: '000',
                confirmNum,
            })  
        }
        
    })
})
// 增加用户接口(注册)
router.post('/addUser',function(req, res){
    var sql = $sql.user.add;
    var params = req.body;
    conn.query(sql, [params.tel,params.username,params.password,params.interestedlabels], function(err, result){
        if(err){
             res.send({
            code:err.code
        })
            return;
        }
        res.send({
            code: '000',
            msg: '注册成功'
        })
        
    })
})

module.exports = router;