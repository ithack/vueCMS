<template>
    <section class="section" @click="setConfig(node)" :style="styl">
      222
      <draggable style="min-height:100px" :options="dragOptions" @add="onAdd">
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
      styl:{}
    }
  },
  computed: {
    ...mapState(['site'])
  },
  created(){
    this.node.config.map(item => {
      this.styl[item.style] = item.value
    })
  },
  watch: {
    'node.config' : {
      handler: function (val, oldVal) {
        var that=this
        this.node.config.map(item => {
          that.styl[item.style] = item.value
        })
      },
      deep: true
    },
  },
  mounted(){
  },
  methods: {
    ...mapMutations(['sortWidget', 'addWidget', 'setConfig']),
    onSort ({oldIndex, newIndex, from, to}) {
      if(from === to) {
          this.sortWidget({array: this.node.children, oldIndex, newIndex})
      }
    },
    onAdd ({ item, newIndex }) {
      const widgetType = item.getAttribute('type'),
            temId=item.getAttribute('temid');
      console.log(temId)
      axios.get("http://config.json").then(res => {
        item.parentElement.removeChild(item)
        this.addWidget({ section: this.node.children, widgetType, newIndex ,config: res.data})
      })
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
