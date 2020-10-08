<template>

  <div class="proinfo">
  
    <div class="header fixed"> 
      <h4>导出备份</h4>
      <router-link to="/mypage" class="return">
        <span class="iconfont">&#xe616;</span>
        <span>返回</span>
      </router-link> 
      
    </div>
     <div class="body fixed">
         <label>选择导出时间段</label>
         <input type="text">至 <input type="text"> 

     </div>  
  </div>
</template>
<script>
	import FooterNav from "../../components/footer.vue";
	export default{
	  name:"index",
      components:{
      	FooterNav,
      },
      data(){
        return{
          username:'',
          signature:'',
        }
      },
      methods:{
        save(){

        },
        getInfo(){

        },
      },
      created(){
        
      }
	};
</script>
<style scoped>
.header h4{
  margin-top: 12px;
}
.header .return{
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
.body label{
display: block;
text-align: left;
}
.body input{

  width: 30%;
  resize: none;
  line-height: 30px;
  font-size: 16px;
  outline:none;
}
</style>