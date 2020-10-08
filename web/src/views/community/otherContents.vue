<template>
  <div>
    <div class="header fixed">
        <community-header @handleDropIndex="showOtherContents" :navIndex="1"></community-header>
       
     </div>
    <div class="body" >
      <ul >
        <li v-for="(item,index) in otherContents" @click="showOtherDetailedContent(index)">
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
	import FooterNav from "../../components/footer.vue";
  import CommunityHeader from "../../components/communityHeader.vue";
  import {showTime} from '../../assets/js/public.js';
	export default{
	  name:"otherContents",
      components:{
      	FooterNav,
        CommunityHeader
      },
    data(){
      return{
       index:1,
       otherContents:[],
       photoimgurls:[],
      }
    },
    methods:{
      dropDown(){
        console.log(event.target.getAttribute('class'))
        if(event.target.getAttribute('class') === 'dropdownbtn') {
            this.dropdownActive = !this.dropdownActive;
        }
      },
      tabToggle: function(index){
              this.nowIndex = index;
              if(index === 1){
                  return
              }else {
                  this.dropdownActive = false;
              }
      },
      showOtherContents(index){
        let url=''
        let data={}
        if(index==0){
          //最新
          url='/api/community/newestOtherContents'
        }else if (index==1) {
          // 最热
          url='/api/community/hotestOtherContents'
        }else if (index==2) {
          //推荐 
          url='/api/community/recommend'
          data={'tel':this.$store.state.tel}
        }else{
          // 我的
          url='/api/community/myContents'
          data={'tel':this.$store.state.tel}
        }
        this.$http.post(url,data).then((res)=>{
          this.otherContents=res.body['result']
          for (var i = 0; i < this.otherContents.length; i++) {
            this.otherContents[i].time=showTime(this.otherContents[i].date,this.otherContents[i].time)
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
       this.$router.push({path:'/otherDetailedContent',query:{id:this.otherContents[index].id,routerName:'otherContents'}})
     },
    },
     created(){
        // this.showNewestOtherContents()
        this.showOtherContents(0)
      },
     computed:{
     },
	};
</script>
<style scoped>

  .header{
    z-index: 1;
  }

  .body{
    /* background-color: #AED5EE; */
    background-color: #3597D4;
   z-index: 0;
     /* background-color: #f1f1f1; */
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
  .navClass{
    background-color: white;
    color: #AED5EE;
  }
</style>