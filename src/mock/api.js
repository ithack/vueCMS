import http from './http'
let api,NODE_ENV=process.env.NODE_ENV;
if(NODE_ENV =="development"){
  api={
    createObject:'https://easy-mock.com/mock/5b5ac6ca87a58d3c7572a60b/api/getConfig',//必用配置接口，可自己项目维护
    getPool:'',  //此接口往下都是保存预览等接口，可根据自己需求修改
    savePage:'/app/gui/ajaxSavePage',
    publish:'/app/gui/ajaxPublish',
    preview:'/app/gui/ajaxPreview'
  }
}else if(NODE_ENV =="prefat"){
  api={
    createObject:'https://easy-mock.com/mock/5b5ac6ca87a58d3c7572a60b/api/getConfig',
    getPool:'',  //池数据
    savePage:'/app/gui/ajaxSavePage',
    publish:'/app/gui/ajaxPublish',
    preview:'/app/gui/ajaxPreview'
  }
}else{
  api={
    createObject:'https://easy-mock.com/mock/5b5ac6ca87a58d3c7572a60b/api/getConfig', //根据模型id生成配置项
    getPool:'',//池数据
    savePage:'/app/gui/ajaxSavePage',
    publish:'/app/gui/ajaxPublish',
    preview:'/app/gui/ajaxPreview'
  }
}

let getConfig=function (params){//获取组件默认配置
    return http.get(api.createObject,params)
}
let poolList=function(params){
  return http.jsonp(api.getPool,params)
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
