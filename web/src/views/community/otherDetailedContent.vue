<template>
  <div>
    <div class="body" >
      <!-- 个人信息 -->
      <div class="personinfo">
        <img class="photoimg" :src="photoimgurl" alt="头像">
        <div class="username">{{username}}</div>
        <div class="signature">{{signature}}</div>
      </div>

      <!-- 内容信息 -->
      <div class="info">
        <div class="timeinfo">
          <span>{{date}}</span>
          <span>{{time}}</span>
          <span>周{{week}}</span>
        </div>
        <div class="visitinfo">
         <!-- 看 -->
         <span class="iconfont">&#xe61f; {{seenumber}}</span> 
         <!-- 赞 -->
         <span class="iconfont" >&#xe633; {{zannumber}}</span>
       </div>
      </div>
      <!-- 内容 -->
      <div  class="content" >{{content}}</div>
      <!-- 内容图片 -->
      <show-contentimg :id="id"></show-contentimg>

      <!-- 评论 -->
      <div class="commentblock" >
        <ul v-for="(item,index) in comments">
         <li>
          <img class="photoimg" :src="'public/photoimgs/'+item.photoimgurl" alt="头像">
          <div class="username">{{item.username}}：</div>
          <div class="time">{{item.date}} {{item.time}}</div> 
          <div class="comment">
            {{item.comment}}
          </div>
          <div class="delandreply"><span  v-show="isDel" @click="delComment(index)">删除</span><span @click.prevent="showCommentReplayBox(index)">回复</span></div>
        </li>

        <!-- 回复评论 -->
        <ul class="replayblock" :index="index"  v-for="(replayitem,replayindex) in replayComments[index]">
          <li>
            <img class="replayphotoimg" :src="'public/photoimgs/'+replayitem.photoimgurl" alt="">
            <div class="replayusername">{{replayitem.username}} <span>回复</span> {{replayitem.replayusername}}：</div>
            <div class="replaytime">{{replayitem.date}} {{replayitem.time}}</div> 
            <div class="replaycomment">{{replayitem.replaycomment}}</div>
            <div class="replaydelandreply"><span  v-show="isDel" @click="delComment(index)">删除</span><span @click.prevent="showCommentReplayBox(index,replayindex)">回复</span></div>
          </li>
        </ul>

      </ul>       
    </div>

</div>
<div class="footer fixed">
  <!-- 返回 -->
  <span @click="back" class="iconfont back">&#xe602;</span>
  <!-- <span ></span> -->
  <!-- 点赞  -->
  <!-- 点赞前 -->
  <!-- <span class="iconfont zan" @click="updateZan">&#xe613;</span> -->
  <!-- 点赞后 -->
  <!-- <span class="iconfont zan" v-show="isZan"> &#xe612;</span> -->
  <span class="iconfont zan" @click="handleZan"></span>
  <!-- 评论 -->
  <span class="iconfont comment" @click="showCommentBox">&#xe628;</span>
</div>
<div class="writecomment" v-show="isComment">
  <span class="iconfont cancle" @click="cancleComment">&#xe639;</span>
 <textarea type="text" name="comment" autofocus :placeholder="placeholder" rows=1   onpropertychange="this.style.height = this.scrollHeight + 'px';" oninput="this.style.height = this.scrollHeight + 'px';" v-model="writeComment"> </textarea>
 <button  @click="sendComment">发送</button>
</div>
  

</div>  
</template>
<script>
import ShowContentimg from '../../components/showContentimg.vue';
import {getTime,showTime} from '../../assets/js/public.js';
// import {getTime} from '../../assets/js/public.js'

