<template>
	<div class="footer fixed">
		<ul>
			<li>
				
				<router-link to="/index"><span class="iconfont">&#xe610;</span>首  页</router-link>
			</li>
			<li>
				<router-link to="/community"><span class="iconfont">&#xe600;</span>社  区</router-link>
			</li>
			<li>
				
				<router-link to="/mypage"><span class="iconfont">&#xe634;</span>  我  的</router-link>
			</li>
		</ul>
	</div>
</template>

<style scoped>


.footer{
	font-size: 10px;
}
ul{
	display: flex;
	height: 100%;

}
ul li{
	height: 100%;
	flex:1;
	background-color: #f1f1f1;}
a{
	display: inline-block;
	width: 100%;
	height: 100%;
}

span{
	display: inline-block;
	width: 100%;
	height: 50%;
	padding-top: 5px;
}


</style>
