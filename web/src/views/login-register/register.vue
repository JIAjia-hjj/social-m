
<template>
  <div class="register">
    <img alt="logo" src="~@/assets/images/smile.png" style="width: 24px">
    <div class="login_tip1">
      <img alt=logo" src="~@/assets/images/smile.png" style="width: 24px">
      <p>Hi，无关注社交app~</p>
    </div>
    <form action="" method="post">
      <input type="tel" placeholder="输入手机号" v-model="regTel" maxlength="11">
      <input type="text" placeholder="输入验证码" v-model="regNum"  id="regnum" disabled><label class="regnum" for="regnum" @click="getNum">点击获取</label>
      <input type="button" value="下一步" @click="nextStep1" disabled class="nextstep1">
    </form>
    <form action="" method="post" style="display:none">
      <input type="text" placeholder="输入昵称" v-model="regUsername"> 
      <!-- <input type="text" placeholder="添加感兴趣标签"> -->
      <span>添加感兴趣的标签:</span><span>(最多可以选三项)</span>
      <ul class="interestedLabels clearfix">
        <li v-for="(item,index) in interestedLabels" @click="checkLabels(index)">{{item}}</li>
      </ul>
      <input type="button" value="下一步" @click="nextStep2" disabled class="nextstep2">
    </form>
    <form action="" method="post" style="display:none">
      <input type="password" placeholder="输入密码"  v-model="regPwd">
      <input type="password" placeholder="确定密码" v-model="regtPwd">
      <!-- <input type="button" value="下一步"> -->
      <input type="button" value="注册" @click="submitRegister" class="submitregister">
    </form>
    <div class="foot">
        <a @click="login">登录</a>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      regTel:"",    
      regNum:"",
      regConfirmNum:"",
      regUsername:"", 
      interestedLabels:['开心','难过','抑郁','生气','孤独','烦恼','回忆','自卑','丧','秘密','吐槽','学习','暗恋','恋爱','前任','迷茫'],
      checkInterestedLabels:[],
      regPwd:"",
      regtPwd:"",
      timeId:"",
    }
  },
  methods:{
    login(){
      this.$router.push({path:'/'})
      clearInterval(this.timeId)
    },
    //获取验证码
    getNum(){
     if (this.regTel == "") {
       alert("请先输入手机号码")
       return
     }    
     if (!(/([1][358][0-9][0-9]{8})|([1][4][37][0-9]{8})|([1][7][01367][0-9]{8})/.test(this.regTel))) {
      alert("请先输入正确手机号码")
      this.regTel = ""
       return
     }
     this.$http.post('/api/user/isRegister', {'tel':this.regTel}).then((res)=>{
            if(res.body["code"]=="500"){
              alert("账号已被注册")
              this.regTel = ""
            }else if (res.body["code"]=="000") {
             var wait=60 
            clearInterval(this.timeId)
            this.timeId=setInterval(function(){       
              if (wait==0) {  
                document.getElementsByTagName("label")[0].textContent="点击获取"
                this.regNum="" 
                document.getElementsByTagName("input")[1].disabled=true         
                wait=60
                clearInterval(this.timeId) 
              }else{ 
                //如果手机号没被注册且等待时间不为0，验证码框可以输入
               document.getElementsByTagName("input")[1].disabled=false
               wait--
               document.getElementsByTagName("label")[0].textContent=wait+'s'
              }
            }, 1000)
            this.regConfirmNum=res.body["confirmNum"]
             alert(res.body["confirmNum"])
           } 
         },(res)=>{
          alert("res.status")
      })  
    },     
    nextStep1(){
      // document.getElementsByTagName("label")[0].textContent="点击获取"
      if(this.regNum==this.regConfirmNum){
      clearInterval(this.timeId)
      document.getElementsByTagName("form")[0].style.display  = 'none'
      document.getElementsByTagName("form")[1].style.display  = 'block'
      }else {
        alert("请输入正确的验证码")
      }
     },
     checkLabels(index,e){
      var e=e||window.event
      var checkLiEle=document.getElementsByTagName("li")[index]
      if(this.regUsername==""){
        alert("请先输入昵称") 
        return
      }
      if (checkLiEle.style.backgroundColor  =='white') {
         checkLiEle.style.backgroundColor  = ''
         checkLiEle.style.color  = 'white'
         var checkLabelsIndex=this.checkInterestedLabels.indexOf(e.target.textContent)
         this.checkInterestedLabels.splice(checkLabelsIndex, 1)
      }else {  
        if(this.checkInterestedLabels.length>=3){
          alert("已经选了3项")
          return 
        }
        checkLiEle.style.backgroundColor  = 'white'
        checkLiEle.style.color  = '#3597D4'
        this.checkInterestedLabels.push(e.target.textContent)
      }
      if(this.regUsername!=""&&this.checkInterestedLabels!=[]){
        document.getElementsByTagName("input")[4].disabled=false
      }
     },
     nextStep2(){
      document.getElementsByTagName("form")[1].style.display  = 'none'
      document.getElementsByTagName("form")[2].style.display  = 'block' 
     },
     submitRegister(){
        if (this.regPwd==""||this.regtPwd=="") {
           alert("请输入密码")
        }else {
          if(this.regPwd!==this.regtPwd){
            alert("两次密码不一样，请重新设置")
            this.regPwd="" 
            this.regtPwd=""
          }else {
             let url='/api/user/addUser'
             let data = {'tel':this.regTel,'username':this.regUsername,'password':this.regPwd,'interestedlabels':this.checkInterestedLabels.join(',')}
             this.$http.post(url,data).then((res)=>{
                  if(res.status==200){
                      if (res.data["code"]=="000") {
                      alert("注册成功")  
                      setTimeout(function(){
                        this.$router.push({path:'/'})
                      }.bind(this),500)
                    } 
                  }
             },(res)=>{
              alert("res.status")
             })

          }
        }  
      }
  },
  watch:{
     regNum(newValue, oldValue){ 
       // 输入验证码，下一步按钮可以按
        if(newValue.length==4){
          document.getElementsByTagName("input")[2].disabled=false
        }
     },
  }

};
</script>
<style scoped>
  .login_tip1{
    display: flex;
    align-items: center;
    height: 50px;
  }
  .login_tip1 p{
    padding-left: 18px;
    font-size:20px;
  }
  .register{
    position: fixed;
    top: 38%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
  }
  input{
    height: 36px;
    width: 260px;
    margin: 10px 0;   
    border-radius:18px;
    border: 1px solid white;
    outline: none;
    background-color: #3597D4;
    color: white;
    text-indent: 1em;
  }
  input::-webkit-input-placeholder {
        /* placeholder颜色  */
       color: white;   
       /* placeholder字体大小  */
         font-size: 12px;
         text-indent: 1em;
        
     }
  .nextstep1,.nextstep2,.submitregister{
      background-color: white;
      color: #3597D4;
      letter-spacing: 5px;
      text-indent: 0em;
  }
  input#regnum{
    width: 175px;

  }
  .regnum{
    display: inline-block;
    font-size: 14px;
    width: 80px;
    line-height: 34px;
    /* background-color: white; */
  }
  .interestedLabels{
    width: 260px;    
    margin: 0 auto;
  }
  .interestedLabels li{
   float: left;
   margin: 3px 2%;
   width: 29%;
   border: 1px solid white;
   box-sizing: border-box;
  }
  .foot{
    font-size: 10px;
  }
 a{
  padding-right: 200px;
  font-size: 12px;
  color: white;
 }
 
</style>