function handleElement(ele){
  var ele=document.getElementsByClassName(ele)[0]
  return ele
}
	export default{
	  name:"otherDetailedContet",
      components:{
      ShowContentimg,
      },
      data(){
        return{
          id:this.$route.query.id,
          username:'',
          content:'',
          signature:'',
          tel:'',
          photoimgurl:'',
          date:'',
          time:'',
          week:'',
          seenumber:'',
          zannumber:0,
          isComment:false,
          writeComment:'',
          comments:[],
          photoimgurls:[],
          replayComments:[],
          replayPhotoimgurls:[],
          replayusername:'',
          commentid:'',
          isDel:false,
          placeholder:'',
        }
      },
      methods:{
         showOtherDetailContent(){
            //页面详细内容的显示
            this.$http.post('/api/community/showOtherDetail',{'id':this.id}).then((res)=>{
              let result=res.body['result'][0]
              this.username=result['username']
              this.content=result['content']
              this.signature=result['signature']
              this.date=result['date'] 
              this.time=result['time'] 
              this.week=result['week'] 
              this.seenumber=result['seenumber']
              this.zannumber=result['zannumber']
              this.tel=result['tel']
              this.photoimgurl='public/photoimgs/'+result['photoimgurl']
               
           },(res)=>{
             alert(res.status)
           })
         
        },
        back(){
          if(this.$route.query.routerName=='emotionContent'){
             this.$router.push({path:'/emotionContent',query:{contentLabel:this.$route.query.contentLabel}})
          }else if(this.$route.query.routerName=='otherContents') {
             this.$router.push({path:'/otherContents'})
          }

          
        },
        showZan(){
          let url='/api/community/showZan'
          let date={'contentid':this.id,'tel':this.$store.state.tel}
             this.$http.post(url,date).then((res)=>{
                if(res.body['code']=='500'){
                  alert('ER_OPERAND_COLUMNS')
                }else if(res.body['code']=='501'){
                  // 但是，页面上不能显示字体图片了，而是直接显示字体编码,原因是字体编码后面四位是Unicode编码，想使用字符串来传递的话,只要将 "&#xe655;" 改为 “\ue655” 即可。
                  //未赞
                  handleElement("zan").textContent="\ue613"
                }else if (res.body['code']=='000') {
                  //赞了
                  handleElement("zan").textContent="\ue612"
                }
           },(res)=>{
             alert(res.status)
           })
        },
        //操作赞
        handleZan(){
          if ( handleElement("zan").textContent=="\ue613") {
            //添加赞
           this.$http.post('/api/community/addZan',{'contentid':this.id,'tel':this.$store.state.tel})
           handleElement("zan").textContent="\ue612"
           this.zannumber=this.zannumber+1
          }else if(handleElement("zan").textContent=="\ue612"){
            //取消赞
           this.$http.post('/api/community/cancelZan',{'contentid':this.id,'tel':this.$store.state.tel})
           handleElement("zan").textContent="\ue613"
            this.zannumber=this.zannumber-1
          }
          this. updateZanNumber()
        },
        //更新赞数
        updateZanNumber(){
          this.$http.post('/api/community/updateZanNumber',{'id':this.id,'zannumber':this.zannumber})
        },
        //评论框的出现
        showCommentBox(){
          this.isComment=true 
          this.placeholder="评论"
        },        
        //取消评论框 
        cancleComment(){
          this.isComment=false
        },
        //回复评论框的出现
        showCommentReplayBox(index,replayindex){
          this.isComment=true
          if (replayindex==null) {
            this.replayUsername=this.comments[index]['username']
          }else {
            this.replayUsername=this.replayComments[index][replayindex]['username']    
          }
          this.commentid=this.comments[index]['id']
          this.placeholder="回复"+ this.replayUsername
        },
        //显示评论
        showComment(){
            // 评论的显示
            this.$http.post('/api/community/commentShow',{'contentid':this.id}).then((res)=>{
                 this.comments=res.body['result'] 
                //如果登的号和显示内容的账号相同，显示评论的删除 
              if(this.tel==this.$store.state.tel){
              this.isDel=true
             }
             //处理回复
              this.replayComments=[]
             for (var i = 0; i < this.comments.length; i++) {                            
              this.showReplayComment(i)              
             }
           },(res)=>{
             alert(res.status)
           })
        },
      //显示回复评论
       showReplayComment(index){
            this.$http.post('/api/community/replayCommtentShow',{'commentid':this.comments[index]['id']}).then((res)=>{
                  //如果登的号和显示内容的账号相同，显示评论的删除 
                  if(this.tel==this.$store.state.tel){
                  this.isDel=true
                        }
                  this.replayComments.push(res.body['result'])
                 },(res)=>{
                    alert(res.status)
             })
       },
        //发送评论
        sendComment(){    
          if (this.writeComment=="") {
            alert("请输入"+this.placeholder+"内容")
            return
          } 
             let nowTime=getTime()
             let url=""
             let data={}
             if ( this.placeholder=="评论") {
              url='/api/community/saveComment'
              data={'contentid':this.id,'tel':this.$store.state.tel,'date':nowTime['date'],'time':nowTime['time'],'comment':this.writeComment}
              this.$http.post(url,data).then((res)=>{
                if(res.body['code']==500){
                  alert(res.body['err'])
                }else {
                  alert("评论成功")
                  
                  this.showComment()
                  this.writeComment=""
                  this.isComment=false
                }
              },(res)=>{
                alert(res.status)
              })
            }else {
              url='/api/community/saveReplayComment'
              data={'commentid':this.commentid,'tel':this.$store.state.tel,'date':nowTime['date'],'time':nowTime['time'],'replaycomment':this.writeComment,'replayusername':this.replayUsername}
              this.$http.post(url,data).then((res)=>{
                if(res.body['code']==500){
                  alert(res.body['err']['code'])
                }else {
                  alert("回复成功")
                  this.showComment()                
                this.writeComment=""
                this.isComment=false
                }
              },(res)=>{
                alert(res.status)
              })
            }
        }, 
        // 删除评论
        delComment(index){
 
           this.$http.post('/api/community/delComment',{'id':this.comments[index]['id']}).then((res)=>{
            if (res.body['code']=="500") {
              console.log(res.body['err']['code'])
            }else {
              alert("删除成功")
              this.showComment()
            }
                

              },(res)=>{
               alert(res.status)
             })
        },
        // 回复评论
    },//methods end
    created(){
         this.showOtherDetailContent()
         this.showComment()
         // this.getContentImgUrls()
         this.showZan()

    },
    computed:{

    },
    directives: {


    },
    watch:{
        
        replayPhotoimgurls:{//深度监听，可监听到对象、数组的变化
            handler(val, oldVal){  
            },
            deep:true
        }
    }


	};
