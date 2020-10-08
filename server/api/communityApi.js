var URL = require('url'); //获取url参数 依赖于url模块 使用前需要使用 require('url')
var express = require('express');
var router = express.Router();
var models = require('../db');//数据库链接信息
var mysql = require('mysql');
var $sql = require('../sqlfun');//sql语句
//链接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

 handleQueryResults=function(err, result){
       if(err){
            res.send({
            code:'500',
            err
        })
            return;
        }
         res.send({
           code:'000',
           result,
        }) 
}
//最新
router.post('/newestOtherContents', function(req, res){
    var sql = $sql.community.newestshow;
    // var params = req.body;
    // console.log(req.body);
       conn.query(sql, function(err, result){
         if(err){
            res.send({
            code:'500',
            err
        })
            return;
        }
         res.send({
           code:'000',
           result,
        })  
    })
})
//最热
router.post('/hotestOtherContents', function(req, res){
    var sql = $sql.community.hotestshow;
    conn.query(sql, function(err, result){
         if(err){
            res.send({
            code:'500',
            err
        })
            return;
        }
         res.send({
           code:'000',
           result,
        })  
    })
})
//推荐
router.post('/recommend', function(req, res){
    var recommendContents=[]
    var params=req.body;
    conn.query($sql.community.getmyintersetedlabels,[params.tel] ,function(err, result){
        if(err){
            res.send({
            code:'500',
            err
        })
            return;
        }
        // console.log("查询结果:",result)
        // console.info("查询sql",$sql.community.recommend);
        const labelArray = result[0]['interestedlabels'].split(',');
        // console.info("查询条件",labelArray.join(","));
        let queryItem = '';
        labelArray.forEach((item,idx)=>{
            queryItem += `'${item}'${idx+1!==labelArray.length?',':''}`;
        });
        // console.info("查询条件22",queryItem);
        conn.query($sql.community.recommend.replace('?',queryItem),'',function(err, result){ 
             if(err){
                res.send({
                    code:'500',
                    err
                })
                return;
             }
             // console.info("请求相应结果",result);
             const temp = {};
             //如果result长度不为零，说明有我感兴趣的
             if (result.length!=0) {
               res.send({
                  code:'000',
                  result                 
               }) 
                                 
             }     

          })
        //获取我感兴趣的标签
        // var label=result[0]['interestedlabels'].split(',')
        //循环我感兴趣的标签
        // for (var i = 0; i < label.length; i++) {
        //     //查找其他用户的内容标签是否是我感兴趣的
        //     conn.query($sql.community.recommend,label[i] ,function(err, result){ 
        //      if(err){
        //         res.send({
        //             code:'500',
        //             err
        //         })
        //         return;
        //      }
        //      //如果result长度不为零，说明有我感兴趣的
        //      if (result.length!=0) {

        //         for (var j = 0; j <result.length; j++) {
        //            recommendContents.push(result[j]) 
        //            console.log('1') 
        //            console.log(recommendContents)   //有数据
        //         } 
        //         // res.send({
        //         //      code:'000',
        //         //      result                 
        //         //  })
                                 
        //      }     
        //   })
        //     console.log('2') 
        //     console.log(recommendContents)     //空  
        // }  
        // console.log('3') 
        // console.log(recommendContents)   //空
        // res.send({
        //     code:'000',                 
        // })
    })
})
//我的
router.post('/myContents', function(req, res){
    var sql = $sql.community.myshow;
    var params=req.body;
    conn.query(sql,[params.tel] ,function(err, result){
         if(err){
            res.send({
            code:'500',
            err
        })
            return;
        }
         res.send({
           code:'000',
           result,
        })  
    })
})
//详细内容
router.post('/showOtherDetail', function(req, res){
    var sql = $sql.community.showotherdetail;
    var params = req.body;
    conn.query(sql, [params.id],function(err,result){
         if(err){
            res.send({
            code:'500',
            err
        })
            return;
        }
         res.send({
           code:'000',
           result,
        })  
    })
})
//更新访客数
router.post('/updateSeenumber', function(req, res){
    var sql = $sql.community.updateseenumber;
    var params = req.body;
    conn.query(sql, [params.seenumber,params.id],function(err,result){
         if(err){
            res.send({
            code:'500',
            err
        })
            return;
        }
         res.send({
           code:'000',
           result,
        })  
    })
})
//展示赞
router.post('/showZan', function(req, res){
    var sql = $sql.community.showzan;
    var params = req.body;
    conn.query(sql, [params.contentid,params.tel],function(err,result){
         if(err){
            res.send({
            code:'500',
            err
        })
            return;
        }
        if(result.length==0){
           res.send({
            code:'501',
         })  
        }else {
           res.send({
            code:'000',
         })   
        }

    })
})
//添加赞
router.post('/addZan', function(req, res){
    var sql = $sql.community.addzan;
    var params = req.body;
    conn.query(sql, [params.contentid,params.tel],function(err,result){
         if(err){
            res.send({
            code:'500',
            err
        })
            return;
        }
         res.send({
           code:'000',
        })  
    })
})
//取消赞
router.post('/cancelZan', function(req, res){
    var sql = $sql.community.cancelzan;
    var params = req.body;
    conn.query(sql, [params.contentid,params.tel],function(err,result){
         if(err){
            res.send({
            code:'500',
            err
        })
            return;
        }
         res.send({
           code:'000',
        })  
    })
})
//更新赞数
router.post('/updateZanNumber', function(req, res){
    var sql = $sql.community.updatezannumber;
    var params = req.body;
    conn.query(sql, [params.zannumber,params.id],function(err,result){
         if(err){
            res.send({
            code:'500',
            err
        })
            return;
        }
         res.send({
           code:'000',
        })  
    })
})
router.post('/updateZan', function(req, res){
    var sql = $sql.community.updatezan;
    var params = req.body;
    conn.query(sql, [params.zan,params.zantel,params.id],function(err,result){
         if(err){
            res.send({
            code:'500',
            err
        })
            return;
        }
         res.send({
           code:'000',
           result,
        })  
    })
})

