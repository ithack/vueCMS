import 'babel-polyfill'
import Vue from 'vue'
import { Upload,MessageBox,Button,Input,Select,Option,Form,FormItem,Dialog,Row,Switch,Tree} from 'element-ui'
import {Toast} from 'mint-ui'
import Lazyload from 'vue-lazyload'
import App from './edit.vue'
import store from './store'
import axios from './server/http'
import 'element-ui/lib/theme-chalk/index.css'
import 'mint-ui/lib/style.css'
Vue.component(Button.name,Button);
Vue.component(Select.name,Select);
Vue.component(Option.name,Option);
Vue.component(Input.name,Input);
Vue.component(Row.name,Row);
Vue.component(Form.name,Form);
Vue.component(FormItem.name,FormItem);
Vue.component(Dialog.name,Dialog);
Vue.component(Upload.name, Upload)
Vue.component(Switch.name, Switch)
Vue.component(Tree.name, Tree)
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
// Vue.use(Scrollactive);
//懒加载配置
Vue.use(Lazyload, {
  error: '',
  loading: '',
})
// config配置项筛选器
app.$mount('#app')
