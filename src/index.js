import 'babel-polyfill'
import Vue from 'vue'
import { Upload,MessageBox } from 'element-ui'
import {Toast} from 'mint-ui'
import Lazyload from 'vue-lazyload'
import App from './App.vue'
import store from './store'
import axios from './mock/http'
import 'element-ui/lib/theme-chalk/index.css'
import 'mint-ui/lib/style.css'
import {getHtmlDocName} from '~/widgets/util'
Vue.component(Upload.name, Upload)
Vue.component(MessageBox.name, MessageBox)
const app = new Vue({
  store,
  render: h => h(App)
})
Vue.prototype.$http=axios
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$toast = Toast
Vue.use(Upload)
//懒加载配置
Vue.use(Lazyload, {
  error: '',
  loading: '',
})
app.$mount('#app')
