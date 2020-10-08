<template>
<div class="calendarmemo">
	<div class="header fixed">
     <div class="return" @click="back">
        <span class="iconfont">&#xe616;</span>
        <span>返回</span>
    </div>     
     <h3>搜索</h3>

	</div>
	<div class="body">
        <div class="search">
            <i class="iconfont">&#xe62e;</i>
            <input type="text" placeholder="输入关键字" v-model="keys">
        </div>
        <ul>
            <li v-for="item in contents" class="contentbox" @click="showDetailedContent(item.id)">
                <div class="datetime">
                    <span class="date">{{item.date}}</span>
                    <span class="time">{{item.time}}</span>
                </div>
                <div class="content">
                    {{item.content}}
                </div>
            </li>
        </ul>
        
    </div>
</div>   

</template>
<script>
import FooterNav from "../../components/footer.vue";
export default{
    name:"indexCalendar",
    data(){
        return{
            keys:'',
            contents:[],
        }
    },

    components:{
        FooterNav,
    },
    computed: {

    },
    watch:{
     keys:function(){
        
        if (this.keys.length>0) {
          if(this.$route.query.routerName=='index'){
            this.$http.post('/api/content/searchContents',{'tel':this.$store.state.tel,'keys':this.keys}).then((res)=>{
              this.contents=res.body['result']
            },(res)=>{
              alert(res.status)
            })   
          }else {
            this.$http.post('/api/content/searchCommunityContents',{'keys':this.keys}).then((res)=>{
              this.contents=res.body['result']
            },(res)=>{
              alert(res.status)
            })             
          }
                     
        }else {
            this.contents=[]
        }

      }
    },
    methods: {
      back(){
        if(this.$route.query.routerName=='index'){
         this.$router.push({path:'/index'})
       }else {
         this.$router.push({path:'/community'})
       }
     },
      searchContents(){
        this.$http.post('/api/searchContents',{'tel':this.$store.state.tel,'keys':this.keys}).then((res)=>{
          this.contents=res.body['result']
        },(res)=>{
          alert(res.status)
        })
      },
    showDetailedContent(id){ 
      this.$router.push({path:'/detailedContent',query:{id:id,routerName:'search',keys:this.keys}})
    },      
    },

};
</script>
<style scoped>
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
.body .search{
    position: relative;
    width: 100%;
    height: 50px;
    background-color:rgba(255,255,255,0.5);
}
.body .search i{
    position: absolute;
    top: 16px;
    left: 7%;
    z-index: 10;
    font-size: 18px;
}
.body .search input{
    position: absolute;
    top:10px;
    left: 5%;
    width: 90%;
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
    text-indent: 2em;
    color: #3597D4;
    outline: none;
}
input::-webkit-input-placeholder {
        /* placeholder颜色  */
/*        color: white;  */  
       /* placeholder字体大小  */
         font-size: 13px;
         line-height: 30px;
         text-indent: 2em;
}
.contentbox{
  background-color:rgba(255,255,255,0.5);
  float: left;
  margin: 1%;
  width: 98%;
  border-radius: 3px;
}
.datetime{
text-align: left;
width: 98%;
margin:1%;
border-bottom: 1px solid  #3597D4;
color: white;
}
.date{
  font-size: 14px;
  padding-right: 6px;
}
.time{
  font-size: 10px;
}
.content{
  margin: 2px 6px 1px 12px; 
  text-align: left;
  font-size: 14px;
  text-indent: 1em;
  /* 首先是溢出隐藏，不可或缺 */
  overflow: hidden;
  /* 弹性盒模型显示 */
  display: -webkit-box;
  /* 盒模型元素的排列方式 */
  -webkit-box-orient: vertical;
  /* 显示行数 */
  -webkit-line-clamp: 1;
  line-height: 22px;
  color:  #3597D4;
}
</style>