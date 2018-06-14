<template>
    <section class="section component" :style="node.styl" :component-name="node.name">
      {{node.styl}}
      <draggable style="min-height:10px;" :options="dragOptions" v-model="node.children" @add="onAdd" @choose="onChoose">
        <slot></slot>
      </draggable>
    </section>
</template>

<script>
import $ from 'jquery'
import Draggable from 'vuedraggable'
import { mapMutations, mapState, mapActions } from 'vuex'

require('../mock/mock')
export default {
  name: 'the-section',
  components: {
    Draggable
  },
  props: ['node', 'themeColor' , 'curr'],
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
    }
  },
  computed: {
    ...mapState(['site', 'currentConfig']),
    /*styl: function(){
      let styl={}
      this.node.config.map(item => {
        if(item.remark === 'css'|| item.ui_type === 6){
          styl[item.name] = item.default_val
        }
      })
      return styl
    },
    other: function () {
      let other={}
      this.node.config.map(item => {
        if(item.remark !== 'css'&& item.ui_type !== 6){
          other[item.name] = item.default_val
        }
      })
      return other
    }*/
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
    ...mapActions(['getDefaultConfig']),
    onChoose({oldIndex}){
      this.setConfig({currDom:this.node, oldIndex})
    },
    onAdd ({ item, newIndex }) {
      const widgetType = item.getAttribute('type'),
            model_id=item.getAttribute('model_id');
      this.getDefaultConfig({ section: this.node.children, widgetType, newIndex ,model_id})
      /*getConfig({model_id:temId}).then(res => {
        this.addWidget({ section: this.node.children, widgetType, newIndex ,config: res.data['props']})
      })*/
    }
  }
}
</script>

<style scoped>
  .section {
   margin:4px 0;background-color:darkgray;width:100%;padding:4px 5px;
  }
</style>
