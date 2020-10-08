import {request} from 'network/request'

//登录
export function submitLogin(data) {
  return  request({
    method:'post',
    url:'/api/user/login',
    data:data
  })
}