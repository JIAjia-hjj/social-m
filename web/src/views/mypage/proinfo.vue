<template>
  <div class="proinfo">
    <div class="header fixed">
      <h4>修改资料</h4>
      <router-link to="/mypage" class="return">
        <span class="iconfont">&#xe616;</span>
        <span>返回</span>
      </router-link>
      <span class="save" @click="save">保存</span>
    </div>
    <div class="body fixed">
      <label for="username">昵称</label>
      <textarea name="" id="username" cols="30" rows="1" v-model="username" autofocus></textarea>
      <label for="signature">个性签名</label>
      <textarea name="" id="signature" cols="30" rows="4" v-model="signature" autofocus></textarea>
    </div>
  </div>
</template>
<script>
  import {getUserInfo, modifyUserInfo} from 'network/api';
  import FooterNav from "components/footer.vue";

  export default {
    name: "index",
    components: {
      FooterNav,
    },
    data() {
      return {
        username: '',
        signature: '',
      }
    },
    methods: {
      save() {
        let data = {'username': this.username, 'signature': this.signature, 'tel': this.$store.state.tel}
        modifyUserInfo(data).then((res) => {
          if (res.code != "000") {
            return
          }
          alert('修改成功')
          this.$router.push({path: '/mypage'})
        })
      },
      getInfo() {
        let data = {'tel': this.$store.state.tel}
        getUserInfo(data).then((res) => {
          if (res.code != "000") {
            return
          }
          this.username = res.result[0]['username']
          this.signature = res.result[0]['signature']
        })

      },
    },
    created() {
      this.getInfo()
    }
  };
</script>
<style scoped>
  .header h4 {
    margin-top: 12px;
  }

  .header .return {
    position: absolute;
    top: 12px;
    left: 3%;
    height: 30px;
  }

  .header .return span:nth-child(2) {
    display: inline-block;
    font-size: 14px;
    height: 100%;
    vertical-align: middle;
  }

  .header .save {
    position: absolute;
    top: 15px;
    right: 5%;
    height: 30px;
    font-size: 14px;
  }

  .body {
    bottom: 0;
    background-color: #AED5EE;
  }

  .body label {
    display: block;
    text-align: left;
  }

  .body textarea {

    width: 100%;
    resize: none;
    line-height: 30px;
    font-size: 16px;
    outline: none;
  }
</style>