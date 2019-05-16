import http from "./http";
let NODE_ENV = process.env.NODE_ENV;
// 其他接口请修改此配置
let host_api = NODE_ENV !== "production" ? "//cms.kevin.com" : "";

let api = {
  // createObject: "//easy-mock.com/mock/5b5ac6ca87a58d3c7572a60b/api/getConfig", // 根据模型id生成配置项
  // getPool: "//easy-mock.com/mock/5b5ac6ca87a58d3c7572a60b/api/getpool", // 池数据
  createObject: "/api/getConfig", // 根据模型id生成配置项
  getPool: "/api/getpool",
  savePage: host_api + "/app/gui/ajaxSavePage", // 保存草稿
  publish: host_api + "/app/gui/ajaxPublish", // 发布
  preview: host_api + "/app/gui/ajaxPreview", // 预览
  getCategory: host_api + "/common/cate/getCatesByFid", // 获取分类列表
  createTem: host_api + "/app/pagetemplate/create", // 创建页面模板
  getTemType: host_api + "/app/pagetemplate/getType", // 获取模板品类列表
  getAllList: host_api + "/app/pagetemplate/getAll", // 页面模板列表
  modelUse: host_api + "/app/pagetemplate/choose", // 使用模版
  modelDel: host_api + "/app/pagetemplate/delete" // 删除模版
};

/**
 * 获取组件默认配置
 * @param params
 * @returns {*}
 */
export const getConfig = params => {
  return http.oGet(api.createObject, params);
};
/**
 * 获取池数据
 * @param params
 */
export const poolList = params => {
  return http.jsonp(api.getPool, params);
};
/**
 * 保存草稿
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const savePage = params => {
  return http.post(api.savePage, params);
};
/**
 * 发布页面
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const publish = params => {
  return http.post(api.publish, params);
};
/**
 * 预览
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const preview = params => {
  return http.post(api.preview, params);
};
/**
 * 获取类目
 * @param params
 */
export const getCategory = params => {
  return http.oGet(api.getCategory, params);
};
/**
 * 创建模版
 * @param params
 */
export const createTem = params => {
  return http.post(api.createTem, params);
};
/**
 * 获取类型
 * @param params
 */
export const getTemType = params => {
  return http.oGet(api.getTemType, params);
};
/**
 * 页面模版列表
 * @param params
 */
export const getAllList = params => {
  return http.oGet(api.getAllList, params);
};
/**
 * 使用模版
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const modelUse = params => {
  return http.post(api.modelUse, params);
};
export const modelDel = params => {
  return http.post(api.modelDel, params);
};
