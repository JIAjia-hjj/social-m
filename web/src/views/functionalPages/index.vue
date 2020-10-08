<template>
  <div class="index">
  	<index-header></index-header>
    <div class="body" @scroll="scrollEvent" > 
      <pull-to-refresh @on-pullup='onPullup'  @on-pulldown='onPulldown' class="page"  >
        <ul >
          <li v-for="(item,index) in seeContents" @click="showDetailedContent(index)" >
            <div class="left" >
              <span><b>{{item.date.slice(8,10)}} </b>&nbsp周{{item.week}}</span>
              <span>{{item.date.slice(0,7)}}</span>
            </div> 
            <div class="center">
              <span class="line"></span>
              <span class="node"></span>
            </div>
            
            <div class="right">
              <div class="content">
                <div class="contenttext">{{item.content}}</div>
                <div class="onecontentimg clearfix"  :class="{isContentImg:item.contentimgurls==''||item.contentimgurls==null}"><img  :src="item.contentimgurls!=''&&item.contentimgurls!=null?'public/contentimgs/'+item.contentimgurls.split(',',1):''" alt="照片" class="img" @load="handleImg(index)"></div>
              </div>
              <span class="time">{{item.time}}</span>
            </div>

            
          </li>
        </ul>
      </pull-to-refresh>
      <div class="tip">已加载全部数据</div>
      <!-- <time-axis ></time-axis> -->

    </div>   
    <footer-nav></footer-nav>
  </div>
</template>
<script>
	import FooterNav from "../../components/footer.vue";
	import IndexHeader from "../../components/indexHeader.vue";
  import PullToRefresh from '../../components/pull-to-refresh';
    import TimeAxis from '../../components/time-axis.vue';
    import Scroll from '../../components/pull-to-refresh/myScroll';
window.addEventListener('scroll',()=>{console.log(window.scrollY)})
	export default{
	  name:"index",
      components:{
      	FooterNav,
      	IndexHeader,
        PullToRefresh,
        // TimeAxis,
      },
      data(){
        return{
          // tel:this.$route.query.tel,
          contents:[],
          seeContents:[],
          pullupContents:[],
        }
      },
      methods:{
        onPullup(finshCallback) {
          console.log('onPullup')
          setTimeout(() => {
              console.log('finshCallback')
              if (this.pullupContents.length>=4) { 
                this.seeContents=this.seeContents.concat(this.pullupContents.splice(0,4))
               
              }else if (this.pullupContents.length<4&&this.pullupContents.length>0) {
                 this.seeContents=this.seeContents.concat(this.pullupContents) 
              }else {
                var tipDiv=document.getElementsByClassName("tip")[0]
                tipDiv.style.display  = 'block'
                
                var timeId=setTimeout(function(){
                   tipDiv.style.display  = 'none'
                }, 2000)
                clearTimeout(tipDiv)
              }
              finshCallback();//finish refreshing state
          }, 1000);
        },

            onPulldown(finshCallback) {
                console.log('onPulldown')
                setTimeout(() => {
                    console.log('finshCallback')
                    if (this.contents.length<7) {
                     this.seeContents=this.contents
                   }else {  
                     this.seeContents=this.contents.slice(0,7)  
                   }
                   this.seeContents=this.contents.slice(0,7)
                     console.log(this.seeContents)
                    finshCallback();//finish refreshing state
                }, 3000);
            },
            testClick(event) {
                window.alert('click ' + event.target.innerHTML)
            },


             showContents(){
                let url='/api/content/show'
                let data={'tel': this.$store.state.tel}
                this.$http.post(url,data).then((res)=>{
                if(res.status==200){
                  if(res.body['code']=='500'){
                    alert('服务器出错')
                  }else {
                    this.contents=res.body['result']
                    // console.log('contents前',this.contents)
                    if (this.contents.length<7) {
                     this.seeContents=this.contents
                   }else {  
                     this.seeContents=this.contents.slice(0,7)  
                     this.pullupContents=this.contents.slice(7)
                   }
                  }
                }
              },(res)=>{
                alert(res.status)
              })
             },
            showDetailedContent(index){ 
              this.$router.push({path:'/detailedContent',query:{id:this.contents[index].id,routerName:'index'}})
             },


             handleImg(index){
              var img = new Image();
              var imgEle= document.getElementsByClassName("img")[index]
              // console.log(imgEle)
              if(imgEle.src!=""){
                var contentimg='public/contentimgs/'+imgEle.src.split('/')[5]
                img.src=contentimg   
                // console.log(img.width,img.height)       
                if(img.width>img.height){
                  imgEle.style.height=75+"px"
                }else {
                  imgEle.style.width=75+"px"
                }
              }
             },
             scrollEvent(){
              console.log('111111111111')
             // 
             // console.log(document.getElementsByClassName("body")[0].scrollTop)
             },
             handleScroll(){
               console.log('111111111111')
               // console.log(document.getElementsByTagName("li")[2].offsetTop)
             }

     },
    created(){
       this.showContents()
       
      
      },
      mounted(){
        let _this = this
        window.addEventListener('scroll', _this.handleScroll, true)
      },
	};
