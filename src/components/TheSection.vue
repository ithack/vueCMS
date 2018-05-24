<template>
    <section class="section" :style="styl" >
      {{other.title}}
      <draggable style="min-height:100px" :options="dragOptions" @add="onAdd" @choose="onChoose">
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
      styl:{},
      other:{},
    }
  },
  computed: {
    ...mapState(['site'])
  },
  created(){
    this.node.config.map(item => {
      if(item.type === 'css'){
        this.styl[item.style] = item.value
      }else{
        this.other[item.key]=item.value
      }
    })
  },
  watch: {
    'node' : {
      handler: function (val, oldVal) {
        var that=this
        this.node.config.map(item => {
          if(item.type === 'css'){
            that.styl[item.style] = item.value
          }else{
            that.other[item.key]=item.value
          }
        })
        console.log("configUpdate")
        that.$forceUpdate()
      },
      deep: true
    },
  },
  mounted(){
  },
  methods: {
    ...mapMutations(['sortWidget', 'addWidget', 'setConfig', 'delCurrDom']),
    onSort ({oldIndex, newIndex, from, to}) {
      if(from === to) {
          this.sortWidget({array: this.node.children, oldIndex, newIndex})
      }
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
    onChoose({oldIndex}){
      console.log(this.node)
      this.setConfig({currDom:this.node, oldIndex})
    }
  }
}
</script>

<style scoped>
  section {
    border: 2px solid transparent;
  }
  section:hover {
    border: 2px solid tomato;
  }
</style>
