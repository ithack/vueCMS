import Vue from 'vue'
import Vuex from 'vuex'
import Tree from './widgets/widgetTree'
import oneSite from './widgets/siteTree'
const htmlCon = window.htmlConfig
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    pid: 1000,
    htmlCon,
    site: {},
    currentConfig: {
      width: '100'
    },
    widgets: Tree
  },

  mutations: {
    assignState (state, obj) {
      Object.assign(state, obj)
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
      const widget = widgets.find(widget => widget.placeholder.type === widgetType)
      if (widgetType === 'the-section') {
        store.commit('incrementGid')
        section.splice(newIndex, 0, { ...widget.placeholder, config, id: pid })
        section[newIndex].children = []
        return false
      }
      if (widget) {
        store.commit('incrementGid')
        section.splice(newIndex, 0, { ...widget.placeholder, config, id: pid })
      }
      console.log(JSON.stringify(site))
    },
    delCurrDom ({site}, {section, oldIndex}) {
      store.commit('setConfig', { oldIndex: -1, currDom: {} })
      section.splice(oldIndex, 1)
      console.log(site)
    },
    setConfig (stat, {oldIndex, currDom}) {
      oldIndex >= 0 && (currDom.index = oldIndex)
      console.log(currDom)
      stat.currentConfig = null
      stat.currentConfig = currDom
    },
    incrementGid (state) {
      ++state.pid
    }
  },
  actions: {
    getSite ({ commit }, id) {
      const site = oneSite
      commit('assignState', { site })
      console.log(JSON.stringify(site))
      // commit('assignState', { currentPage: site.children[0] })
    },
  }
})

export default store
