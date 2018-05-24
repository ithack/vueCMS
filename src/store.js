import Vue from 'vue'
import Vuex from 'vuex'
import Tree from './widgets/widgetTree'
import oneSite from './widgets/siteTree'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    pid: 1000,
    site: {},
    currentConfig: {
      width: '100'
    },
    widgets: Tree
  },

  mutations: {
    assignState (state, obj) {
      console.log('assignState')
      console.log(state, obj)
      Object.assign(state, obj)
    },
    sortWidget (state, { array, oldIndex, newIndex }) {
      let target = array[oldIndex]
      array.splice(oldIndex, 1)
      array.splice(newIndex, 0, target)
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
    setSite ({site}, obj) {
      console.log(site)
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
    setSite ({ commit }, newSite) {
      commit('assignState', { site: newSite })
      // commit('assignState', { currentPage: site.children[0] })
    }
  }
})

export default store
