import http from './http'
let api,NODE_ENV=process.env.NODE_ENV;
if(NODE_ENV =="development"){
  api={
    createObject:'//ithack.github.io/app/gui/ajaxGetMetaProps',
    getPool:'//ithack.github.io/data/commodity/ajaxGetAll',
    savePage:'//ithack.github.io/app/gui/ajaxSavePage',
    publish:'//ithack.github.io/app/gui/ajaxPublish',
    preview:'//ithack.github.io/app/gui/ajaxPreview'
  }
}else{
  api={
    createObject:'/app/gui/ajaxGetMetaProps', //根据模型id生成配置项
    getPool:'/data/commodity/ajaxGetAll', //数据ID渲染到html结构中
    savePage:'/app/gui/ajaxSavePage',
    publish:'/app/gui/ajaxPublish',
    preview:'/app/gui/ajaxPreview'
  }
}

let getConfig=function (params){//获取组件默认配置
    return http.oGet(api.createObject,params)
}
let poolList=function(params){
  return http.oGet(api.getPool,params)
}
let savePage=function(params){
  return http.post(api.savePage,params)
}
let publish=function(params){
  return http.post(api.publish,params)
}
let preview=function(params){
  return http.post(api.preview,params)
}
export {
  getConfig,
  poolList,
  savePage,
  publish,
  preview
}
