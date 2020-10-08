<template>
	<div class="timeaxis">
		 <pull-to-refresh @on-pullup='onPullup'  @on-pulldown='onPulldown' class="page">
        <ul >
          <li v-for="(item,index) in seeContents" @click="showDetailedContent(index)">
            <div class="left" >
              <span><b>{{item.date.slice(8)}} </b>&nbsp周{{item.week}}</span>
              <span>{{item.date.slice(0,7)}}</span>
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
	</div>
</template>
<script>
  import PullToRefresh from './pull-to-refresh';
	export default{
	  name:"index",
      data(){
        return{
          // tel:this.$route.query.tel,
          contents:[],
          seeContents:[],
          pullupContents:[],
        }
      },
      components: {
        PullToRefresh
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
                    if (this.contents.length<5) {
                     this.seeContents=this.contents
                   }else {  
                     this.seeContents=this.contents.slice(0,5)  
                   }
                   this.seeContents=this.contents.slice(0,5)
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
              if (this.contents.length<5) {
               this.seeContents=this.contents
             }else {  
               this.seeContents=this.contents.slice(0,5)  
               this.pullupContents=this.contents.slice(5)
             }
               // console.log('contents后',this.contents)
               // console.log('seecontents',this.seeContents)
               // console.log('pullupcontents前',this.pullupContents)
             
            }
          }
        },(res)=>{
          alert(res.status)
        })
       },
      showDetailedContent(index){ 
        this.$router.push({path:'/detailedContent',query:{id:this.contents[index].id}})
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

     },
    created(){
       this.showContents()
      },
	};
</script>
<style scoped>
   ul{
      width: 100%;
      height: 100%;
   }
    li{
    display: flex;
    width: 100%;
    height: 90px;
    /* float: left; */
    margin-bottom: 10px;
    border: 1px solid green;
    white-space: pre-wrap;
   }
    li .left{
     width: 25%;
     border: 1px solid red;
     position: relative;
    }
    .left span{
      position: absolute;
      right: 5%;
    }
    .left span:nth-child(1){
      top: 15px;
      font-size: 13px;
    }
    .left span:nth-child(1) b{
      font-size: 15px;
      /* font-weight: bolder; */
    }
    .left span:nth-child(2){
     top: 55px;
    }
    .body li .right{
      flex: 1;
      border: 1px solid red;
      position: relative;
      /* height: 100%; */
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
    font-size: 16px;
    line-height: 19px;
    /* text-align: left;   */
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
   }
   .right  .content .onecontentimg{     
    width:75px;
    height:75px;
    border: 1px solid red;
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
   }
   .isContentImg{
    display:none;
   }

       .page {
        height: 100%;
        /* background: #eee; */
        position: relative;
        /* Prevent native touch events on Windows */
        -ms-touch-action: none;
        /* Prevent the callout on tap-hold and text selection */
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