//保存评论
router.post('/saveComment', function(req, res){
    var sql = $sql.community.savecomment;
    var params = req.body;
    conn.query(sql, [params.contentid,params.tel,params.date,params.time,params.comment],function(err,result){
         if(err){
            res.send({
            code:'500',
            err
        })
            return;
        }
         res.send({
           code:'000',

        })  
    })
})
//保存回复评论
router.post('/saveReplayComment', function(req, res){
    var sql = $sql.community. savereplaycomment;
    var params = req.body;
    conn.query(sql, [params.commentid,params.tel,params.date,params.time,params.replaycomment,params.replayusername],function(err,result){
         if(err){
            res.send({
            code:'500',
            err
        })
            return;
        }
         res.send({
           code:'000',

        })  
    })
})
//回复内容的显示
router.post('/commentShow', function(req, res){
    var sql = $sql.community.commentshow;
    var params = req.body;
    conn.query(sql, params.contentid,function(err,result){
         if(err){
            res.send({
            code:'500',
            err
        })
            return;
        }
        console.log(result);
         res.send({
           code:'000',
           result,
        })  
    })
})

//该篇内容评论的显示  
router.post('/replayCommtentShow', function(req, res){
    var sql = $sql.community.replaycomtentshow;
    var params = req.body;
    conn.query(sql,params.commentid,function(err,result){
         if(err){
            res.send({
            code:'500',
            err
        })
            return;
        }
        console.log(result);
         res.send({
           code:'000',
           result,
        })  
    })
})
//删除回复
router.post('/delComment', function(req, res){
    var sql = $sql.community.delcomment;
    var params = req.body;
    conn.query(sql, params.id,function(err,result){
         if(err){
            res.send({
            code:'500',
            err
        })
            return;
        }
         res.send({
           code:'000',
        })  
    })
})

router.post('/showEmotionConents', function(req, res){
    var sql = $sql.community.showemotionconents;
    var params = req.body;
    console.log('查询sql',sql)
    console.log('查询条件', [params.contentlabel])
    conn.query(sql, [params.contentlabel],function(err,result){
         console.log('查询结果',result)
         if(err){
            res.send({
            code:'500',
            err
        })
            return;
        }
         res.send({
           code:'000',
           result
        })  
    })
})
module.exports = router;