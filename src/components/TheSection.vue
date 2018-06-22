<template>
  <div class="section component" v-if="htmlCon.readOnly">
    <slot></slot>
  </div>
    <draggable v-else class="section component" :style="node.styl" :component-name="node.name" :options="dragOptions" v-model="node.children" @add="onAdd" @choose="onChoose">
      <slot></slot>
    </draggable>
</template>

<script>
var $ = require('jquery');
import Draggable from 'vuedraggable'
import { mapMutations, mapState, mapActions } from 'vuex'

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
    ...mapState(['site', 'currentConfig', 'htmlCon']),
  },
  created(){

  },
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
   background-color:darkgray;width:100%;min-height:10px;
  }
</style>
