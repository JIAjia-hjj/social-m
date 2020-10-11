<template>
  <div class="login">
      <div class="login_tip1">
        <img alt="logo" src="~@/assets/images/smile.png" style="width: 24px">
        <p>Hi~</p>
      </div>
      <p class="login_tip2">欢迎来到无关注社交app</p>
      <form>
        <input type="text" placeholder="输入手机号" v-model="logTel" autofocus maxlength="11" key="tel">
        <input type="password" placeholder="输入密码" v-model="logPwd" autofocus key="password">
        <button @click.prevent="submitLogin">登录</button>
      </form>
      <div class="login_tip3">
         <router-link to="/register">注册账号</router-link>
         <router-link to="/forgetPassword">忘记密码</router-link>
      </div>
     
  
  </div>
</template>

<script>
import {login} from 'network/api'

export default {
  name: "login",
  components: {

  },
  data(){
    return{
      logTel:"",
      logPwd:""
    }
  },
  methods:{
    submitLogin(){
      if(this.logTel==""||this.logPwd==""){
        alert("请输入账号或密码")
        return
      }
      let url='/api/user/login'
      let data={'tel': this.logTel,'password': this.logPwd}
      login(data).then((res)=>{
        if(res.code=="000"){
          this.$store.commit('setTel',this.logTel);
          this.$router.push({path:'/index',query:{tel:this.logTel}})
        }else if (res.code=="500") {
          this.logPwd=""
          alert("密码错误")
        }else if (res.code=="501")  {
          this.logTel=""
          this.logPwd=""
          alert("不存在此用户")
        }
      }).catch(err=>{
        alert('失败')
      })
    }
  },
  updated(){
  }
};
</script>
<style scoped>
  .login{
    position: fixed;
    top: 38%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .login_tip1{
    display: flex;
    align-items: center;
    height: 50px;
  }
  .login_tip1 p{
    padding-left: 18px;
    font-size:20px;
  }
  .login_tip2{
    padding:5px 0 38px;
    font-size: 12px;
    color: #999999;
    text-align: left;
    
  }
  input{
    font-size: 12px;
    display: block;
    height: 36px;
    width: 260px;
    margin: 10px auto;   
    border-radius:18px;
    background-color: #fff;
    outline: none;
    padding-left:12px;
  }
  input::-webkit-input-placeholder {
       color: #999;
         font-size: 12px;
     }
  input:nth-child(1),input:nth-child(2){
      text-indent: 1em;
  }
 button{
   height: 36px;
   width: 260px;
   display: block;
   border-radius:18px;
    margin-top: 20px;
    background-color: #90C6F1;
    letter-spacing: 10px;
    color: #fff;
    padding-right:5px;
    font-weight: bolder;
  }
  .login_tip3{
    font-size: 12px;
    line-height: 40px;
  }
  a{
    color: #3597D4;
  }
  .login_tip3 a:nth-child(1){
    padding-right: 100px;
  }
 
</style>