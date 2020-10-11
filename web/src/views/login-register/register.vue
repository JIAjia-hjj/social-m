<template>
  <div class="register">
    <div class="tip1">
      <img alt="logo" src="~@/assets/images/smile.png" style="width: 24px">
      <p>Hi，欢迎注册关注社交app~</p>
    </div>
    <form ref="step1" v-if="step==1">
      <input type="tel" placeholder="输入手机号" v-model="regTel" autofocus maxlength="11" key="tel">
      <div class="code_box">
        <input class="input_code" id="code" type="text" placeholder="输入验证码" v-model="regCode" :disabled="!isGetCode">
        <label class="code_btn" for="code" @click="getCode">{{isGetCode?codeTiem+'s':'点击获取'}}</label>
      </div>
      <button class="btn" type="button" @click="stepNextClick1" >下一步</button>
    </form>
    <form ref="step2" v-if="step==2">
      <input type="text" placeholder="输入昵称" v-model="regUsername">
      <p>添加感兴趣的标签:(最多可以选三项)</p>
      <ul class="interested_list clearfix">
        <li :class="{active:selectInterestedTab[index]!=undefined}" v-for="(item,index) in interestedLabels"  @click="checkLabels(index)">{{item}}</li>
      </ul>
      <button class="btn" type="button" @click="stepNextClick2">下一步</button>
    </form>
    <form ref="step3" v-if="step==3">
      <input type="password" placeholder="输入密码" v-model="regPwd">
      <input type="password" placeholder="确定密码" v-model="regtPwd">
      <button class="btn" @click="register">注册</button>
    </form>
    <router-link @click="login" to="/">登录</router-link>
  </div>
</template>
<script>
  import {getIsRegister, register} from 'network/api'

  const TelCheck = /^[0-9]{11}$/;
  export default {
    data() {
      return {
        regTel: "",
        regCode: "",
        regConfirmNum: "",
        regUsername: "",
        interestedLabels: ['开心', '难过', '抑郁', '生气', '孤独', '烦恼', '回忆', '自卑', '丧', '秘密', '吐槽', '学习', '暗恋', '恋爱', '前任', '迷茫'],
        checkInterestedLabels: [],
        selectInterestedTab:{

        },
        regPwd: "",
        regtPwd:"",
        timeId: "",
        step:1,
        isGetCode: false,
        codeTiem: 60,
        // isStepNext1: false
      }
    },
    methods: {
      login() {
        this.$router.push({path: '/'})
        clearInterval(this.timeId)
      },
      //获取验证码
      getCode() {
        if (this.regTel == "") {
          alert("请先输入手机号码")
          return
        }
        if (!(TelCheck.test(this.regTel))) {
          alert("请先输入正确手机号码")
          this.regTel = ""
          return
        }
        getIsRegister({'tel': this.regTel}).then((res) => {
          if (res.code == "500") {
            alert("账号已被注册")
            this.regTel = ""
            return
          }
          var wait = 60
          clearInterval(this.timeId)
          this.timeId = setInterval(() => {
            if (wait == 0) {
              this.isGetCode = false;
              this.regCode = ""
              wait = 60
              clearInterval(this.timeId)
            } else {
              this.isGetCode = true
              //如果手机号没被注册且等待时间不为0，验证码框可以输入
              wait--
              this.codeTiem = wait
            }
          }, 1000)
          this.regConfirmNum = res.confirmNum
          alert(res.confirmNum)

        })
      },
      stepNextClick1() {
        if (this.regCode != this.regConfirmNum) {
          alert("请输入正确的验证码")
          return
        }
        clearInterval(this.timeId)
        this.step = 2
      },
      stepNextClick2(){
        if (this.regUsername != "" && this.checkInterestedLabels != []) {
          this.step=3
        }
      },
      checkLabels(index, e) {
        var e = e || window.event

        if (this.regUsername == "") {
          alert("请先输入昵称")
          return
        }
        if(this.selectInterestedTab[index]!=undefined){
          let selectInterestedTab=this.selectInterestedTab
          delete selectInterestedTab[index]
          this.selectInterestedTab= Object.assign({},selectInterestedTab)
         return;
        }
        if(Object.keys(this.selectInterestedTab).length>=3){
          alert("已经选了3项")
          return
        }
        this.$set(this.selectInterestedTab,index,this.interestedLabels[index])
        // this.selectInterestedTab=Object.assign({},this.selectInterestedTab,{[index]:this.interestedLabels[index]})
        // let sTab=Object.assign(this.selectInterestedTab,{[index]:this.interestedLabels[index]})
        // console.log(this.selectInterestedTab)
        // console.log(sTab)
        this.checkInterestedLabels.push(this.interestedLabels[index])

      },
      register() {
        if (this.regPwd == "" || this.regtPwd == "") {
          alert("请输入密码")
          return
        }
        if (this.regPwd !== this.regtPwd) {
          alert("两次密码不一样，请重新设置")
          this.regPwd = ""
          this.regtPwd = ""
          return
        }
        const data = {
          'tel': this.regTel,
          'username': this.regUsername,
          'password': this.regPwd,
          'interestedlabels': this.checkInterestedLabels.join(',')
        }
        register(data).then((res) => {
          if (res.code == "000") {
            alert("注册成功")
            setTimeout(function () {
              this.$router.push({path: '/'})
            }.bind(this), 500)
          }
        })
      }
    },
    watch: {
      // regCode(newValue, oldValue) {
      //   // 输入验证码，下一步按钮可以按
      //   if (newValue.length == 4) {
      //     this.isStepNext1 = true
      //   }
      // },
    }

  };
</script>
<style scoped>
  .register {
    position: fixed;
    top: 38%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .tip1 {
    display: flex;
    align-items: center;
    height: 50px;
  }

  .tip1 p {
    padding-left: 18px;
    font-size: 16px;
    color: #999999;
  }

  input {
    height: 36px;
    width: 260px;
    margin: 10px 0;
    border-radius: 18px;
    background-color: #fff;
    padding-left: 12px;
  }

  input::-webkit-input-placeholder {
    color: #999;
    font-size: 12px;
  }

  .btn {
    height: 36px;
    width: 260px;
    margin: 10px 0;
    border-radius: 18px;
    outline: none;
    background-color: #90C6F1;
    letter-spacing: 10px;
    color: #fff;
  }

  .code_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .input_code {
    width: 164px;
  }

  .code_btn {
    display: inline-block;
    font-size: 12px;
    color: #fff;
    width: 80px;
    height: 34px;
    line-height: 34px;
    border-radius: 34px;
    background: #90C6F1;
  }

  .interest_list {
    width: 260px;
    margin: 0 auto;
  }

  .interested_list li {
    float: left;
    margin: 3px 2%;
    width: 29%;
    border: 1px solid white;
    box-sizing: border-box;
    padding: 3px 0;
  }
  .interested_list li.active{
    background-color: #d7d7d7;
  }

  a {
    padding-right: 200px;
    font-size: 12px;
  }

</style>