<template>
  <div class="writepage">
    <div class="header fixed">
      <router-link to="/index" class="cancel">取消</router-link>
      <!-- 发布 -->
      <span class="iconfont release" @click.prevent=" submitWriteContent">&#xe617;</span> 
      <h3>写</h3> 
    </div>
    <div class="body" @click="cancleEditBox">
      <textarea name="write" id="" cols="30" rows="10" autofocus v-model="writeContent">

      </textarea> 
    </div>

    <div class="footer fixed">
      <!-- 字体 -->
      <span class="iconfont" @click="editFont">&#xe800;</span>
      <!-- 图片 -->
      <span class="iconfont"  @click="addImg"><b class="imgnumber">{{contentimgurls.length}}</b>&#xe833;</span>
      <!-- 视频 -->
      <span class="iconfont"  @click="addVideo">&#xe620;</span>
      <!-- 语音 -->
      <span class="iconfont"  @click="addVoice">&#xe60a;</span>
      <!-- 是否同步至社交广场 -->
      <span class="iconfont"  @click="addCommunity">&#xe601;</span>
    </div>
    <div class="edit">
      <div class="editfont" style="display:none">
        字体
      </div>
    <div class="addimg  clearfix" style="display:none" >
       <ul v-for="item in contentimgurls">
         <li >
          <span class="iconfont deleteimg" @click="deleteImg">&#xe639;</span>
          <img class="contentimg" :src="'public/contentimgs/'+item" alt="照片"  @load="handleElement('addimg')">
        </li>   
        </ul>  
       <input ref="upload" type="file" name="avatar" id="avatar" multiple @change="upload" style="display:none">
       <div class="iconfont addcontentimgicon" id="btnUpload" @change="upload" >&#xe609;</div>
       <div class="tips">(最多可以上传9张图片，还可以上传<b>{{9-contentimgurls.length}}</b>)</div>
     </div>
     <div class="addvideo" style="display:none">
      视频     
    </div>
    <div class="addvoice" style="display:none">
      音频
    </div>
    <div class="addcommunity" style="display:none">
      <div class="communityBtn">
       同步至社区
       <span class="btn_big">
        <span class="btn_small" @click="addtoCommunity"></span>
      </span>  
    </div>
    <div class="label ">选择/新增情绪标签  <span class="selectedlabel">{{contentLabel}}</span>
      <div class="emotionlabelbox clearfix"> 
        <ul>
         <li class="emotionlabel" v-for="item in emotionLabels" @click="selectLabel">{{item}}</li>  
       </ul>
       <span class="iconfont addlabel" >&#xe626;</span>
     </div>
     <span></span>
   </div>     
 </div> 
</div>

</div>
   

