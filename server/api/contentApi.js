var URL = require('url'); //获取url参数 依赖于url模块 使用前需要使用 require('url')
var express = require('express');
var router = express.Router();
var models = require('../db');//数据库链接信息
var mysql = require('mysql');
var $sql = require('../sqlfun');//sql语句
//链接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

// 保存写的内容接口
router.post('/save', function(req, res){
    var sql = $sql.content.save;
    var params = req.body;
    conn.query(sql,[params.tel,params.date,params.time,params.week,params.isaddcommunity,params.content,params.contentimgurls,params.contentlabel], function(err, result){
        if(err){
             res.send({
            code:'500',
            err
        })
            return;
        } 
        res.send({
            code: '000',
            msg: '发表成功'
        })
        
    })
})        

//保存修改的内容
router.post('/updateSave', function(req, res){
    var sql = $sql.content.updatesave;
    var params = req.body;
    console.log(params)
    conn.query(sql,[params.content,params.isaddcommunity,params.contentimgurls,params.contentlabel,params.id], function(err, result){
        if(err){
             res.send({
            code:'500',
        })
            return;
        } 
        res.send({
            code: '000',
            msg: '修改成功'
        })
        
        
    })
})

//获取isaddcommunity
router.post('/getIsAddCommunity', function(req, res){
    var sql = $sql.content.getisaddcommunity;
    var params = req.body;
    conn.query(sql,[params.id], function(err, result){
        if(err){
             res.send({
            code:'500',
        })
            return;
        } 
        res.send({
            code: '000',
            result
        })
        
        
    })
})
//时间轴
router.post('/show', function(req, res){
    var sql = $sql.content.show;
    var params = req.body;
    conn.query(sql,params.tel, function(err, result){
        if(err){
             res.send({
            code:'500'
        })
            return;
        }
         res.send({
            result
            
        })
        
        
    })
})
router.post('/getContentImgUrls', function(req, res){
    var sql = $sql.content.getcontentimgurls;
    var params = req.body;
    conn.query(sql,params.id, function(err, result){
        if(err){
             res.send({
            code:'500'
        })
            return;
        }
         res.send({
            result
            
        })
        
        
    })
})
//搜索内容
router.post('/searchContents', function(req, res){
    var sql = $sql.content.searchcontents;
    var params = req.body;
    const  queryKeys='%'+params.keys+'%'
    conn.query(sql,[params.tel, queryKeys], function(err, result){
        if(err){
             res.send({
            code:'500'
        })
            return;
        }
         res.send({
            result
            
        })
        
    })
})
//搜索内容--社区
router.post('/searchCommunityContents', function(req, res){
    var sql = $sql.content.searchcommunitycontents;
    var params = req.body;
    const  queryKeys='%'+params.keys+'%'
    // console.log(queryKeys)
    conn.query(sql, queryKeys, function(err, result){
        if(err){
             res.send({
            code:'500'
        })
            return;
        }
         res.send({
            result
            
        })
        
    })
})
//详细内容
router.post('/showDetail', function(req, res){
    var sql = $sql.content.showdetail;
    var params = req.body;
    conn.query(sql,[params.id], function(err, result){
         res.send({
            result           
        })       
    })
})

//删除内容
router.post('/deleteContent', function(req, res){
    var sql = $sql.content.delete;
    var params = req.body;
   //  console.log(req);
   // console.log(req.body);
    conn.query(sql,[params.tel,params.date,params.time], function(err, result){
         if(err){
             res.send({
            code:'500'
        })
            return;
        }
         res.send({

           code:'000'
          // result,
        })

        
    })
})
//上一篇
router.post('/previousContent', function(req, res){
    var sql = $sql.content.previous;
    var params = req.body;
    // console.log(req.body);
    conn.query(sql,[params.tel,params.id], function(err, result){
         if(err){
            res.send({
            code:'500',
            err
        })
            return;
        }
        // console.log(1111)
        // console.log(result)
         res.send({
           code:'000',
           result,
        })        
    })
})

//下一篇
router.post('/latterContent', function(req, res){
    var sql = $sql.content.latter;
    var params = req.body;
    // console.log(req.body);
    conn.query(sql,[params.tel,params.id], function(err, result){
         if(err){
             res.send({
            code:'500',
            err
        })
            return;
        }
        // console.log(1111)
        // console.log(result)
         res.send({
           code:'000',
           result,
        })  
    })
})
module.exports = router;