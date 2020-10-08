<template>
<div class="calendar">
	<div class="header fixed">
		<div @click="handleBack">
			<span class="iconfont">&#xe616;</span>
			<span>返回</span>
		</div>      
    <router-link to="/memo" class="addmemorandum iconfont" >&#xe626;</router-link>		
		<h3>日历</h3>

	</div>
	<div class="body">
        <calendar
        v-model="value"
        :disabled-days-of-week="disabled"
        :format="format"
        :placeholder="placeholder"
        :pane="1"
        :has-input="false"
        :on-day-click="onDayClick"
        :change-pane="changePane"
        :events="events"
        >   
        <!--显示农历日期的标签-->
            <div class="lurevent" v-for="(lurevent, index) in lurevents" :key="index" :slot="lurevent.date">
                <div style="font-size:6px;" v-html="lurevent.content"></div>
            </div>
            <div v-for="(event, index) in events" :key="index" :slot="event.date">
                <div style="background-color:pink;">{{event.date}}</div>
            </div>
        </calendar>
        <h4>内容</h4>
        <div class="contentbox clearfix" v-for="(item, index) in onedayContent" :key="index"  @click="showDetailedContent(index)"> 
          <div class="content"> {{item.content}}</div>
          <div class="time">{{item.time}}</div> 
        </div> 
        <router-link to="/write"><div class="nocontent"></div></router-link>
        <h4>添加备忘录</h4>
        <div  class="memorandumbox" > 
          
        </div>
       
	</div>
	<footer-nav></footer-nav>
</div>
   

