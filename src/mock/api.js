import http from './http'
let api,NODE_ENV=process.env.NODE_ENV;
if(NODE_ENV==="development"){
  api={
    createObject:'http://app-center.jd.com/app/gui/ajaxGetMetaProps?format=jsonp',
    getPool:'http://app-center.jd.com/data/commodity/ajaxGetAll?format=jsonp',
  }
}else{
  api={
    createObject:'/gui/ajaxGetMetaProps', //根据模型id生成配置项
    getPool:'/data/commodity/ajaxGetAll'
  }
}

let getConfig=function (params){//获取组件默认配置
    return http.oGet(api.createObject,params)
}
let poolList=function(params){
  return http.oGet(api.getPool,params)
}

export {
  getConfig,
  poolList,
}
