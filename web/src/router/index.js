import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Login=()=>import('../views/login-register/login.vue');
const Register=()=>import('../views/login-register/register.vue');
const ForgetPassword=()=>import('../views/login-register/forgetPassword.vue');
const Index=()=>import('../views/functionalPages/index.vue');
const Search=()=>import('../views/functionalPages/search.vue');
const EmotionContent=()=>import('../views/community/emotionContent.vue');
const Community=()=>import('../views/community/community.vue');
const Mypage=()=>import('../views/mypage/mypage.vue');
const Write=()=>import('../views/content/write.vue');
const DetailedContent=()=>import('../views/content/detailedContent.vue');
const Calendar=()=>import('../views/calendar/calendar.vue');
const Memo=()=>import('../views/calendar/memo.vue');
const OtherDetailedContent=()=>import('../views/community/otherDetailedContent.vue');
const Proinfo=()=>import('../views/mypage/proinfo.vue');
const Backups=()=>import('../views/mypage/backups.vue');
const AdminIndex=()=>import('../views/Admin/adminindex.vue');
const Users=()=>import('../views/Admin/users.vue');
const AllContents=()=>import('../views/Admin/allcontents.vue');
const UsersContents=()=>import('../views/Admin/userscontents.vue');
const ReportContent=()=>import('../views/Admin/reportcontent.vue');

const routes=[
  {
    // 登录
    path: "/",
    name: "login",
    component:Login
  },
  {//注册
    path: "/register",
    name: "register",
    component:Register
  },
  {//忘记密码
    path:"/forgetPassword",
    name:"forgetPassword",
    component:ForgetPassword
  },
  {//首页
    path:"/index",
    name:"index",
    component:Index
  },
  {
    path:"/search",
    name:"search",
    component:Search
  },
  {
    path:"/emotionContent",
    name:"emotionContent",
    component:EmotionContent
  },
  {//社区--情绪
    path:"/community",
    name:"community",
    component:Community
  },
  {//
    path:"/otherContents",
    name:"otherContents",
    component:()=>
        import( "../views/community/otherContents.vue")
  },
  {//我的
    path:"/mypage",
    name:"mypage",
    component:Mypage
  },
  {//写
    path:"/write",
    name:"write",
    component:Write
  },
  {
    //具体内容
    path:"/detailedContent",
    name:"detailedContent",
    component:DetailedContent
  },
  {//日历
    path:"/calendar",
    name:"calendar",
    component:Calendar
  },
  {//日历备忘录
    path:"/memo",
    name:"memo",
    component:Memo
  },
  {//社区具体内容
    path:"/otherDetailedContent",
    name:"otherDetailedContent",
    component:OtherDetailedContent
  },
  { // 编辑个人资料
    path:"/proinfo",
    name:"proinfo",
    component:Proinfo
  },
  {//备份
    path:"/backups",
    name:"backups",
    component:Backups
  },
  {//管理员界面
    path:"/adminindex",
    name:"adminindex",
    component:AdminIndex
  },
  {//所有用户
    path:"/users",
    name:"users",
    component:Users
  },
  {//所有内容
    path:"/allcontents",
    name:"allcontents",
    component:AllContents
  },
  {//用户的详细内容
    path:"/userscontents",
    name:"userscontents",
    component:UsersContents
  },
  {//被举报的内容
    path:"/reportcontent",
    name:"reportcontent",
    component:ReportContent
  },

];

const index = new VueRouter({
  routes,
  mode: "history",
  base: process.env.BASE_URL,

});

export default index;