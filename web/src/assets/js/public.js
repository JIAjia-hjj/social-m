export function getTime(){
    var dt=new Date()
    var year=dt.getFullYear()
    var month=dt.getMonth()+1
    var date=dt.getDate()
    var week=dt.getDay()
    var hour=dt.getHours()
    var minute=dt.getMinutes()
    var second=dt.getSeconds()
    month=month>=10?month:'0'+month
    date=date>=10?date:'0'+date
    hour=hour>=10?hour:'0'+hour
    minute=minute>=10?minute:'0'+minute
    second=second>=10?second:'0'+second
    var week1=['日','一','二','三','四','五','六']
    var week2=week1[week]
    return {
               'date':year+'.'+month+'.'+date,
               'week':week2,
               'time':hour+':'+minute+':'+second
            }
  }
export function  showTime(date,time){
       let datetime=date+' '+time
       let dateBegin = new Date(datetime)//写内容的时间
       let dateEnd = new Date()//获取当前时间
       let dateDiff = dateEnd.getTime() - dateBegin.getTime()//时间差的毫秒数
       let hoursDiff=Math.floor(dateDiff / (3600 * 1000))//计算出相差小时数
       let minutesDiff=Math.floor(dateDiff/(1000*60))//计算相差分钟数
        if(hoursDiff>=24*360){
          //1年前
          let yearDiff= Math.floor(hoursDiff / (24 * 360))
          time=yearDiff+'年前'
        }else if (hoursDiff<24*360&&hoursDiff>=24*30) {
          //1-12月
           let monthDiff= Math.floor(hoursDiff / (24 * 30))
          time=monthDiff+'月前'
        }else if (hoursDiff<24*30&&hoursDiff>=24) {
          //1-30天
           let dayDiff = Math.floor(hoursDiff / 24)//计算出相差天数
           time=dayDiff+'天前'
        }
        else if (hoursDiff<24&&hoursDiff>=1) {
          //1-24小时以内
           time=hoursDiff+'小时前'
        }else if (hoursDiff<1&&minutesDiff>=1) {
          //1分钟-1小时以内
            time=minutesDiff+'分钟前'
        }else{
          //1分钟内
             time='刚刚'   
        }
        return time
      }
  
var getFormatCode=function(strValue){
  return strValue.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
}
  // export{getTime }
//    export default{
//  getTime: getTime,
//   showTime: showTime,
// };