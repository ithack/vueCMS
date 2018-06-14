<template>
  <div class="root" >
    <div id="loading">加载中……</div>
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
        <h3 class="left_title">
          <span v-show="leftHide">组件库</span>
          <i @click.stop="switchFn" class="icon iconfont icon-zhankai icon-white" :class="leftHide?'icon-shouqi':''"></i>
        </h3>
        <ul class="tab_nav" @click="tabClick">
          <li v-for="(tabItem,index) in tabTree" :class="tabIndex==index?'active':''">
            <i class="icon iconfont tabIcon" :class="tabItem.icon"></i>
            <p>{{tabItem.text}}</p>
          </li>
        </ul>
        <p class="list_length" v-show="leftHide" v-if="widgets.length">全部（{{widgets.length}}）</p>
        <draggable v-show="leftHide" :options="dragOptions" class="leftModel" :list="widgets">
          <p class="nolist" v-if="!widgets.length">暂无组件</p>
          <div v-else v-for="widget in widgets" class="widget-card" :type="widget.placeholder.type" :model_id="widget.model_id">
            <i class="icon iconfont" :class="widget.icon"></i>
            <p>{{widget.name}}</p>
          </div>
        </draggable>
      </div>
    </aside>
<<<<<<< HEAD
    <div id="view_main" v-if="!htmlCon.readOnly" @mouseover.capture="hoverFn($event)">
      <draggable element="main" class="view_box" :options="drogOptions" @add="onAdd" v-model="site.children" @choose.stop="onChoose">
         <render v-for="(child,index) in site.children" :key="index" :node="child"/>
      </draggable>
    </div>
    <render v-else v-for="child in site.children" id="view_main" :key="child.id" :node="child" :theme="site.config.color" />
=======
    <draggable v-if="!htmlCon.readOnly" element="main" :options="drogOptions" @add="onAdd" @sort.stop="onSort" @choose.stop="onChoose">
       <render v-for="(child, inx) in site.children" @updata='updata' :key="child.id" :node="child" :theme="site.config.color" />
    </draggable>
    <render v-else v-for="child in site.children" :key="child.id" :node="child" :theme="site.config.color" />
>>>>>>> c03a73d1c12f48518ba9bc100992843a4d63f611
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
import Render from './common/Render'
import Config from './common/configRight'
import tabTree from './widgets/widgetTree'
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
      leftHide: false,
      dragOptions: {
        group: {
          name: 'widgets',
          pull: 'clone',
          put:false,
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
        this.widgets=Object.assign({},val)
      },
      deep: true
    },
  },*/
  methods: {
    ...mapMutations(['addWidget', 'sortWidget', 'setConfig','setWidget', 'setPageConfig']),
    ...mapActions(['getSite','getDefaultConfig']),
    tabClick(e){
      let i=$(e.target).parent().index();
      console.log(this.tabTree[i])
      this.tabIndex=i
      this.setWidget(this.tabTree[i].list)
      this.leftHide=true;
    },
    switchFn(){
      this.leftHide?this.leftHide=false:this.leftHide=true;
    },
    onAdd ({ item, newIndex }) {
      const widgetType = item.getAttribute('type'),
            model_id=item.getAttribute('model_id');
      if(widgetType=='the-section'){
        this.getDefaultConfig({ section: this.site.children, widgetType, newIndex ,model_id})
      }
    },
    onSort ({oldIndex, newIndex, from, to}) {
      if(from === to) {
        this.sortWidget({array: this.site.children, oldIndex, newIndex})
        this.currentConfig.index=-1
      }
    },
    onChoose({oldIndex}){
      this.setConfig({oldIndex, currDom: this.site})
    },
    hoverFn(e){
      let self_el=$(e.target),
        name=self_el.attr('component-name');
      if(self_el.attr('id')!=='view_main'&&self_el.hasClass('component')){
        self_el.hover(function () {
          self_el.addClass('component_hover')
        },function () {
          self_el.removeClass('component_hover')
        })
      }

    }
  },
  mounted () {
    this.getSite();
  }
}
</script>

<style lang="less">
  html, body {
    height: 100%;background-color:#F8F8F8;
  }
.root {
  height: 100%;
  display: flex;
  align-items: stretch;
  #loading{position:absolute;z-index:99999;left:200px;top:100px;display:none;}
}
.component_hover{
  border:1px solid #5E9EF3;box-sizing: border-box;position: relative;
  &:before{
    content:attr(component-name);position:absolute;right:0;top:0;background-color:#5E9EF3;color:#fff;
  }
<<<<<<< HEAD
}
.icon-shouqi{
  transform: rotate(180deg);
}
.iconfont{
  font-size:18px;color:#666;
}
.icon-white{color:#fff;}
//left
aside {
  background-color:#fff;
  position:fixed;
  top:70px;left:0;overflow:hidden;
  max-width:280px;
  .left_title{
    color:#fff;
    background:#5E9EF3;
    display:flex;
    justify-content: space-between;
    padding:6px 8px;
    &>span{
      display: block;width: 80%;
    }
    &>i{
      text-align: center;flex: 1;
    }
  }
  .tab_nav{
    width:70px;text-align:center;border-right:1px solid #F0F0F0;float:left;padding-bottom:1000px;margin-bottom:-1000px;color:#666;
    li{
      padding:5px 0;
    }
    .active{
      background-color:#5E9EF3;color:#fff;
      .iconfont{color:#fff }
    }
    .tabIcon{
      font-size:24px;text-align:center;display:block;width:100%;padding:4px 0;
    }
  }
  .list_length{
    width:170px;float:left;display:inline-block;fonn-size:12px;color:#D3D3D3;line-height:16px;padding:6px 5px;box-sizing:border-box;
  }
  .leftModel{
    width:170px;overflow-y: scroll;display:flex;flex-wrap: wrap;justify-items: baseline;
  }
  & .widget-card {
    border-radius: 2px;
    width: 85px;margin:6px 0;
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
      margin-bottom: 5px;color:#666;
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
=======
  &>main {
    min-width:640px;
    margin:0 auto;
    padding: 0 20px;
  }
}
>>>>>>> c03a73d1c12f48518ba9bc100992843a4d63f611
  #config_right{
    position:fixed;top:70px;right:0;background-color:#fff;
  }
</style>
