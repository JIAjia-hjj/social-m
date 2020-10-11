import {request} from 'network/request'

//登录
export const login=(data)=> {
    return  request('POST','/api/user/login',data)
}
//判断是否
export const getIsRegister=(data)=>{
    return  request('POST','/api/user/isRegister',data)
}
//注册
export const register=(data)=>{
    return  request('POST','/api/user/addUser',data)
}
//上传照片
export const uploadImg=(data)=>{
    return  request('POST','/api/upload/uploadPhoto',data)
}
//获取照片
export const showPhotoimg=(data)=>{
    return  request('POST','/api/upload/showPhotoimg',data)
}

//获取个人信息
export const getUserInfo=(data)=>{
    return  request('POST','/api/mypage/getInfo',data)
}
//修改个人信息
export const modifyUserInfo=(data)=>{
    return  request('POST','/api/mypage/resiveProinfo',data)
}
// 提交内容
export const submitWriteContent=(data)=>{
    return  request('POST','/api/content/save',data)
}
//更新内容
export const updateWriteContent=(data)=>{
    return  request('POST','/api/content/updateSave',data)
}
//获取内容
export const getContentDetail=(data)=>{
    return  request('POST','/api/content/showDetail',data)
}