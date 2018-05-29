<template>
    <section class="section" :style="styl" >
      {{node.config}}
      <draggable style="min-height:100px" :options="dragOptions" @sort="onSort"  @add="onAdd" @choose="onChoose" @update="onUpdate">
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
  props: ['node', 'themeColor'],
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
      saveIndex:false
    }
  },
  computed: {
    ...mapState(['site']),
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
  watch: {
    'site' : {
      handler: function (val, oldVal) {
        var that=this
        this.node.config.map(item => {
          if(item.type === 'css'){
            that.styl[item.style] = item.value
          }else{
            that.other[item.key]=item.value
          }
        })
        console.log("theUpdate")
        that.$forceUpdate()
      },
      deep: true
    },
  },
  mounted(){
  },
  methods: {
    ...mapMutations(['sortWidget', 'addWidget', 'setConfig', 'delCurrDom']),
    onSort ({oldIndex, newIndex, from, to, item}) {
      console.log("theSort")
      if(from === to) {
          this.sortWidget({array: this.node.children, oldIndex, newIndex})
      }
    },
    onChoose({oldIndex}){
      console.log(oldIndex)
      this.setConfig({currDom:this.node, oldIndex})
    },
    onAdd ({ item, newIndex }) {
      const widgetType = item.getAttribute('type'),
            temId=item.getAttribute('temid');
      item.parentElement.removeChild(item)
      axios.get("http://config.json").then(res => {
        this.addWidget({ section: this.node.children, widgetType, newIndex ,config: res.data})
        this.oldindex=newIndex;
      })
    },
    onUpdate({oldIndex, newIndex}){
      console.log(oldIndex,newIndex)
      // this.sortWidget({array: this.node.children, oldIndex, newIndex})
    }
  }
}
</script>

<style scoped>
  .section {
   margin:4px 0;background-color:darkgray;
  }
</style>
