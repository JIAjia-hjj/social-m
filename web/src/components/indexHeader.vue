<template>
	<div class="header fixed">
		<!-- 日历 -->
	<!-- <span class="iconfont" v-bind:class="{fontColor:isFontColor}" @click="handleCalendar"  >&#xe695;</span> -->

	<!-- 写内容 -->
	
	<!-- <span  class="iconfont" v-bind:class="{fontColor:isFontColor}"  @click="writeContent" > &#xe611;</span> -->
	   
		<router-link :to="{name:'calendar'}" class="calendar"> <span  class="iconfont" > &#xe695;</span></router-link> 
		<!-- 编辑 写 -->
		<router-link :to="{name:'write'}" class="edit"> <span  class="iconfont" > &#xe611;</span></router-link>
		<!-- 搜索 -->
		<router-link :to="{name:'search',query:{routerName:'index'}}" class="search"> <span  class="iconfont" >&#xe62e;</span></router-link>
       <!--<span>{{tel}}</span> -->
		<router-view/>	
	</div>
	
</template>
<script>
	export default{
		name:"indexHeader",
		data(){
			return{
				isFontColor:false,
			}
		},
         methods:{


        handleCalendar(){
        	this.isFontColor=true
        	this.$router.push({path:'/calendar'})
        },
      	writeContent(){
      		this.isFontColor=true
      		this.$router.push({path:'/write'})
      	}
      }
	};
</script>
<style scoped>
a{
 	position: absolute;
 }

.calendar{
	top: 13px;
	left: 5%;
}
.edit {
	top: 12px;
	right: 5%;
}
.search{
	top: 12px;
	left: 18%;
}
.fontColor{
	color: pink;
}
</style>
