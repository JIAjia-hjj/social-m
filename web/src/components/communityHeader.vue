<template>
  <div>   
      <!-- 搜索 -->
    <router-link :to="{name:'search',query:{routerName:'community'}}" class="search"> <span  class="iconfont" >&#xe62e;</span></router-link>
    <div class="contentnav">
      <div class="navitem" :class='{navClass: tabIndex == nowIndex}' v-for='(tabItem,tabIndex) in navTabs' @click.prevent='tabToggle(tabIndex)'> 
         <span :class='{dropdownbtn:tabIndex == 1}'  @click='dropDown'>{{tabItem}} </span>
        <i class="iconfont dropicon" :class="{navClass: tabIndex == nowIndex}" v-if="tabIndex == 1" >&#xe65e;</i>
        <ul v-if='tabIndex == 1' class="dropdownwrapper" v-show='dropdownActive'>
          <li  v-for="(item,index) in navDropLis" @click.prevent="getDropIndex(index,item)">{{item}}</li>
        </ul> 
     </div>   
   </div>
  </div>

</template>
<script>
	export default{
	  name:"CommunityHeader", 
    props:['navIndex'],
    data(){
      return{  
        nowIndex:this.navIndex ,
        dropIndex:0,
        dropdownActive: false,
        navTabs:['情绪','全部'],
        navDropLis:['实时','热门','推荐','我的'],
      }
    },
   
    methods:{
      dropDown(){
        if(event.target.getAttribute('class') === 'dropdownbtn') {
          this.dropdownActive = !this.dropdownActive
          let dropicon=document.getElementsByClassName("dropicon")[0]
          if (dropicon.innerText=="\ue6af") {
            dropicon.innerText="\ue65e"
          }else{
            dropicon.innerText="\ue6af"
          }   
        }
      },
      tabToggle(index){
        if(index === 1){
            this.$router.push({path:'/otherContents'})
            return 
        }else {
            this.dropdownActive = false
           document.getElementsByClassName("dropicon")[0].innerText="\ue65e"
             this.$router.push({path:'/community'})
        }
      },
      getDropIndex(index,item,e){ 
          this.dropIndex=index
          this.$emit("handleDropIndex",this.dropIndex)
          var e=e||window.event
          // console.log(e)
          // console.log(e.path[2].childNodes[0]) 
          this.dropdownActive = false
          e.path[2].childNodes[0].innerText=item
          // document.getElementsByClassName("dropdownwrapper")[0].style.display = 'none'
          document.getElementsByClassName("dropicon")[0].innerText="\ue65e"
      }
    },
    created(){

    },
	};
</script>
<style scoped>
.search{
  position: absolute;
  top: 13px;
  right:5%;
}
.contentnav{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 164px;

}
.contentnav>div{
  display: inline-block;
  height: 30px;
  width:80px;
  line-height: 30px; 
  border: 1px solid white;
}
  .navClass{
    background-color: white;
    color:  #3597D4 !important;
  }
.dropicon{
  font-size: 8px;
  color: black;
}
.contentnav .dropdownwrapper {

  font-size: 14px;  
  z-index: 99999;
  position: absolute;

  margin-bottom: 0;
}
.contentnav .dropdownwrapper li {
  border: 1px solid  white;
  background-color:  #f1f1f1;
  color: black;
  width: 77px;
  height: 30px;
}
.contentnav .dropdownwrapper li:hover {
    background-color: white;
    color: #AED5EE ;
}
  
</style>