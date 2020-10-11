<template>
  <div class="mypage">
    <div class="body">
      <div class="myinfo">
        <!--  <img class="photoimg"  id="btnUpload" @change="upload" src="http://127.0.0.1:3000/photoimgs/IMG_2774.JPG" alt=""> -->
        <img class="photoimg" id="btnUpload" @change="upload" src="" alt="">
        <input type="file" name="avatar" id="avatar" multiple="multiple" @change="upload" style="display:none">
        <div class="username">{{username}}</div>
        <div class="signature">{{signature}}</div>
      </div>
      <div class="edit">
        <div>
          <router-link to="/proinfo"><span style="  border-bottom: 1px solid #AED5EE">资料修改</span><span class="iconfont">&#xe641;</span><span
                  class="iconfont">&#xe638;</span></router-link>
          <router-link to="/proinfo"><span>开通VIP</span><span class="iconfont">&#xe629;</span><span class="iconfont">&#xe638;</span>
          </router-link>
        </div>
        <div>
          <router-link to="/proinfo"><span>系统通知</span><span class="iconfont">&#xe625;</span><span class="iconfont">&#xe638;</span>
          </router-link>
        </div>
        <div>
          <router-link to="/backups"><span style="  border-bottom: 1px solid #AED5EE">备份导出</span><span class="iconfont">&#xe665;</span><span
                  class="iconfont">&#xe638;</span></router-link>
          <router-link to="/proinfo"><span style="  border-bottom: 1px solid #AED5EE">设置</span><span class="iconfont">&#xe631;</span><span
                  class="iconfont">&#xe638;</span></router-link>
          <router-link to="/proinfo"><span>分享给好友</span><span class="iconfont">&#xe62b;</span><span class="iconfont">&#xe638;</span>
          </router-link>
        </div>
      
      </div>
      <router-link class="exit" to="/">退出登录</router-link>
    
    </div>
    <footer-nav></footer-nav>
  </div>
</template>
<script>
  import FooterNav from "components/footer.vue";
  import {uploadImg,getUserInfo,showPhotoimg} from 'network/api'
  export default {
    name: "index",
    components: {
      FooterNav,
    },
    data() {
      return {

        photoimgurl: '',
        username: '',
        signature: '',
      }
    },
    methods: {
      //上传图片
      upload(e) {
        let reader = new FileReader()
        let photoimg = e.target.files[0]  //文件信息
        let type = photoimg.type//文件的类型，判断是否是图片  
        let size = photoimg.size//文件的大小，判断图片的大小  
        if (size > 3145728) {
          alert('请选择3M以内的图片！')
          return false
        }
        if (type != 'image/gif' && type != 'image/jpeg' && type != 'image/png' && type != ' image/jpg') {
          alert('请选择我们支持的图片格式！')
          return false
        }
        var url = ''
        let form = new FormData()
        // 利用Formdata对象，可以实现异步上传图片
        form.append('file', photoimg) //通过append向form对象添加数据

        this.$http.post('/api/upload/uploadPhoto', form, {
          headers: {'Content-Type': 'multipart/form-data'}
        }).then((res) => {
          //保存在服务端后图片的路径
          console.log(res.data)
          this.photoimgurl = res.data["res_photourl"]
          this.$http.post('/api/upload/updatePhotoimgurl', {
            'photoimgurl': this.photoimgurl.slice(17),
            'tel': this.$store.state.tel
          }).then((res) => {
            if (res.body['code'] == "000") {
              alert("上传成功")
              this.showPhotoimg()
            }
          }, (res) => {
            alert(res.status)
          })
        }, (res) => {
          alert(res.status)
        })
      },
      showPhotoimg() {
        showPhotoimg(data).then((res)=>{
          if (res.code!="000") {
            return
          }
          // this.photoimgurl="http://127.0.0.1:3000/photoimgs/"+res.body['result'][0]['photoimgurl']
          this.photoimgurl = "public/photoimgs/" + res.body['result'][0]['photoimgurl']
          document.getElementsByTagName("img")[0].src = this.photoimgurl
        })
      },
      getInfo() {
        let data = {'tel': this.$store.state.tel}
        getUserInfo(data).then((res)=>{
          if (res.code!="000") {
           return
          }
          this.username = res.result[0]['username']
          this.signature = res.result[0]['signature']
        })
      },
    },
    created() {
      this.showPhotoimg()
      this.getInfo()
    },
    mounted() {
      // 由于我们要设置上传图片的样式，所以把input隐藏，并要做如下操作把input的点击事件给div框
      let upload = document.getElementById("btnUpload")
      let avatar = document.getElementById("avatar")
      upload.onclick = function () {
        avatar.click() //注意IE的兼容性
      }
    }
  };
</script>
<style scoped>
  .body {
    top: 0;
    display: flex;
    flex-direction: column;
    background-color: #AED5EE;
    
  }
  
  .body .myinfo {
    height: 160px;
    position: relative;
    background-color: #f1f1f1;
    color: #3597D4;
  }
  
  .body .myinfo .photoimg {
    height: 90px;
    width: 90px;
    border-radius: 50%;
    border: 1px solid #AED5EE;
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-45px);
  }
  
  .body .myinfo .username {
    position: absolute;
    top: 110px;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .body .myinfo .signature {
    font-size: 13px;
    margin-top: 135px;
  }
  
  .body .edit {
    /* background-color: green; */
    /* padding-top: 50px; */
    flex: 1;
  }
  
  .body .edit a {
    display: inline-block;
    position: relative;
    height: 40px;
    line-height: 40px;
    width: 100%;
    
    
  }
  
  .body .edit > div {
    background-color: rgba(255, 255, 255, 0.5);
    margin: 15px 0;
  }
  
  .body .edit a span:nth-child(1) {
    position: absolute;
    left: 15%;
    right: 0;
    text-align: left;
    font-size: 14px;
    color: #3597D4;
  }
  
  .body .edit a span:nth-child(2) {
    position: absolute;
    left: 5%;
    top: 4px;
    color: #AED5EE;
  }
  
  .body .edit a span:nth-child(3) {
    position: absolute;
    right: 5%;
    top: 2px;
    font-size: 14px;
    color: #AED5EE;
  }
  
  .body .exit {
    width: 150px;
    height: 35px;
    line-height: 35px;
    font-size: 16px;
    color: #3597D4;
    letter-spacing: 3px;
    border-radius: 10px;
    background-color: #f1f1f1;
    margin: 10px auto;
  }
</style>