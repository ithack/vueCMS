import 'babel-polyfill'
import Vue from 'vue'
import {Toast} from 'mint-ui'
import Lazyload from 'vue-lazyload'
import App from './view.vue'
import store from './store'
import axios from './server/http'
import 'mint-ui/lib/style.css'
import {getHtmlDocName,getQueryUrl} from '~/widgets/util'
// import Scrollactive from 'vue-scrollactive'
const app = new Vue({
  store,
  render: h => h(App)
})
Vue.prototype.$http=axios
Vue.prototype.$toast = Toast
// Vue.use(Scrollactive);
//懒加载配置
Vue.use(Lazyload, {
  error: '',
  loading: '',
})
// config配置项筛选器
// 埋点
Vue.directive('$log', {
  inserted: function (el, binding,vnode){
    var getUrlId=getHtmlDocName().split('-');
    $(el).attr('taglog',vnode.data.directives[0].value)
    el.addEventListener('click', () => {
      let floorEl=$(el).closest('.floor'),
          floorId=floorEl.attr('floorid'),
          floorName=floorEl.attr('floor-index'),
          // appid=getUrlId[0]?getUrlId[0]:'0',
          // pageid=getUrlId[1]?getUrlId[1]:'0',
          // 预览页埋点方法
          appid=getQueryUrl('app_id')||'0',
          pageid=getQueryUrl('page_id')||0,
          logString=appid+'|'+pageid+'|'+floorId+'|'+$(el).attr('taglog');
      logString=Math.floor(Math.random()*2+1)+'|'+appid+'|'+pageid+'|'+floorId+'|楼层'+floorName+'|'+$(el).attr('taglog');
      console.log('拼接后入参：'+logString)
      log('esite', 'esite_h5',logString)

    })
  }
})
app.$mount('#app')
