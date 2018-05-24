<template>
  <div class="root">
    <aside>
      <div>
        <h3>模块</h3>
        <draggable :options="dragOptions" class="leftModel">
          <div :temid="widget.temId" v-for="widget in widgets" :key="widget.name" class="widget-card" :type="widget.placeholder.type">
            <i class="iconfont icon-lego"></i>
            <p>{{widget.name}}</p>
          </div>
        </draggable>
      </div>
    </aside>
    <draggable element="main" :options="drogOptions" @add="onAdd" @choose="onChoose">
       <render v-for="child in site.children" key="child.id" :node="child" :theme="site.config.color" />
    </draggable>
    <div id="config_right" v-if="">
      <Config></Config>
    </div>
  </div>
</template>

<script>
require('../assets/iconfont.css')
import { mapState, mapActions , mapMutations} from 'vuex'
import Draggable from 'vuedraggable'
import $ from 'jquery'
import axios from 'axios'
import Render from './common/Render'
import Config from './common/configRight'
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
    ...mapState(['site', 'currentConfig', 'widgets', 'configShow'])
  },
  methods: {
    ...mapMutations(['addWidget','setConfig']),
    ...mapActions(['getSite']),
    onAdd ({ item, newIndex }) {
      const widgetType = item.getAttribute('type'),
            temId=item.getAttribute('temid');
      axios.get("http://config.json").then(res => {
        item.parentElement.removeChild(item)
        if(widgetType=='the-section'){
          this.addWidget({ section: this.site.children, widgetType, newIndex ,config: res.data})
        }
      })
    },
    onChoose({oldIndex}){
      console.log(oldIndex)
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
  &>aside {
    width: 200px;
    border-right: 1px solid #ddd;

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
  &>main {
    flex-grow: 1;
    padding: 0 20px;
  }
}
</style>
