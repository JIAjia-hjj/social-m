import axios from 'axios'
import Qs from 'qs'
export  function request(config) {
   const instance=axios.create({
     headers:{'Content-Type': 'application/x-www-form-urlencoded'},
     // baseURL:'http://127.0.0.1:3000/',
     timeout:50000,
     transformRequest: [function (data) {
       data = Qs.stringify(data);
       return data;
     }],

   });
   instance.interceptors.request.use(config=>{
     return config
   },error => {
     console.log(error);
   });

   instance.interceptors.response.use(res=>{
     return res.data
   },error=>{
     console.log(error)
   });
  return instance(config)
}


axios.jsonp = (url,data)=>{
  if(!url)
    throw new Error('url is necessary');
  const callback = 'CALLBACK' + Math.random().toString().substr(9,18);
  const JSONP = document.createElement('script');
  JSONP.setAttribute('type','text/javascript');
  const headEle = document.getElementsByTagName('head')[0];
  let ret = '';
  if(data){
    if(typeof data === 'string')
      ret = '&' + data;
    else if(typeof data === 'object') {
      for(let key in data)
        ret += '&' + key + '=' + encodeURIComponent(data[key]);
    }
    ret += '&_time=' + Date.now();
  }
  JSONP.src = `${url}?callback=${callback}${ret}`;
  return new Promise( (resolve,reject) => {
    window[callback] = r => {
      resolve(r)
      headEle.removeChild(JSONP)
      delete window[callback]
    }
    headEle.appendChild(JSONP)
  })

};
export  function requestJsonp(url,data) {
  console.log(url);

  if(!url) {
    console.error('Axios.JSONP 至少需要一个url参数!');
    return;
  }
  url='http://api.xxfgo_dev.com/'+url;
  const callback ='Callback'+ Math.random().toString().substr(9,18);
  const JSONP = document.createElement('script');
  JSONP.setAttribute('type','text/javascript');
  const headEle = document.getElementsByTagName('head')[0];
  console.log(headEle );
  let ret = '';
  if(data){
    if(typeof data === 'string')
      ret = '&' + data;
    else if(typeof data === 'object') {
      for(let key in data)
        ret += '&' + key + '=' + encodeURIComponent(data[key]);
    }
    ret += '&_time=' + Date.now();
  }
  JSONP.src = `${url}?callback=${callback}${ret}`;
  return new Promise( (resolve,reject) => {
    window[callback] = r => {
      resolve(r);
      headEle.removeChild(JSONP);
      delete window[callback]
    };
    headEle.appendChild(JSONP)
  })
}
