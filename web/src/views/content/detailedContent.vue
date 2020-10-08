<template>
  <div>
    <div class="header fixed">
      <div class="return" @click="back">
        <span class="iconfont">&#xe616;</span>
        <span>返回</span>
      </div> 
      <!-- 删 -->
      <span class="iconfont delete" @click="deleteContent">&#xe615;</span>
      <!-- 编辑  -->
      <router-link :to="{path:'/write',query:{id:id}}" class="edit">
         <span  class="iconfont" > &#xe611;</span>
      </router-link>   
      <h3>具体内容</h3> 
    </div>
    <div class="body" >
      <div class="datetime"> 
        <span class="date">{{date.replace(/-/g,'.')}}</span>
        <span class="time">{{time}}</span>
        <span class="week">周{{week}}</span>
        <span class="iconfont zan"> {{zannumber}} &#xe633;</span>
      </div>
      <!-- 内容 -->
      <div class="content">{{content}}</div>
      <!-- 内容图片 -->
      <show-contentimg :id="id"></show-contentimg>  
    </div>
    <div class="footer fixed">
      <!-- 上一篇 -->
      <span class="iconfont" @click="previousContent" >&#xe602;</span>
      <!-- 分享给好友 -->
      <span class="iconfont">&#xe62b;</span>
      <!-- 下一篇 -->
       <span class="iconfont" @click="latterContent">&#xe61d;</span>
      
    </div> 
  </div>

</template>
<script>
import ShowContentimg from '../../components/showContentimg.vue';
	export default{
	  name:"detailedContet",
      components:{
        ShowContentimg
      },
      data(){
        return{
          date:'',
          time:'',
          week:'',
          id:this.$route.query.id,
          content:'',
          zannumber:'',
          // contentimgurls:[],
        }
      },
      methods:{
        showContent(){
          let url='/api/content/showDetail'
          let data={'id':this.id}
          this.$http.post(url,data).then((res)=>{
            this.content=res.body['result'][0]['content']
            this.date=res.body['result'][0]['date']
            this.time=res.body['result'][0]['time']
            this.week=res.body['result'][0]['week']
            this.zannumber==res.body['result'][0]['zannumber']
            if(this.zannumber=='0'){
              this.zannumber=''
            }
          },(res)=>{
            alert(res.status)
          })
        },
        //删除内容
        deleteContent(){
          let url='/api/content/deleteContent'
          let data={'tel': this.$store.state.tel,'date':this.date,'time':this.time}
          this.$http.post(url,data).then((res)=>{
            if(res.body['code']=='000'){
              alert('删除成功')
              this.$router.push({path:'/index'})
            }
          },(res)=>{
            alert(res.status)
          })
        },
        previousContent(){
          let url='/api/content/previousContent'
          let data={'tel': this.$store.state.tel,'id':this.id}
          this.$http.post(url,data).then((res)=>{
            console.log(res.body)[图片]
            if(res.body['code']=='000'){
              let result=res.body['result'][0]
              console.log(result)
              if (result==undefined) {
                alert('已经是第一篇')
              }else {
              this.date=result['date']
              this.time=result['time']
              this.content=result['content']
              this.id=result['id']
              // this.getContentImgUrls()
              }
              
            }else if(res.body['code']=='500') {
               alert(res.body['err'])
            }
          },(res)=>{
            alert(res.status)
          })
        },
        latterContent(){
          let url='/api/content/latterContent'
          let data={'tel': this.$store.state.tel,'id':this.id}
          this.$http.post(url,data).then((res)=>{
            console.log(res.body)
            if(res.body['code']=='000'){
              let result=res.body['result'][0]
              console.log(result)
              if (result==undefined) {
                alert('已经是最后一篇')
              }else {
              this.date=result['date']
              this.time=result['time']
              this.content=result['content']
              this.id=result['id']
              }             
            }else if(res.body['code']=='500') {
               alert(res.body['err'])
            }
          },(res)=>{
            alert(res.status)
          })
         },
         back(){
          if (this.$route.query.routerName=='calendar') {
            this.$router.push({path:'/calendar'})
          }else if(this.$route.query.routerName=='index'){
            this.$router.push({path:'/index'})
          }else if (this.$route.query.routerName=='search') {
            this.$router.push({path:'/search'})    
          }
         },
      },
      computed:{

      },
      created(){
       this.showContent()
     },

	};
</script>
<style scoped>
.header{
  color: #3597D4;
}
.header a{
  color: #3597D4; 
}

.header .return{
  position: absolute;
  top: 15px;
  left: 3%;
  height: 30px;
  font-size: 14px;
}
.header .return span:nth-child(2) {
 display: inline-block;
 height: 100%;
 vertical-align: middle;
}
.header .delete{
 position: absolute;
 top:13px; 
 right: 20%;
}
.header .edit{
  position: absolute;
  top: 15px;
  right: 5%;

} 
.edit .iconfont,.return .iconfont{
 font-size: 22px;
}
.body{
    background-color:#AED5EE;
   padding: 3px;
   color: white;
}
.body .datetime{
  border-bottom: 1px solid #3597D4;
  text-align: left;

  padding: 10px 3px;
}
.body .datetime .date{
  font-size: 16px;
  padding:3px;
}
.body .datetime .time,.week{
 font-size: 12px;
 padding:3px;
}
.body .datetime .zan{
  float: right;
 font-size: 16px;
 padding:3px 12px;
}
.body .content{
   white-space: pre-wrap;
   font-size: 16px;
   text-align: left;
   text-indent: 2em;
   word-wrap: break-word;
   letter-spacing: 2px;
   margin-top: 10px;

}
.footer span{
   position: absolute;
   color: #3597D4;
}
.footer span:nth-child(1){
  left: 20%;
  bottom: 10px;
}
.footer span:nth-child(2){
  right: 45%;
  bottom: 10px;
}
.footer span:nth-child(3){
  right: 20%;
  bottom: 10px;
}
.footer{

  background-color: #f1f1f1;
  
}
</style>