<template>
  <div class="root" :style="!htmlCon.readOnly&&({backgroundColor:'#f8f8f8'})">
    <div id="loading" class="laoding">
      <div class="jd-load"><img src="//st.360buyimg.com/m/images/index/loading.gif">加载中……</div>
    </div>
    <Top v-if="!htmlCon.readOnly"></Top>
    <left-model v-if="!htmlCon.readOnly"></left-model>
    <div id="view_main" v-if="!htmlCon.readOnly" @click.stop="stopClick" @mouseover.capture="hoverFn($event)">
      <draggable element="main" class="view_box" :options="drogOptions" @add="onAdd" v-model="site.children" @choose.self="onChoose">
         <render v-for="(child,index) in site.children" :key="index" :node="child" :type="'edit'"/>
      </draggable>
    </div>
    <div class="view_box" v-else>
      <render v-for="child in site.children" :key="child.id" :node="child" :type="'edit'" />
    </div>
    <Config v-if="!htmlCon.readOnly"></Config>
  </div>
</template>

<script>
import './assets/less/rest.less'

import { mapState, mapActions , mapMutations} from 'vuex'
import Draggable from 'vuedraggable'
import Render from './layout/Render'
import Config from './layout/configRight'
import Top from './layout/top'
import leftModel from '~/layout/leftModel'
if(!htmlConfig.readOnly){
  $("html").css('backgroundColor','#f8f8f8')
}
export default {
  name: 'app',
  components: {
    Render,
    Draggable,
    Config,
    Top,
    leftModel
  },
  data () {
    return {
      tabIndex:0,
      leftHide: false,
      drogOptions:{
        group: {
          name: 'widgets',
        }
      }
    }
  },
  computed: {
    ...mapState(['site', 'currentConfig', 'htmlCon','page_id']),
  },
  methods: {
    ...mapMutations(['addWidget', 'sortWidget', 'setConfig','setWidget']),
    ...mapActions(['getSite','getDefaultConfig']),
    stopClick(){
      console.log("stop")
    },
    onAdd ({ item, newIndex }) {
      const widgetType = item.getAttribute('type'),
            model_id=item.getAttribute('model_id');
      if(widgetType=='the-section'){
        this.getDefaultConfig({ section: this.site.children, widgetType, newIndex ,model_id})
      }else{

        this.site.children.splice(newIndex,1);
        //this.$alert("组件请拖拽至楼层组件内")
        return false;
      }
    },
    onSort ({oldIndex, newIndex, from, to}) {
      console.log("onSort")
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
      if(self_el.attr('id')!=='view_main'){
        $('.component').on("mouseover",function(){$(this).addClass('component_hover')})
        $('.component').on("mouseout",function(){$(this).removeClass('component_hover')})

      }

    }
  },
  mounted () {
    this.getSite();
  }
}
</script>

<style lang="less">
.root {
  .laoding {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index:9999;
    font-size:14px;
    color: #686868;
    display:none;
    text-align: center;
    .jd-load {
      position: relative;
      top: 40%
    }
    .jd-load img {
      display: block;
      margin: 5px auto
    }
  }
}
.component_hover{
  border:1px solid #5E9EF3;position: relative;
  &:before{
    content:attr(component-name);position:absolute;right:0;top:0;background-color:#5E9EF3;color:#fff;height:24px;line-height:24px;
  }
}
.icon-shouqi{
  transform: rotate(180deg);
}
.iconfont{
  font-size:18px;color:#666;
}
.icon-white{color:#fff;}

// main
#view_main{
  background:url('./assets/img/main_bg.png') no-repeat;width:364px;height:720px;margin:0 auto;background-size:contain;position:relative;top:70px;
  .view_box{
    background-color:#F8F8F8;width:79%;height:72%;-webkit-transform: translate(13%,17%);border:1px solid #ccc;border-radius:5px;
    overflow-y:auto;
  }
}

</style>
