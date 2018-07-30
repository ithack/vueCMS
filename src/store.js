import Vue from 'vue'
import Vuex from 'vuex'

import oneSite from './widgets/siteTree'
import tabTree from './widgets/widgetTree'
const htmlCon = window.htmlConfig
import { getQueryUrl } from '~/widgets/util'
import {getConfig} from './mock/api'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    pid: 1000,
    configShow:false,
    page_id: getQueryUrl('page_id'),
    htmlCon,
    currentConfig:null,
    site: oneSite,
    tabTree:tabTree,
    widgets: []
  },

  mutations: {
    assignState (state, obj) {
      Object.assign(state, obj)
    },
    setWidget({widgets},arr){
      // widgets.length=0;
      widgets.splice(0,widgets.length)
      arr.map(item=>{widgets.push(item)});
    },
    sortWidget (state, { array, oldIndex, newIndex }) {
      console.log("storeSort")
      let target = array[oldIndex]
      array.splice(oldIndex, 1)
      array.splice(newIndex, 0, target)
    },
    copyWidget (state,{array, oldIndex, newIndex}){
      console.log("copyEl")
      store.commit('incrementGid')
      //let el=array[oldIndex]  浅拷贝有问题
      let el= JSON.parse(JSON.stringify(array[oldIndex]));
      el.id=state.pid
      array.splice(-1,0,el)
    },
    addWidget ({widgets, pid, site}, { section, widgetType, newIndex, config }) {
      console.log("addWidget:"+newIndex);

      const widget = widgets.find(widget => widget.placeholder.type === widgetType);
      let styl={},other={};
      config&&(config.map(item=>{
        if(item.remark === 'css'){
          styl[item.name] = item.default_val
        }else{
          other[item.name] = item.default_val
        }
      }))
      store.commit('incrementGid')
      let obj={ ...widget.placeholder, config,styl,other, id: pid ,name:widget.name}
      // section.splice(newIndex,1);
      if (widgetType === 'the-section') {
        section.splice(newIndex, 0, obj)
        section[newIndex].children = []
        return false
      }
      section.splice(newIndex, 0,obj);
      /*setTimeout(()=>{
        console.log(newIndex,obj,section[newIndex])
      },1000);*/
      //暂时解决异步组件后连续拖拽两个相同组件出现的bug，原因待找
      console.log(JSON.stringify(site))
    },
    delCurrDom ({site}, {section, oldIndex}) {
      store.commit('setConfig', { oldIndex: -1, currDom: {} })
      section.splice(oldIndex, 1)
      store.commit('changeShow',false)
    },
    setConfig (stat, {oldIndex, currDom}) {
      console.log("setConfig")
      oldIndex >= 0 && (currDom.index = oldIndex)
      stat.currentConfig = null
      stat.currentConfig = {...currDom}
      store.commit('changeShow',true)
      console.log(stat.site)
    },
    changeShow(sta,val){
      console.log("show")
      sta.configShow=val
    },
    incrementGid (state) {
      ++state.pid
    }
  },
  actions: {
    async getSite ({ commit }, id) {
      const site =await window.config&&window.config.type?window.config:oneSite
      commit('assignState', { site })
      // commit('assignState', { currentPage: site.children[0] })
    },
    getDefaultConfig({commit},{section,widgetType,newIndex,model_id}){
      getConfig({"model_id":model_id}).then(res=>{
        commit('addWidget',{section,widgetType,newIndex,config:res.data['props']})
      }).catch(err=>{
        let config={
          "code": 0,
          "msg": "succ",
          "data": {
            "id": 2,
            "name": "楼层模型",
            "type_id": 1,
            "props": [{
              "id": 10,
              "title": "楼层ID",
              "name": "pool_id",
              "remark": "",
              "val_type": 1,
              "ui_type": 1,
              "is_must": 1,
              "options": [],
              "default_val": "2"
            }, {
              "id": 8,
              "title": "外边距",
              "name": "margin",
              "remark": "css",
              "val_type": 1,
              "ui_type": 1,
              "is_must": 1,
              "options": [],
              "default_val": "0 0 10px 0"
            }, {
              "id": 103,
              "title": "内间距",
              "name": "padding",
              "remark": "css",
              "val_type": 1,
              "ui_type": 1,
              "is_must": 0,
              "options": [],
              "default_val": "0 0 0 0"
            }, {
              "id": 9,
              "title": "背景色",
              "name": "backgroundColor",
              "remark": "css",
              "val_type": 1,
              "ui_type": 6,
              "is_must": 1,
              "options": [],
              "default_val": "#ccc"
            }, {
              "id": 59,
              "title": "背景图",
              "name": "backgroundImage",
              "remark": "css",
              "val_type": 1,
              "ui_type": 7,
              "is_must": 0,
              "options": [],
              "default_val": ""
            }]
          }
        }
        commit('addWidget',{section,widgetType,newIndex,config:config.data['props']})
      })
    }
  }
})

export default store
