<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@import "assets/css/base.css";
@import "assets/iconfont/iconfont.css";
body{
  /*background-color:#3597D4;*/
}
*{
  padding: 0;
  margin: 0;
  border:0;
}
/*a {*/
 /*text-decoration: none;*/
 /*color: #3597D4;*/
/*}*/
ul li{
  list-style: none;
}
h3{ 
  height: 50px;
  line-height: 50px;
  color: #3597D4;
}
.fixed{
  position:fixed;
}
.header{
  width: 100%;
  height: 50px;
  top: 0;left: 0;
  background-color: #f1f1f1;
}
.body{
    position: absolute;
    left: 0;
    bottom:50px;
    top: 50px; 
    right: 0;
    background-color: #3597D4;
    /* background-color: yellow; */
    overflow: auto;
  }
  .footer{
  width: 100%;
  height: 50px;
  bottom: 0;
  left: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
@font-face {
  font-family: 'iconfont';  /* project id 821703 */
  src: url('//at.alicdn.com/t/font_821703_myjtz0blauo.eot');
  src: url('//at.alicdn.com/t/font_821703_myjtz0blauo.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_821703_myjtz0blauo.woff') format('woff'),
  url('//at.alicdn.com/t/font_821703_myjtz0blauo.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_821703_myjtz0blauo.svg#iconfont') format('svg');
}
.iconfont{
  font-family:"iconfont" !important;
  font-size:25px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  color: #3597D4;
}

.clearfix:after{
  display: block;
  content: "";
  clear: both;
  height: 0;
  visibility: hidden;

}
.clearfix{
  *zoom: 1;
}
</style>
