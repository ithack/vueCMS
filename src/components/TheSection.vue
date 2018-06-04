<template>
    <section class="section" :style="styl" >
      {{node.config}}<br>
      {{other.title}}
      <draggable style="min-height:100px" :options="dragOptions" v-model="node.children" @add="onAdd" @choose="onChoose">
        <slot></slot>
      </draggable>
    </section>
</template>

<script>
import $ from 'jquery'
import Draggable from 'vuedraggable'
import { mapMutations, mapState } from 'vuex'
import axios from 'axios'
require('./../mock/config')
export default {
  name: 'the-section',
  components: {
    Draggable
  },
  props: ['node', 'themeColor' , 'curr'],
  data () {
    return {
      msg: "aaa",
      dragOptions: {
        group: {
          name: 'widgets',
          pull: false,
          put: function(to,from){
            return $(from.el).attr('class')=='leftModel'
          }
        },
        sort: true
      },
    }
  },
  computed: {
    ...mapState(['site', 'currentConfig']),
    styl: function(){
      let styl={}
      this.node.config.map(item => {
        if(item.type === 'css'||item.type === 'color'){
          styl[item.style] = item.value
        }
      })
      return styl
    },
    other: function () {
      let other={}
      this.node.config.map(item => {
        if(item.type !== 'css'&&item.type !== 'color'){
          other[item.key] = item.value
        }
      })
      return other
    }

  },
  created(){

  },
  /*watch: {
    'site' : {
      handler: function (val, oldVal) {
        var that=this
        console.log('sectionUp')
        that.$forceUpdate()
      },
      deep: true
    },
  },*/
  mounted(){
  },
  methods: {
    ...mapMutations(['sortWidget', 'addWidget', 'setConfig', 'delCurrDom']),
    onChoose({oldIndex}){
      console.log(this.node,this.site)
      this.setConfig({currDom:this.node, oldIndex})
    },
    onAdd ({ item, newIndex }) {
      const widgetType = item.getAttribute('type'),
            temId=item.getAttribute('temid');
      item.parentElement.removeChild(item)
      axios.get("http://config.json").then(res => {
        this.addWidget({ section: this.node.children, widgetType, newIndex ,config: res.data})
      })
    }
  }
}
</script>

<style scoped>
  .section {
   margin:4px 0;background-color:darkgray;
  }
</style>
