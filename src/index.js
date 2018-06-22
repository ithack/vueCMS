import 'babel-polyfill'
import Vue from 'vue'
import { Upload,Message } from 'element-ui';
import { Lazyload } from 'mint-ui';
import App from './App.vue'
import store from './store'
import axios from './mock/http'
import 'element-ui/lib/theme-chalk/index.css';
import 'mint-ui/lib/style.css'
Vue.component(Upload.name, Upload);
Vue.component(Message.name, Message);
const app = new Vue({
  store,
  render: h => h(App)
})
Vue.prototype.$http=axios;
Vue.use(Upload)
Vue.use(Lazyload);
// config配置项筛选器

app.$mount('#app')