</template>
<script>
	import FooterNav from '../../components/footer.vue';
  import {getTime} from '../../assets/js/public.js'
	export default{
	  name:'indexWrite',
    components:{
      	FooterNav,
    },
    data(){
      return {
        nowTime:{},
        writeContent:'',
        isAddCommunity:0,
        emotionLabels:['开心','难过','抑郁','生气','孤独','烦恼','回忆','自卑','丧','秘密','吐槽','学习','暗恋','恋爱','前任','迷茫'],
        contentLabel:'',
        contentimgurls:[],
      }
    },
    methods:{
      handleElement(className){
        document.getElementsByClassName("edit")[0].style.display='block'
        document.getElementsByClassName("edit")[0].style.padding ='10px 0'
        var editEleChilden=document.getElementsByClassName("edit")[0].children
          //点击是先把所有编辑模块隐藏后再显示
          for (var i = 0; i < editEleChilden.length; i++) {
            editEleChilden[i].style.display = 'none'
          }   
          var bodyEle=document.getElementsByClassName("body")[0]
          var footerEle=document.getElementsByClassName("footer")[0]
          //点击
          var clickEle=document.getElementsByClassName(className)[0]
          clickEle.style.display='block'
          bodyEle.style.bottom = 70+clickEle.offsetHeight+'px' 
          footerEle.style.bottom = 20+clickEle.offsetHeight+'px'       
      },

      submitWriteContent(){     
        let url=''
        let data={}
        if(this.$route.fullPath=="/write"){
          if (this.writeContent=='') {
            alert("请输入内容")
          }else {
            console.log(this.$store.state.tel);
            this.nowTime=getTime()
             url='/api/content/save'
             data={'tel': this.$store.state.tel,'date':this.nowTime['date'],'time': this.nowTime['time'],'week': this.nowTime['week'],'isaddcommunity':this.isAddCommunity,'content':this.writeContent,'contentimgurls':this.contentimgurls.join(','),'contentlabel':this.contentLabel}
          }
        }else {
           url='/api/content/updateSave'
           console.log(this.contentimgurls)
           data={'id':this.$route.query.id,'content':this.writeContent,'isaddcommunity':this.isAddCommunity,'contentimgurls':this.contentimgurls.join(','),'contentlabel':this.contentLabel}
        } 
        this.$http.post(url,data).then((res)=>{
          if(res.status==200){
            if(res.body['code']=='500'){
              alert('服务器出错')
              console.log(res.body['err'])
            }else {
              alert(res.body['msg'])              
              this.$router.push({path:'/index'}) 
            }

          }
        })
      },
      //获取isAddCommunity
      getIsAddCommunity(){
         this.$http.post('/api/content/getIsAddCommunity',{'id':this.$route.query.id}).then((res)=>{
          if(res.status==200){
            if(res.body['code']=='500'){
              alert('ER_OPERAND_COLUMNS')
            }else {
              this.isAddCommunity=res.body['result'][0]['isaddcommunity']
            }

           }
         })
      },
      //编辑
      showEditContent(){
        let url='/api/content/showDetail'
        let data={'tel': this.$store.state.tel,'id':this.$route.query.id}
        this.$http.post(url,data).then((res)=>{
          this.writeContent=res.body['result'][0]['content']

          if (res.body['result'][0]['contentimgurls'].length>0) {
          this.contentimgurls=res.body['result'][0]['contentimgurls'].split(',') 
          document.getElementsByClassName("imgnumber")[0].style.display  ='block'
          }
          document.getElementsByClassName("selectedlabel")[0].style.display  = 'inline'
          this.contentLabel=res.body['result'][0]['contentlabel']
          for (var i = 0; i < document.getElementsByClassName("emotionlabel").length; i++) {
            if ( document.getElementsByClassName("emotionlabel")[i].innerText== this.contentLabel) {
              document.getElementsByClassName("emotionlabel")[i].style.backgroundColor ='#3597D4'
              document.getElementsByClassName("emotionlabel")[i].style.color = 'white' 
            }
          }
        },(res)=>{
          alert(res.status)
        })
      },
      cancleEditBox(){
        var editEle=document.getElementsByClassName("edit")[0]
        if (editEle.offsetHeight>0) {
          editEle.style.display="none"
          var bodyEle=document.getElementsByClassName("body")[0]
          var footerEle=document.getElementsByClassName("footer")[0]
          bodyEle.style.bottom = 20+'px' 
          footerEle.style.bottom =0
           editEle.style.padding ='0'
        }
      },
      // 字体
      editFont(){
       this.handleElement("editfont")
      },
      // 图片
      addImg(){
        this.handleElement("addimg")
      },
      deleteImg(e){
        console.log(e.target.nextSibling.src.split('/')[5])
        for (var i = 0; i < this.contentimgurls.length; i++) {
          let imgurl=e.target.nextSibling.src.split('/')[5]
          if (this.contentimgurls[i]==imgurl) {
             this.contentimgurls.splice(i, 1)
             console.log(this.contentimgurls)
             this.handleElement("addimg")
          }
         
        }
        if ( this.contentimgurls.length==0) {
             document.getElementsByClassName("imgnumber")[0].style.display  ='none'
        }
      },
      upload(e){
          // this.handleElement("addimg")
          let reader =new FileReader() 
         let contentimg=e.target.files[0]  //文件信息
          let type=contentimg.type//文件的类型，判断是否是图片   
          if(type!='image/gif'&&type!='image/jpeg'&&type!='image/png'&&type!=' image/jpg') {
            alert('请选择我们支持的图片格式！')
            return false
          }  
         let form = new FormData()  //利用Formdata对象，可以实现异步上传图片
         form.append('file',contentimg) //通过append向form对象添加数据
         this.$http.post('/api/upload/uploadContentImg',form,{   
              headers:{'Content-Type':'multipart/form-data'}  
            }).then((res)=> {  
                 //保存在服务端后图片的路径
                 console.log(res.data) 
                 this.contentimgurls.push(res.data["res_contentimgurl"].slice(19))
                 console.log(this.contentimgurls)
                 if(this.contentimgurls.length>0){
                  document.getElementsByClassName("imgnumber")[0].style.display  ='block'
                 }
                 if(this.contentimgurls.length>=9){
                  alert("已经上传了9张图片，不能再上传")
                  return
                 }
                 this.$refs.upload.value = null;
                
               },(res)=>{
                alert(res.status)
          })  
      },

      showContentImg(){
      },
      // 视频
      addVideo(){
       this.handleElement("addvideo")
      },
      // 语音
      addVoice(){

        this.handleElement("addvoice")
      },
      //点击foot下的处理同步和标签的按钮模块
      addCommunity(){
        this.handleElement("addcommunity")
        if(this.isAddCommunity){
           document.getElementsByClassName("btn_small")[0].style.left=15+"px"    
           document.getElementsByClassName("btn_big")[0].style.backgroundColor = '#AED5EE'       
        }else {
          document.getElementsByClassName("btn_small")[0].style.left=0+"px" 
        }
      },
      //点击同步到社区按钮时执行
      addtoCommunity(){   
        if(this.isAddCommunity){
           document.getElementsByClassName("btn_small")[0].style.left=0+"px"
           document.getElementsByClassName("btn_big")[0].style.backgroundColor = ''
           this.isAddCommunity=0
        }else {
          document.getElementsByClassName("btn_small")[0].style.left=15+"px" 
          document.getElementsByClassName("btn_big")[0].style.backgroundColor = '#AED5EE'
          this.isAddCommunity=1
        }
        // console.log("设置"+this.isAddCommunity)
      },
      //选择内容标签
      selectLabel(e){
        document.getElementsByClassName("selectedlabel")[0].style.display  = 'inline'
        this.contentLabel=e.target.textContent
        for (var i = 0; i < document.getElementsByClassName("emotionlabel").length; i++) {
          document.getElementsByClassName("emotionlabel")[i].style.backgroundColor = '' 
           document.getElementsByClassName("emotionlabel")[i].style.color = ''
        }
        e.target.style.backgroundColor = '#3597D4' 
        e.target.style.color = 'white' 
      },
    },
    created(){
        if(this.$route.fullPath!="/write"){
          this.showEditContent()
          this.getIsAddCommunity()
        }
    },
    mounted(){
        // 由于我们要设置上传图片的样式，所以把input隐藏，并要做如下操作把input的点击事件给div框
        let upload = document.getElementById("btnUpload")
        let avatar = document.getElementById("avatar")
        upload.onclick =function(){
         avatar.click() //注意IE的兼容性
         }
    }
	};
