import Vue from 'vue'
import Vuex from 'vuex'

import oneSite from './widgets/siteTree'
import tabTree from './widgets/widgetTree'
const htmlCon = window.htmlConfig

import {getConfig} from './mock/api'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    pid: 1000,
    configShow:false,
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
      console.log(widgets,arr)
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
      const widget = widgets.find(widget => widget.placeholder.type === widgetType);
      let styl={},other={};
      console.log(config)
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
      console.log(JSON.stringify(widgets))
    },
    delCurrDom ({site}, {section, oldIndex}) {
      store.commit('setConfig', { oldIndex: -1, currDom: {} })
      section.splice(oldIndex, 1)
      console.log(site)
    },
    setConfig (stat, {oldIndex, currDom}) {
      oldIndex >= 0 && (currDom.index = oldIndex)
      stat.currentConfig = null
      stat.currentConfig = {...currDom}
      store.commit('changeShow',true)
      console.log(stat.site)
    },
    setPageConfig(stat){
      stat.currentConfig = null
      stat.site.index='0'
      stat.currentConfig = stat.site;
      store.commit('changeShow',true)
    },
    changeShow(sta,val){
      sta.configShow=val
    },
    incrementGid (state) {
      ++state.pid
    }
  },
  actions: {
    async getSite ({ commit }, id) {
      const site = oneSite
      commit('assignState', { site })
      // commit('assignState', { currentPage: site.children[0] })
    },
    getDefaultConfig({commit},{section,widgetType,newIndex,model_id}){
      getConfig({model_id}).then(res=>{
        commit('addWidget',{section,widgetType,newIndex,config:res.data['props']})
      })
    }
  }
})

export default store
