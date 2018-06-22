import Vue from 'vue'
import Vuex from 'vuex'

import oneSite from './widgets/siteTree'
import tabTree from './widgets/widgetTree'
const htmlCon = window.htmlConfig
//获取url 参数
function getQueryUrl(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return(false);
}
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
      store.commit('changeShow',false)
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
      console.log("addWidget")
      const widget = widgets.find(widget => widget.placeholder.type === widgetType);
      let styl={},other={};
      config&&(config.map(item=>{
        if(item.remark === 'css'){
          console.log(item.default_val)
          styl[item.name] = item.default_val
        }else{
          other[item.name] = item.default_val
        }
      }))
      section.splice(newIndex,1);
      if (widgetType === 'the-section') {
        store.commit('incrementGid')
        section.splice(newIndex, 0, { ...widget.placeholder, config,styl,other, id: pid,name:widget.name })
        section[newIndex].children = []
        return false
      }
      if (widget) {
        store.commit('incrementGid')
        section.splice(newIndex, 0, { ...widget.placeholder, config,styl,other, id: pid ,name:widget.name})
      }
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
      const site = window.config||oneSite
      commit('assignState', { site })
      // commit('assignState', { currentPage: site.children[0] })
    },
    getDefaultConfig({commit},{section,widgetType,newIndex,model_id}){
      console.log("aa")
      getConfig({"model_id":model_id}).then(res=>{
        commit('addWidget',{section,widgetType,newIndex,config:res.data['props']})
      })
    }
  }
})

export default store