</script>
<style scoped>
  .writepage{
   color:#3597D4;
  }
  h3{ 
    height: 50px;
    line-height: 50px;
  }
  .header .cancel{
    position: absolute;
    left: 5%;
    top: 16px;
    font-size: 13px;
    color: #3597D4;
  }
  .header .release{
    position: absolute;
    right: 5%;
    top: 15px;
    /* display: block */
     font-size: 18px;
  }
  .body textarea{
    resize: none;
    width: 100%;
    height: 100%;
    outline:none;
    white-space: pre-wrap;
    background-color: rgba(255, 255, 255, 0.6);
    font-size: 25px;
    word-wrap: break-word;
  }
  .footer{
    display: flex;
    background-color:#3597D4;

   }
   .footer span{
     padding-top:10px;
     flex: 1;   
    color: white;
    }
     .footer span:nth-child(2){
      position: relative;
     }
   .footer .imgnumber{
    display: inline-block;
    width: 15px;
    height: 15px;
    color: white;
    background-color: red;
    border-radius: 50%;
    font-size: 5px;
    position: absolute;
    top: 7px;
    left: 41px;
    display: none;

   }
.edit{
     width: 100%;
     position: absolute;
     bottom: 0;
     left: 0;
     right: 0;    
     /* padding: 10px 0; */
     background-color: #f1f1f1;
    }  
  .edit .editfont,.addimg,.addvideo,.addvoice,.addcommunity,{
      /* background-color: green; */
      width: 100%;
 
  }
.addimg ul {
  float: left;
  width: 33.33%;
  height: 80px;
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin:2px 0;
  overflow: hidden;
  position: relative;
}
.addimg  .contentimg{
  width:80px; 
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
}
.addimg .deleteimg{
  position: absolute;
  top: 0px;
  right: 22px;
  z-index: 1;
  font-size: 13px;
}
.addimg  .addcontentimgicon{
  float:left;
  width: 33%;
  font-size:50px;
  font-weight: 300;
  height: 80px;
  line-height: 80px;
  text-align: center;
  margin:2px 0;
}
.addimg .tips{
  font-size: 14px;
  float: left;
   text-align: left;
   text-indent: 1em;
   width: 100%;
}

.addcommunity .communityBtn{
   position: relative;
   text-align: left;
   padding-left: 12px;
}
.addcommunity .btn_big{
  display: inline-block;
  position: absolute;
  top: 0;
  left: 100px;
  width: 40px;
  height: 20px; 
  border-radius: 10px;
  border: 1px solid #AED5EE;

}
.addcommunity .btn_small{
  display: inline-block;
  width: 25px;
  height: 100%;
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
  background-color:#3597D4;
}
.addcommunity .label {
  padding: 10px;
  text-align: left;
} 
.addcommunity  .label .selectedlabel{
   padding: 3px 8px;
   margin: 6px 4px;
   background-color: #AED5EE;
   display: none;
}
.addcommunity  .label .emotionlabelbox .emotionlabel{
  float: left;
  width: 18%;
  margin: 6px 1%;
  background-color:#AED5EE;
  text-align: center;
  
} 

.addcommunity  .label .emotionlabelbox .addlabel{
  float: left;
  margin: 6px 4px;
  padding: 3px 8px;
}
</style>


