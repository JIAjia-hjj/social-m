<template>
	<div class="showcontentimg clearfix">
		  <!-- 内容图片 -->
      <div class="contentimg clearfix"  v-for="(imgsrc,index) in contentimgurls" >
        <div class="imgbox"> <img @load="handleImg(imgsrc,index)" @click="detailedContentImg(imgsrc,index)" :src="'public/contentimgs/'+imgsrc" alt="照片"  class="img" id="contentimg" ></div>
      </div>


      <div class="detailedcontentImg">
        <div class="imgbox">
          <img class="imgdetail" src="" alt="" @click="cancleDetailedContentImg">
          <div class="content">{{content}}</div>
        </div>
        <span class="iconfont left " @click="previousimg">&#xe60c;</span>
        <span class="iconfont right" @click="latterimg">&#xe60e;</span>
      </div>
      
	</div>
</template>
<script>
	export default {
  name: "ShowContentimg",
  props:['id'],
  data(){
  	return{
  	  contentimgurls:[],
      content:'',
  	}
  },
  methods:{
        showOtherContent(){
            //页面详细内容的显示
            this.$http.post('/api/community/showOtherDetail',{'id':this.id}).then((res)=>{
              let result=res.body['result'][0]
              this.content=result['content']
               
           },(res)=>{
             alert(res.status)
           })
         
        },

  	getContentImgUrls(){
  		this.$http.post('/api/content/getContentImgUrls',{'id':this.id}).then((res)=>{
  			if(res.status==200){
  				if(res.body['code']=='500'){
  					alert('服务器出错')
  				}else {
                //先清空
                this.contentimgurls=[]
                if(res.body['result'][0]['contentimgurls']!=null&&res.body['result'][0]['contentimgurls']!=""){
                	this.contentimgurls=res.body['result'][0]['contentimgurls'].split(',')
                	console.log(this.contentimgurls)
                }
            }
          }
      },(res)=>{
      	alert(res.status)
      })
  	},
  	handleImg(imgsrc,index){
  		var img = new Image();
  		var contentimg='public/contentimgs/'+imgsrc 
  		img.src=contentimg
      if(img.width>img.height){
      	document.getElementsByClassName("img")[index].style.height=100+"px"
      }else {
      	document.getElementsByClassName("img")[index].style.width=100+"px"
      }         
    },

      //点击图片，图片变大
        detailedContentImg(imgsrc,index){
          document.getElementsByClassName("detailedcontentImg")[0].style.display = 'block'
          var img = new Image();
          var contentimg='public/contentimgs/'+imgsrc 
          img.src=contentimg
          
             document.getElementsByClassName("imgdetail")[0].src=contentimg
            if(img.width>img.height){
              document.getElementsByClassName("imgdetail")[0].style.width="100%"
            }else {
              document.getElementsByClassName("imgdetail")[0].style.height=300+"px"
            }           
          
        },
        //取消查看图片
        cancleDetailedContentImg(){
          document.getElementsByClassName("detailedcontentImg")[0].style.display = 'none'
        },
        //点击上一张，触发
        previousimg(){
            for (var i = 0; i < this.contentimgurls.length; i++) {

              if( document.getElementsByClassName("imgdetail")[0].src.split('/')[5]==this.contentimgurls[i]){
                if (i==0) {
                  alert("已经是第一张图片")
                }else {
                   document.getElementsByClassName("imgdetail")[0].src='public/contentimgs/'+this.contentimgurls[i-1]
                }
              } 
            }
        },
        //点击下一张，触发
        latterimg(){
           for (var i = this.contentimgurls.length-1; i >=0; i--) {
              if( document.getElementsByClassName("imgdetail")[0].src.split('/')[5]==this.contentimgurls[i]){
                console.log(i== this.contentimgurls.length-1)
                if (i== this.contentimgurls.length-1) {
                  alert("已经是第一张图片")
                }else {
                   document.getElementsByClassName("imgdetail")[0].src='public/contentimgs/'+this.contentimgurls[i+1]
                }  
              }  
            }         
        },
  },
  created(){
    this.showOtherContent()
    this.getContentImgUrls()


     },
     watch:{
      id(){
         this.getContentImgUrls()
      }
     }
};
</script>
<style scpoed>	
/* 图片 */

.clearfix:after{
  display: block;
  content: "";
  clear: both;
  height: 0;
  visibility: hidden;

}

.contentimg{     
  width:33.3%;
  height:100px;
  float: left;
  margin-top:10px;
  box-sizing: border-box;
}
.contentimg .imgbox{
  position: relative;
  width:100px; 
  height: 100%;
  overflow: hidden;
  margin: 0 auto;
}
.contentimg #contentimg{    
  position: absolute; 
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
}

.detailedcontentImg{
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(1, 1, 1, 0.5);
  width: 100%;
  height: 100%;
  z-index: 111;
}
.detailedcontentImg .imgbox{
 width: 100%;
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 /* margin: 0 auto; */
}
.detailedcontentImg .imgbox .content{
 font-size: 15px;
 color: white;
} 
.detailedcontentImg  span{
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  font-size: 25px;
  color:#3597D4; 
  /* background-color: rgba(1, 1, 1, 0.9); */
  position: absolute;
  top: 50%;
  transform: translateY(-50%)
}
.detailedcontentImg  .left{
  left: 0;
}
.detailedcontentImg   .right{
right: 0;
}
</style>