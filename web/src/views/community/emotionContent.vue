<template>
  <div>
    <div  class="header fixed">
      <div @click="back" class="return">
        <span class="iconfont">&#xe616;</span>
        <span>返回</span> 
      </div>  
      <h3></h3>
    </div>
    <div class="body" @scroll="scrollEvent">
      <span class="label">{{contentLabel}} </span>
      <div class="tip">此刻的你想说点什么？</div>
      
      <!-- <img src="../../assets/images/emotionbg.png" class="bg"> -->
      <img src="../../assets/images/1.png" alt="" class="bg21">
      <img src="../../assets/images/2.png" alt="" class="bg22" >
      <img src="../../assets/images/3.png" alt="" class="bg23">
      <ul>
        <li  v-for="(item,index) in  otherContents" @click="showOtherDetailedContent(index)">
          <div class="user" >
            <img class="photoimg"  :src="'public/photoimgs/'+item.photoimgurl" alt="头像">
            <span class="username">{{item.username}}</span>
          </div> 
          <div class="content" ><div>{{item.content}}</div></div> 
          <div class="timezan"> 
             <span class="time">{{item.time}}</span>
             <span class="iconfont zan"> {{item.zannumber}} &#xe633;</span>
          </div>
        </li>
      </ul>
    </div>
    <footer-nav></footer-nav>
  </div>

</template>
<script>
  console.log(document.getElementsByClassName("body")[0].scrollTop)
	import FooterNav from "../../components/footer.vue";
  // import CommunityHeader from "../../components/communityHeader.vue";
	export default{
	  name:"index",
      components:{
      	FooterNav,
      },
    data(){
      return{
        contentLabel:this.$route.query.contentLabel,
        contents:[],
        otherContents:[],
        timeId1:'',
        timeId2:'',
        scrollBodyHeight:'',
      }
    },
    watch:{
   
    },
    methods:{
      back(){
        clearInterval(this.timeId1)
        clearInterval(this.timeId2)
        this.$router.push({path:'/community'})
      },
      showEmotionConents(){
          let url='/api/community/showEmotionConents'
          console.log(this.contentLabel)
          let data={'contentlabel':this.contentLabel}
          this.$http.post(url,data).then((res)=>{
          if(res.status==200){
            if(res.body['code']=='500'){
              alert('服务器出错')
            }else {
              this. otherContents=res.body['result']
            }
          }
        },(res)=>{
          alert(res.status)
        })
      },
      showOtherDetailedContent(index){
       let url='/api/community/updateSeenumber'
       let seenumber=this.otherContents[index].seenumber+1
       let data={'id':this.otherContents[index].id,'seenumber':seenumber}
       this.$http.post(url,data)
       this.$router.push({path:'/otherDetailedContent',query:{id:this.otherContents[index].id,routerName:'emotionContent',contentLabel:this.contentLabel}})
      },
      scrollEvent(){
        this.scrollBodyHeight=document.getElementsByClassName("body")[0].scrollTop
        if (this.scrollBodyHeight>=100) {
          document.getElementsByTagName("h3")[0].innerText=this.contentLabel
        }else {
           document.getElementsByTagName("h3")[0].innerText=''
        }
      }
    },
     created(){
       this.showEmotionConents()
      // var images1=document.getElementsByClassName("bg1")[0] 
      // this.timeId1=setInterval(function(){
        
      //    // images1.style.left =11+Math.random()*4+'%'
      //    images1.style.left =11+Math.random()*4+'%'
      //    console.log(images1.style.left)
      //    images1.style.top= -3+Math.random()*6+'px'
      //    images1.style.transition = 'left 1s,top 1s'
       
      // },3000)
      // var images2=document.getElementsByClassName("bg2")[0]
      // this.timeId2=setInterval(function(){
        
      //    images2.style.left =11+Math.random()*4+'%'
      //    images2.style.top= 19+Math.random()*6+'px'
      //    images2.style.transition = 'left 1s,top 1s'
        
      // },2500)
      },
     computed:{
     },
	};
</script>
<style scoped>
.header .return{
  position: absolute;
  top: 12px;
  left: 3%;
  height: 30px;
}
.header .return span:nth-child(2) {
 display: inline-block;
 font-size: 14px;
 height: 100%;
 vertical-align: middle;
}
  .body{
    /* background-color: #AED5EE; */
    background-color: #3597D4;
   z-index: 0;
/*    background-image: url('../../assets/images/emotionbg.png');
   background-size: 100%;
   background-repeat: no-repeat; */
     /* background-color: #f1f1f1; */
  }
  .body .label{
    display: inline-block;
    color: white;
    height: 81px;
    line-height: 99px;
    font-size: 31px;
    letter-spacing: 9px;
    padding-left: 9px;

  }
  .body .tip{
    color: white;
    font-size: 12px;
    text-align: right;
  }
  .body .bg21{
    position: absolute;
    width: 74%;
   top: 0;
   left: 13%;
  }
  .body .bg22{
    position: absolute;
    width: 62%;
    top: 21px;
    left:19%;
  }
  .body .bg23{
    position: absolute;
    width:66%;
    top: 9px;
    left: 15%;
  }
  .body ul li{
    height: 160px;
    /* width: 90%; */
    background-color: rgba(255,255,255, 0.8); 
    border-radius: 4px;
    margin:10px;
    color: #3597D4;
    padding: 5px 0;
  }
  .body ul li .user{
   height: 40px;
   line-height: 40px;
   margin:0 20px;
  } 
  .body ul li .user .photoimg{
    height: 32px;
    width: 32px;
    border-radius: 50%;
    border: 1px solid #3597D4;
    margin-top: 2px;
    margin-right: 10px;
    float: left;
  }
  .body ul li .user .username{
    float: left;
  }
  .body ul li .content {
   height: 70px;
   white-space: pre-wrap;
    border: 1px solid #3597D4;
   margin:1px 20px; 
   padding:10px 20px ;  
   position: relative;
   overflow: hidden;
   word-wrap: break-word;
   /* word-break: break-all; */


  }
.body ul li .content div{    
    width: 90%;
    line-height: 25px;
    letter-spacing: 2px;
  /* 首先是溢出隐藏，不可或缺 */
    overflow: hidden;
    /* 弹性盒模型显示 */
    display: -webkit-box;
     /* 盒模型元素的排列方式 */
    -webkit-box-orient: vertical;
    /* 显示行数 */
    -webkit-line-clamp: 3;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%,-50%);
}
  .body ul li .timezan{
   height: 20px;
   position: relative;
  }
  .timezan .time{
  position: absolute;
  bottom: 3px;
  left: 20px; 
  font-size: 12px;
  }
  .timezan .zan{
  position: absolute;
  bottom: 3px;
  right: 20px; 
  font-size: 14px;
  }

</style>