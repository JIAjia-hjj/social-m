<template>
  <div>
    <div  class="header fixed">
      <community-header :navIndex="0"></community-header>
    </div>
    <div class="body" >
      <ul >
       <li class="emotionlabel" v-for="item in emotionLabels"  @click="showEmotionContent">
        <img src="../../assets/images/1.png" alt="" class="bg1">
        <img src="../../assets/images/2.png" alt="" class="bg2" >
        <img src="../../assets/images/3.png" alt="" class="bg3">
        <span class="label">{{item}}</span>
       </li>  
     </ul>
    </div>
    <footer-nav></footer-nav>
  </div>

</template>
<script>
	import FooterNav from '../../components/footer.vue';
  import CommunityHeader from "../../components/communityHeader.vue";
	export default{
	  name:'community',
    components:{
      	FooterNav,
        CommunityHeader,
    },
    data(){
      return {
        index:0,
        emotionLabels:['开心','难过','抑郁','生气','孤独','烦恼','回忆','自卑','  丧','秘密','吐槽','学习','暗恋','恋爱','前任','迷茫'],
        navLi:[
        {index:0,name:'最新'},
        {index:1,name:'最热'},
        {index:2,name:'我的'},
        ],
        isNavLi:0,
        otherContents:[],
        photoimgurls:[],
        timeId1:'',
        timeId2:'',
      }
    },
    methods:{
      showEmotionContent(e){
        clearInterval(this.timeId1)
        clearInterval(this.timeId2)
        this.$router.push({path:'/emotionContent',query:{contentLabel:e.target.textContent}})
      },
    },
created(){
  var images1=document.getElementsByClassName("bg1") 
  this.timeId1=setInterval(function(){
    for (var i = 0; i<images1.length; i++) {
     images1[i].style.left = 3+Math.random()*6+'px'
     images1[i].style.top= -3+Math.random()*6+'px'
     images1[i].style.transition = 'left 1s,top 1s'
    } 
  },2500)
  var images2=document.getElementsByClassName("bg2")
   this.timeId2=setInterval(function(){
    for (var i = 0; i<images2.length; i++) {
     images2[i].style.left = 11+Math.random()*6+'px'
     images2[i].style.top= 7+Math.random()*6+'px'
     images2[i].style.transition = 'left 1s,top 1s'
    }
  },1500)
  // var images3=document.getElementsByClassName("bg3")
  // setInterval(function(){
  //   for (var i = 0; i<images3.length; i++) {
  //    images3[i].style.left = 7+Math.random()*13+'px'
  //    images3[i].style.top= 3+Math.random()*6+'px'
  //    images3[i].style.transition = 'left 1s,top 1s'
  //   }
  // },1500)
},
    
	};
</script>
<style scoped>
  .header .contentnav{
    position: absolute;
    top: 15px;
    left: 30%;
  } 
  .body .emotionlabel{
    position: relative;
    color: white;
    height: 100px;
    line-height: 100px;
    width: 31.33%;
    margin: 0px 1%;
    float: left;
    /* outline: 1px solid white; */
/*     background-image: url('../../assets/images/emotionbg.png');
    background-repeat: no-repeat;
    background-size: 100%; */
    /* margin: 15px atuo; */
  }
  .body .emotionlabel .bg1{
    width: 100px;
    position: absolute;
    left: 6px;
    top: 0px;
  }
    .body .emotionlabel .bg2{
    width: 80px;
    position: absolute;
    left: 14px;
    top: 10px;
  }
    .body .emotionlabel .bg3{
    width: 89px;
    position: absolute;
    left: 10px;
    top: 6px;
  }
    .body .emotionlabel .label{
    width: 100px;
    position: absolute;
    left: 4px;
    top: 2px;
    }
</style>