</script>
<style scoped>
   
    .body ul{
      height: 100%;
    }
    .body li{
    display: flex;
    height: 90px;
    margin:10px 15px;
    white-space: pre-wrap;
    outline: pink;
   }
    .body li .left{
     width:17%;
     position: relative;
     color: rgba(255, 255, 255, 0.5);
    }
    .left span:nth-child(1){
      position: absolute;
      right:14%;
      top: 21px;
      font-size: 10px;
    }
    .left span:nth-child(1) b{
      font-size: 14px;
    }
    .left span:nth-child(2){
      position: absolute;
      right: 19%;
      top: 42px;
      font-size: 11px;
    }
  .body li .center{

    width:10px;
    position: relative;
    height: 100px;
    margin-top: -10px;
  }
  .center .line{    
    display: inline-block;
    width: 1px;
    height: 100px;
    background-color:white;
    z-index: 0;
  }
  .center .node{
    position: absolute;
    top: 42px;
    left: 0;
    width: 8px;
    height:8px;
    border-radius: 50%;
    border: 1px solid white;
    background-color: #3597d4;
  }

    .body li .right{
      flex: 1;
      position: relative;
      background-color:#bedff4;
      border: 1px solid #f1f1f1;
      padding: 10px;
      margin-left: 10px;
      border-radius: 6px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
      float: left;
 
    }
    .right::before{
      position:absolute;
      content:"";
      height:0;
      width: 0;
      pointer-events: none;
      border: solid transparent;
      border-color: rgba(136, 183, 213, 0);
      border-right-color:#bedff4;
      border-width: 10px;
      top: 40%;
      right: 100%;
      margin-top:-10px;
    }


   .right  .content{
    position: absolute;
    /* border: 1px solid blue; */
    width:90%;
    height: 57px;
    top: 6px;
    left: 5%; 
    display: flex;


   }
   .right  .content .contenttext{
    flex: 1;
    font-size: 13px;
    line-height: 19px;
    text-align: left;  
     /* 多行文本溢出显示. */
    /* 首先是溢出隐藏，不可或缺 */
    overflow: hidden;
    /* 弹性盒模型显示 */
    display: -webkit-box;
    /* 盒模型元素的排列方式 */
    -webkit-box-orient: vertical;
    /* 显示行数 */
    -webkit-line-clamp: 3;
     word-wrap: break-word;
     /* margin-left:5px ; */
     padding: 4px;
      color: #3597d4;
   }
   .right  .content .onecontentimg{     
    width:75px;
    height:75px;
    float: right;  
    overflow: hidden;
    position: relative;
  }
  .right  .content .onecontentimg .img{
    /* height:82px; */
  position: absolute; 
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
  }
  .clearfix:after{
    display: block;
    content: "";
    clear: both;
    height: 0;
    visibility: hidden;

  }
   .right .time{
    position: absolute;
    left: 5%;
    bottom: 3px;
    font-size: 10px;
    color: rgba(53, 151, 212, 0.6);
   }
   .isContentImg{
    display:none;
   }

    .page {
      height: 100%;
      position: relative;
      -ms-touch-action: none;
      -webkit-touch-callout: none;
      user-select: none;
      text-size-adjust: none;
    }
    .tip{
      display: none;
      position: absolute;
      top: 50%;
      left:50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.3);
      height: 35px;
      width: 110px;
      line-height: 35px;
      font-size: 12px;
      border-radius: 5px;
      color: white;
    }
</style>