</script>
<style scoped>
  .body{
   top: 0;
   bottom: 40px; 
   background-color:#AED5EE;
  }
  .body .personinfo {
    height: 150px;
    position: relative;   
    background-color:#f1f1f1;
    color: #3597D4;
  }
  .body .personinfo .photoimg {
   display: block;
   height: 90px;
   width: 90px;
   border-radius: 50%;
   border: 1px solid #AED5EE;
   position: absolute;
   top: 15px;
   left: 50%;
   transform: translateX(-45px);
  }
  .body .personinfo .username {
    position: absolute;
   top: 110px;
   left: 50%;
   transform: translateX(-50%);
  }
.body .personinfo .signature{
   font-size: 13px;
   position: absolute;
   top: 130px;
   width: 100%;
}
  .body .info{
    height: 35px;
    line-height: 35px;
    border-bottom: 1px solid #3597D4;
    display: flex;
    font-size: 12px;
  }
  .body .info .timeinfo{
     padding-left: 10px;
     width: 160px;
     color: white;

  }
  .body .info .timeinfo span{
    float: left;
    padding-right: 9px; 
  }
  .body .info .visitinfo{
    padding-right: 10px;
    flex: 1;
  }
  .body .info .visitinfo span{
    float: right;
    font-size: 12px;
    padding-right: 8px;
    color: #3597D4;
  }
  .body .content{
   padding:20px;
   white-space: pre-wrap;
   word-wrap: break-word;
   color: white;
   text-align: left;
   text-indent: 2em;
   font-size: 16px;
   /* border-bottom: 1px solid grey; */
  }

  .body .commentblock{
    background-color: rgba(255,255,255, 0.1); 
  }
  .body .commentblock li{
   position: relative;
   margin-top: 5px;
   color:#3597D4; 
  }
  .body .commentblock .photoimg{
    display: block;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-left: 10px;

  }
  .body .commentblock .username{
    position: absolute;
    left:45px;
    top: 5px;
    font-size: 14px;

  }

  .body .commentblock .time{
     position: absolute;
     right:10px;
     top: 8px;
     font-size: 12px;
  }
  .body .commentblock .comment{
     background-color: rgba(255,255,255, 0.6); 
     margin:2px 45px ;
     text-align: left;
     padding: 2px 4px;
  }

  .body .commentblock .delandreply{
    text-align: right;
    font-size: 10px;
    margin-top: 2px;
    margin-right: 10px;
  }
  .body .commentblock .delandreply span{
    margin: 4px;
  }
  /* 回复评论 */
  .body .commentblock .replayblock li{
     /* border: 1px solid blue; */
     margin: 5px 27px;
  }
  .body .commentblock .replayblock .replayphotoimg{
    display: block;
    /* border: 1px solid red; */
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-left: 10px;
  }
  .body .commentblock .replayblock .replayusername{
    position: absolute;
    left:45px;
    top: 3px;
    font-size: 14px;
  }
  .body .commentblock .replayblock .replayusername span{
  font-weight: bolder;
  }
  .body .commentblock .replayblock .replaytime{
      position: absolute;
     right:0px;
     top: 8px;
     font-size: 12px;
  }
  .body .commentblock .replayblock .replaycomment{
     background-color: rgba(255,255,255, 0.6); 
     margin:0 21px 0 45px;
     padding: 4px;
     text-align: left;
  }
  .body .commentblock .replayblock .replaydelandreply{
    text-align: right;
    font-size: 10px;
    margin-top: 2px;
    margin-right: 10px;
  }
  .body .commentblock .replayblock .replaydelandreply span{
    margin: 4px;
  }


  .footer{
    height: 40px;
    background-color: #f1f1f1;
    color: #3597D4;
  }
  .footer .back{
    position: absolute;
    bottom: 5px;
    left: 5%;
    color: #3597D4;
  }
  .footer .zan{
    position: absolute;
    bottom: 5px;
    right: 20%;
    /* color: #3597D4; */
  }
  .footer .comment{
    position: absolute;
    bottom: 5px;
    right: 5%;
  }
  .writecomment{
    position: absolute;
    bottom: 0;
    left: 0;
    right:0;
    z-index: 2;
    background-color:#f1f1f1;
  }
  .writecomment .cancle{
    /* display: inline-block; */
    position: absolute;
    top: -10px;
    right:0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    /* border: 1px solid red; */
    background-color:#f1f1f1;
    line-height: 24px;
    font-size: 19px;
    z-index: 111;
    color: #AED5EE;

  }
  .writecomment textarea{
    width:60%;
    line-height: 24px;
    overflow-y: hidden;
    margin: 20px 50px 20px 10px; 
    resize: none;
    font-size: 16px;
    word-wrap: break-word;
    white-space: pre-line;
    border: 1px soild #AED5EE;
    color:#3597D4;
  }
  .writecomment button{
    width: 60px;
    height: 24px;
    line-height: 24px;
    font-size: 16px;
    position: absolute;
    right: 20px;
    bottom: 24px;
    color: white;
    background-color: #AED5EE;
  }

</style>