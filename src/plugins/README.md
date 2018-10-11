**plugins 插件文件**

创建一些关于toast等公用性较强的插件到vue实例用，目前所有类似功能全部用elemetUI或mintUi，暂时没有用到此文件；

toast用法：
```$xslt
//入口文件引入toast
import Toast from './plugins/toast.js';
import Vue from 'vue'

Vue.use(Toast)

//组件中直接调用
this.$toast('toast测试内容')

```
