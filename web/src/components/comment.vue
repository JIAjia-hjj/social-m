<template>

	      <!-- 评论 -->
      <div class="commentblock" >
        <ul v-for="(item,index) in comments">
         <li>
          <img class="photoimg" :src="'photoimgs/'+item.photoimgurl" alt="头像">
          <div class="username">{{item.username}}：</div>
          <div class="time">{{item.date}} {{item.time}}</div> 
          <div class="comment">
            {{item.comment}}
          </div>
          <div class="delandreply"><span  v-show="isDel" @click="delComment(index)">删除</span><span @click.prevent="showCommentReplayBox(index)">回复</span></div>
        </li>

        <!-- 回复评论 -->
        <ul class="replayblock" :index="index"  v-for="(replayitem,replayindex) in replayComments[index]">
          <li>
            <img class="replayphotoimg" :src="'photoimgs/'+replayitem.photoimgurl" alt="">
            <div class="replayusername">{{replayitem.username}} <span>回复</span> {{replayitem.replayusername}}：</div>
            <div class="replaytime">{{replayitem.date}} {{replayitem.time}}</div> 
            <div class="replaycomment">{{replayitem.replaycomment}}</div>
            <div class="replaydelandreply"><span  v-show="isDel" @click="delComment(index)">删除</span><span @click.prevent="showCommentReplayBox(index,replayindex)">回复</span></div>
          </li>
        </ul>



      </ul>       
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

         	
      }
	};
</script>
<style scoped>
/* span{
	position: absolute;
 }
 
span:nth-of-type(1){
	top: 12px;
	left: 5%;
}

span:nth-of-type(2){
	top: 12px;
	right: 5%;
} */
a{
 	position: absolute;
 }
.calendar{
	top: 12px;
	left: 5%;
}
.edit {
	top: 12px;
	right: 5%;
}
.fontColor{
	color: pink;
}
</style>
