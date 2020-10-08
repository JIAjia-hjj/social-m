//sql语句映射文件，以供api逻辑调用
var sqlMap = {
    user: {
        login: 'select * from users where tel = ?',
        add: 'insert into users (tel,username,password,photoimgurl,interestedlabels) values (?,?,?,"IMG_2774.JPG",?)',
    },
    content:{
    	save:'insert into contents (tel,date,time,week,isaddcommunity,zannumber,seenumber,content,contentimgurls,contentlabel) values (?,?,?,?,?,0,0,?,?,?)',
      updatesave:'update  contents set content=?,isaddcommunity=?,contentimgurls=?,contentlabel=? where id=?',
    	show:'select * from contents where tel=? order by  date desc, time desc',
      getcontentimgurls:'select contentimgurls from contents where id=?',
    	showdetail:'select * from contents where id=?',
      delete:'delete from contents  where tel=? and date=? and time=?',
      previous:'select * from contents where tel=? and id > ? order by id asc limit 1',
      latter:'select * from contents where tel=? and id< ? order by id desc limit 1',
      getisaddcommunity:'select * from contents where id=?',
      searchcontents:'select date,time,content,id from contents where tel=? and content like ? order by date desc,time desc',
      searchcommunitycontents:'select date,time,content,id from contents where isaddcommunity=1 and content like ? order by date desc,time desc'
      //内容图片
    },
    community:{
        //实时
        newestshow:'select * from contents left join users on contents.tel=users.tel where isaddcommunity=1 order by  date desc, time desc',
        //热门
        hotestshow:'select * from contents left join users on contents.tel=users.tel where isaddcommunity=1 order by  zannumber desc, date desc ,time desc',
        //推荐
        getmyintersetedlabels:'select interestedlabels from users where tel=?',
        recommend:'select * from contents left join users on contents.tel=users.tel where isaddcommunity=1 and contentlabel in (?) order by  date desc, time desc',

        myshow:'select * from contents left join users on contents.tel=users.tel  where isaddcommunity=1 and contents.tel=?  order by  date desc, time desc',

        
       showotherdetail:'select * from users left join  contents  on contents.tel= users.tel  where id=?',
       updateseenumber:'update contents set seenumber=? where id=?',
       //赞的操作
       showzan:'select * from zans where contentid=? and tel=?',
       addzan:'insert into zans  (contentid,tel) values (?,?) ',
       cancelzan:'delete from zans where contentid=? and tel=?',
       updatezannumber:'update contents set zannumber=? where id=?',
       // updatezan:'update contents set zan=?,zantel=? where id=?',
       savecomment:'insert into comments (contentid,tel,date,time,comment) values (?,?,?,?,?)', 
       savereplaycomment:'insert into replaycomments (commentid,tel,date,time,replaycomment,replayusername) values (?,?,?,?,?,?)',
       // findmyinfodetail: 'select * from users where tel = ?',
       commentshow:'select * from comments left join users on comments.tel= users.tel  where contentid=? order by  date asc, time asc',
       //回复评论的展示
       replaycomtentshow:'select replaycomments.id,replaycomments.commentid,replaycomment,replaycomments.tel,replaycomments.date,replaycomments.time,users.username,replayusername,users.photoimgurl from replaycomments left join comments on comments.id=replaycomments.commentid   left  join users on replaycomments.tel= users.tel where commentid=? order by  replaycomments.date asc, replaycomments.time asc ',
       delcomment:'delete from comments where id=?',
       showemotionconents:'select * from contents left join users on contents.tel=users.tel where isaddcommunity=1 and contents.contentlabel=? order by  date desc,time desc '
    },
    mypage:{
       resiveproinfo:'update users set username=?,signature=? where tel=?',
       getinfo:'select username,signature from users where tel=?',
       updatephotoimgurl:'update users set photoimgurl=? where tel=?',
       showphotoimg:'select photoimgurl from users where tel=?'
    },
    calendar:{
        selectcontents:'select content,id,date,time from contents where tel=? and date=? '
    }
}
module.exports = sqlMap