</template>
<script>
	import FooterNav from "../../components/footer.vue";
    import Calendar from 'vue2-slot-calendar';
    import lunar from './lunar';
    // import {calendar,monthDays,cDay} from './lunar.js'
	export default{
		name:"indexCalendar",
		data(){
			return{
			      disabled: [],
            value: this.stringify(new Date()),
            format: "yyyy-MM-dd",
            clear: true,
            events: [],
            contents:[],
            onedayContent:[],
            a:[],
            lurevents: [],
            placeholder: "Start Date",
            date1: '',
            isHoliday: true,
            DATENAME: {
                'today': '今天',
                'yuandan': '元旦',
                'chuxi': '除夕',
                'chunjie': '春节',
                'yuanxiao': '元宵',
                'qingming': '清明',
                'wuyi': '劳动',
                'duanwu': '端午',
                'zhongqiu': '中秋',
                'guoqing': '国庆'
            },
            HOLIDAYS: {
                yuandan: ['2012-01-01', '2013-01-01', '2014-01-01', '2015-01-01', '2016-01-01', '2017-01-01', '2018-01-01', '2019-01-01', '2020-01-01'],
                chuxi: ['2012-01-22', '2013-02-09', '2014-01-30', '2015-02-18', '2016-02-07', '2017-01-27', '2018-02-15', '2019-02-04', '2020-01-24'],
                chunjie: ['2012-01-23', '2013-02-10', '2014-01-31', '2015-02-19', '2016-02-08', '2017-01-28', '2018-02-16', '2019-02-05', '2020-01-25'],
                yuanxiao: ['2012-02-06', '2013-02-24', '2014-02-14', '2015-03-05', '2016-02-22', '2017-02-11', '2018-03-02', '2019-02-19', '2020-02-08'],
                qingming: ['2012-04-04', '2013-04-04', '2014-04-05', '2015-04-05', '2016-04-04', '2017-04-04', '2018-04-05', '2019-04-05', '2020-04-04'],
                wuyi: ['2012-05-01', '2013-05-01', '2014-05-01', '2015-05-01', '2016-05-01', '2017-05-01', '2018-05-01', '2019-05-01', '2020-05-01'],
                duanwu: ['2012-06-23', '2013-06-12', '2014-06-02', '2015-06-20', '2016-06-09', '2017-05-30', '2018-06-18', '2019-06-07', '2020-06-25'],
                zhongqiu: ['2012-09-30', '2013-09-19', '2014-09-08', '2015-09-27', '2016-09-15', '2017-10-04', '2018-09-24', '2019-09-13', '2020-10-01'],
                guoqing: ['2012-10-01', '2013-10-01', '2014-10-01', '2015-10-01', '2016-10-01', '2017-10-01', '2018-10-01', '2019-10-01', '2020-10-01']
            }
	    }
	 },

		components:{
			FooterNav,
            Calendar
		},
        computed: {
         _dateMap () {
             return this._createDateMap()
          }
       },
      created(){
        this.getTodayContent()
       },

        methods: {
         
          	handleBack(){
                this.$router.push({path:'/index'})
            },
            onDayClick (date, str) {
              this.onedayContent=[]  
              document.getElementsByClassName("nocontent")[0].textContent="暂无内容"
              var clickdate = str.replace(/-/g,'.')
              for (var i = 0; i < this.events.length; i++) {
                  if(this.events[i]['date']==clickdate){  
                  document.getElementsByClassName("nocontent")[0].textContent=""
                  this.onedayContent=this.events[i]['content']   
                }
              }  
            }, 
            showDetailedContent(index){ 
            this.$router.push({path:'/detailedContent',query:{id:this.onedayContent[index].id,routerName:'calendar'}})
          },
            getDateInfo (v) {
              var iDiff = -1
              var sNowDate = this.stringify(new Date())
              var sDateName = ['今天', '明天', '后天']
              switch (true) {
                case v === sNowDate:
                  iDiff = 0
                  break
                case v === this.siblings(sNowDate, 1):
                  iDiff = 1
                  break
                case v === this.siblings(sNowDate, 2):
                  iDiff = 2
                  break
              }
              !this._dateMap && this.isHoliday && (this._dateMap = this._createDateMap())
              return (this._dateMap && this._dateMap[v]) || sDateName[iDiff]
            },
            _createDateMap () {
              var oTmp = {}
              for (var propety in this.HOLIDAYS) {
                var curHoliday = this.HOLIDAYS[propety]
                for (var i = 0; i < curHoliday.length; i++) {
                  var sDate = curHoliday[i]
                  var sName = this.DATENAME[propety]
                  oTmp[sDate] = sName
                }
              }
              return oTmp
            },
            isDate (v) {
              if (v instanceof Date) {
                return true
              }
              return false
            },
            stringify (v) {
              if (!this.isDate(v)) return null
              return v.getFullYear() + '-' + this.filled(v.getMonth() * 1 + 1) + '-' + this.filled(v.getDate())
            },
            siblings (v, n) {
              var REG = /\d+/g
              v = v.match(REG)
              return this.stringify(new Date(v[0], v[1] - 1, v[2] * 1 + n * 1))
            },
            filled (v) {
              return String(v).replace(/^(\d)$/, '0$1')
            },

            //按日历上下月改变时，执行的方法
            changePane (year, month, pane) {
              var Today = new Date()
              var ty = parseInt(Today.getFullYear())
              var tm = parseInt(Today.getMonth())
              var td = parseInt(Today.getDate())
              var days = []
              for (var i = 0; i < pane; i++) {
                var date = new Date(year, month + i)
                var r = new lunar.calendar(date.getFullYear(), date.getMonth(), ty, tm, td)
                days = days.concat([].slice.call(r, 0))
              }
              for (var j = 0; j < days.length; j++) {
                days[j].date = this.stringify(new Date(days[j].sYear, days[j].sMonth - 1, days[j].sDay))
                days[j].content = this.foramtDay(days[j])
              }
              this.lurevents = days
                  // ajax data or ...
                  setTimeout(() => {
                     this.getEventContent(year, month, pane)
                    console.log(this.events)
                }, 200)
            },

            //农历代码
            foramtDay (el) {
              /* eslint-disable */
              var S = "",
                  J, I;
              if (el.lDay == 1) {
                  S = "<b>" + (el.isLeap ? "\u95f0" : "") + el.lMonth + "\u6708" + (lunar.monthDays(el.lYear, el.lMonth) == 29 ? "\u5c0f" : "\u5927") + "</b>";
              } else {
                  S = lunar.cDay(el.lDay);
              }
              I = el.lunarFestival;
              if (el.lMonth == "4" && I.indexOf("\u7aef\u5348\u8282") != -1) {
                  I = "";
                  el.lunarFestival = ""
              }
              if (I.length > 0) {
                  if (I.length > 7) {
                      // I = I.substr(0, 5) + "\u2026"
                      I = I.split(' ')[0]
                  }
                  I = I.fontcolor("#909090");
              } else {
                  // I = el.solarFestival;
                  // if (I.length > 0) {
                  //     J = (I.charCodeAt(0) > 0 && I.charCodeAt(0) < 128) ? 9 : 5;
                  //     if (I.length > J + 1) {
                  //         I = I.substr(0, J - 1) + "\u2026"
                  //     }
                  //     I = I.fontcolor("#909090");
                  // } else {
                  //     I = el.solarTerms;
                  //     if (I.length > 0) {
                  //         I = I.fontcolor("#ff7200") // 节日
                  //     }
                  // }
              }
              if (I.length > 0) {
                  S = I
              }
              return S;
            },
            getDayCount (year, month) {
              const dict = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
               if (month === 1) {
                    if ((year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)) {
                     return 29
                    }
               }
               return dict[month]
            },

            random (min, max) {
              if (max == null) {
                max = min
                min = 0
              }
              return min + Math.floor(Math.random() * (max - min + 1))
            },
            getEventContent (year, month, pane) {
             this.events=[]
              for (let p = 0; p < pane; p++) {
                let date = new Date(year, month + p)
                let monthCounts = this.getDayCount(date.getFullYear(), date.getMonth())
                for (let i = 1; i <= monthCounts; i++) {
                   date=this.stringify(new Date(year, month + p, i))
                   this.$http.post('/api/calendar/selectContents',{'tel': this.$store.state.tel,'date':date.replace(/-/g,'.')}).then((res)=>{
                      if(res.status==200){
                       
                        if(res.body['code']=='000') {
                       this.contents=res.body['result']
                      this.events.push({
                        //上面date只能显示最后一个月的最后一天，因为边循环边发请求，后面后来才处理数据，code为200的，就是当天，所以event中的date也可以通过返回数据设计。
                        date:this.contents[0]['date'],
                        content: this.contents,
                      })
                    }  
                  }
                })
                }
              }
            },
            getTodayContent(){
                   this.$http.post('/api/calendar/selectContents',{'tel': this.$store.state.tel,'date':this.stringify(new Date()).replace(/-/g,'.')}).then((res)=>{
                    if(res.body['code']=='000') {
                     this.contents=res.body['result']
                     this.events.push({
                      date:this.contents[0]['date'],
                      content: this.contents,
                    })
                     this.onedayContent=this.events[0]['content']

                   }else {
                       document.getElementsByClassName("nocontent")[0].textContent="今天还没写内容，点击去写内容"
                    }
                })
              }
            },
	};
