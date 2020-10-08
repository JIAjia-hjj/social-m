<template>
<div class="calendarmemo">
	<div class="header fixed">
     <router-link to="/calendar" class="back">返回</router-link>      
     <span class="add" >添加</span>		
     <h3>新建备忘注</h3>

	</div>
	<div class="body">
 <!--        <calendar
        v-model="value" 
        showDateOnly
        :disabled-days-of-week="disabled"
        :format="format"
        :onDrawDate="onDrawDate" 
        :clear-button="clear" 
        :placeholder="placeholder"
       
        >   
        </calendar> -->
        <input type="text" class="event" placeholder="填写事件">
        <vue-timepicker format="00:00:00"></vue-timepicker>
    </div>
    <footer-nav></footer-nav>
</div>
   

</template>
<script>
import FooterNav from "../../components/footer.vue";
import VueTimepicker from 'vue2-timepicker'
export default{
    name:"indexCalendar",
    data(){
        return{
            // disabled: [],
            // value: new Date(),
            // format: "yyyy-MM-dd",
            // clear: true,
            // placeholder: "Start Date",

        }
    },

    components:{
        FooterNav,
        VueTimepicker
    },
    computed: {

    },
    created(){
    },

    methods: {
     onDrawDate (e) {
      let date = e.date
      if (new Date().getTime() > date.getTime()) {
        e.allowSelect = false
    }
},

},
};
</script>
<style scoped>

.calendarmemo{
     color: #3597D4;   
}
.header .back{
    position: absolute;
    top: 12px;
    left: 3%;
}
.header .add{
    position: absolute;
    top: 12px;
    right: 3%;
}
.body .event{
    width: 100%;
    height: 40px;
    outline: none;
    margin-top: 3px;

}
input::-webkit-input-placeholder {
        /* placeholder颜色  */
       color: #3597D4;   
       /* placeholder字体大小  */
         font-size: 14px;
         text-indent: 1em;

        
}

</style>