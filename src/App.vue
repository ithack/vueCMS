<template>
  <div class="root">
    <aside v-if="!htmlCon.readOnly">
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
    <draggable v-if="!htmlCon.readOnly" element="main" :options="drogOptions" @add="onAdd" @sort.stop="onSort" @choose.stop="onChoose">
       <render v-for="child in site.children" :key="child.id" :node="child" :theme="site.config.color" />
    </draggable>
    <render v-else v-for="child in site.children" :key="child.id" :node="child" :theme="site.config.color" />
    <div id="config_right" v-if="!htmlCon.readOnly">
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
    ...mapState(['site', 'currentConfig', 'widgets', 'htmlCon'])
  },
  /*watch: {
    'site' : {
      handler: function (val, oldVal) {
        console.log("appUpdate")
        this.$forceUpdate()
      },
      deep: true
    },
  },*/
  methods: {
    ...mapMutations(['addWidget', 'sortWidget', 'setConfig']),
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
  &>aside {
    width: 200px;
    border-right: 1px solid #ddd;
    position:fixed;
   top:0;left:0;
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
    min-width:640px;
    margin:0 auto;
    padding: 0 20px;
  }
}
  #config_right{
    position:fixed;top:0;right:0;
  }
</style>