</script>
<style scoped>
  .calendar{
   color:#3597D4;
  }
  h3{ 
    height: 50px;
    line-height: 50px;
  }
  .header div:nth-child(1){
   position: absolute;
   top: 12px;
   left: 3%;
   height: 30px;
  }
  .header div:nth-child(1) span:nth-child(2) {
   display: inline-block;
   font-size: 14px;
   height: 100%;
   vertical-align: middle;
  }
  .header .addmemorandum{
   position: absolute;
   top: 12px;
   right: 7%;
   /* height: 30px; */
  }
  .lurevent div{
    color: #E56700;
  }
  h4{
      text-align: left;
      margin-left: 10px;
      color: white;
    }
  .contentbox{
    margin: 10px;
    border-radius: 3px;
    background-color: white;
    padding: 8px;

  } 
  .contentbox .content{
    font-size: 16px;
    width: 70%;
    float: left;
    text-align: left;
     overflow: hidden;
    /* 弹性盒模型显示 */
    display: -webkit-box;
    /* 盒模型元素的排列方式 */
    -webkit-box-orient: vertical;
    /* 显示行数 */
    -webkit-line-clamp: 1;


  }
   .contentbox .time{
    height: 16px;
    line-height: 16px;
    font-size: 9px;
    float: right;

  }
  .nocontent{
    margin: 10px;
    border-radius: 3px;
    background-color: white;
    /* padding: 8px; */
    line-height: 40px;
  }


</style>
