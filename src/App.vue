<template>
  <div class="root">
    <header v-if="!htmlCon.readOnly">
      <a href="" class="header_but">返回</a>
      <p class="header_right">
        <a href="" class="header_but">预览</a>
        <a href="" class="header_but">存为模版</a>
        <a href="" class="header_but but_blue">保存草稿</a>
        <a href="" class="header_but but_blue">提交发布</a>
      </p>
    </header>
    <aside v-if="!htmlCon.readOnly">
      <div>
        <h3 class="left_title"><span>组件库</span><i class="icon iconfont icon-zhankai icon-white"></i></h3>
        <ul class="tab_nav" @click="tabClick">
          <li v-for="tabItem in tabTree"><i class="icon iconfont tabIcon" :class="tabItem.icon"></i><p>{{tabItem.text}}</p></li>
        </ul>
        <draggable :options="dragOptions" class="leftModel" v-model="widgets">
          <div :temid="widget.temId" v-for="widget in widgets" :key="widget.id" class="widget-card" :type="widget.placeholder.type">
            <i class="icon iconfont" :class="widget.icon"></i>
            <p>{{widget.name}}</p>
          </div>
        </draggable>
      </div>
    </aside>
    <div id="view_main" v-if="!htmlCon.readOnly" >
      <draggable element="main" class="view_box" :options="drogOptions" @add="onAdd" v-model="site.children" @choose.stop="onChoose">
         <render v-for="child in site.children" :key="child.id" :node="child" :theme="site.config.color" />
      </draggable>
    </div>
    <render v-else v-for="child in site.children" id="view_main" :key="child.id" :node="child" :theme="site.config.color" />
    <div id="config_right" v-if="!htmlCon.readOnly">
      <Config></Config>
    </div>
  </div>
</template>

<script>

import './assets/less/rest.less'
import './assets/less/header.less'
import { mapState, mapActions , mapMutations} from 'vuex'
import Draggable from 'vuedraggable'
import $ from 'jquery'
import axios from 'axios'
import Render from './common/Render'
import Config from './common/configRight'
import tabTree from './widgets/widgetTree'
require('./mock/config')
export default {
  name: 'app',
  components: {
    Render,
    Draggable,
    Config
  },
  data () {
    return {
      tabIndex:0,
      dragOptions: {
        group: {
          name: 'widgets',
          pull: 'clone',
          put: false
        },
        sort: false
      },
      drogOptions:{
        group: {
          name: 'widgets',
        }
      }
    }
  },
  computed: {
    ...mapState(['site', 'currentConfig', 'tabTree','widgets', 'htmlCon']),
  },
  /*watch: {
    'widgets' : {
      handler: function (val, oldVal) {
        this.$forceUpdate()
      },
      deep: true
    },
  },*/
  methods: {
    ...mapMutations(['addWidget', 'sortWidget', 'setConfig','setWidget']),
    ...mapActions(['getSite']),
    tabClick(e){
      let i=$(e.target).parent().index();
      console.log(this.tabTree[i])
      this.tabIndex=i
      this.setWidget(this.tabTree[i].list)
    },
    onAdd ({ item, newIndex }) {
      const widgetType = item.getAttribute('type'),
            temId=item.getAttribute('temid');
      console.log(widgetType)
      axios.get("http://config.json").then(res => {
        item.parentElement.removeChild(item)
        if(widgetType=='the-section'){
          this.addWidget({ section: this.site.children, widgetType, newIndex ,config: res.data})
        }
      })
    },
    onSort ({oldIndex, newIndex, from, to}) {
      if(from === to) {
        this.sortWidget({array: this.site.children, oldIndex, newIndex})
        this.currentConfig.index=-1
      }
    },
    onChoose({oldIndex}){
      this.setConfig({oldIndex, currDom: this.site})
    }
  },
  mounted () {
    this.getSite()
  }
}
</script>

<style lang="less">
  html, body {
    height: 100%;
  }
.root {
  height: 100%;
  display: flex;
  align-items: stretch;

}
//left
aside {
  width: 200px;
  border-right: 1px solid #ddd;
  position:fixed;
  top:70px;left:0;
  .iconfont{
    font-size:18px;color:#666;
  }
  .icon-white{color:#fff;}
  .left_title{
    color:#fff;
    background:#5E9EF3;
    display:flex;
    justify-content: space-between;
    padding:6px 8px;
  }
  .tab_nav{
    width:70px;text-align:center;border-right:1px solid #F0F0F0;float:left;
    li{
      padding:5px 0;
    }
    .tabIcon{
      font-size:24px;text-align:center;color:#666;display:block;width:100%;padding:4px 0;
    }
  }
  .leftModel{
    width:120px;height:40px;float:right;overflow-y: scroll;min-height: 500px;
  }
  & .widget-card {
    border: 1px solid;
    border-radius: 2px;
    width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: move;

    &>i {
      display: block;
      font-size: 2em;
    }
    &>p {
      margin-top: 5px;
      margin-bottom: 5px;
    }
  }
}
// main
#view_main{
  background:url('./assets/img/main_bg.png') no-repeat;width:364px;height:720px;margin:0 auto;background-size:contain;position:relative;top:70px;
  .view_box{
    background-color:#F8F8F8;width:79%;height:72%;-webkit-transform: translate(13%,17%);border:1px solid #ccc;border-radius:5px;
    overflow-y:scroll;
  }
}
  #config_right{
    position:fixed;top:70px;right:0;
  }
</style>
