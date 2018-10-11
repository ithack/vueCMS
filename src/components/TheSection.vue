<template>
    <draggable v-else class="section component floor" :floorId="node.id" :id="'floor-'+node.id" :style="node.styl" :component-name="node.name" :options="dragOptions" v-model="node.children" @input="oninput" @add="onAdd" @change="onchange" @choose="onChoose">
      <slot></slot>
    </draggable>
</template>

<script>
import Draggable from 'vuedraggable'
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  name: 'the-section',
  components: {
    Draggable
  },
  props: ['node', 'type' , 'curr'],
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
        sort: true,
        filter:'.no-drag',
        fallbackClass:'no-dragClass'
      },
      old:0,
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
    oninput(s){
      s.map((item,index)=>{
        if(item.placeholder){
          console.log(item,index)
        }
      })
    },
    onchange(a){
      this.old=a.added.newIndex;
    },
    onAdd (sort) {
      console.log(this.old)
      let { item, newIndex}=sort;
      this.node.children.splice(this.old,1)
      const widgetType = item.getAttribute('type'),
            model_id=item.getAttribute('model_id'),
        close=item.getAttribute('close');
      if(close){
        this.$alert("此组件暂未开放");
        return !1;
      }
      console.log(item,newIndex,this.node.children)
      this.getDefaultConfig({ section: this.node.children, widgetType, newIndex ,model_id})
      setTimeout(()=>{
        this.setConfig({currDom:this.node, oldIndex:newIndex})
      },200)
      // this.setConfig({currDom:this.node, oldIndex:newIndex})
      /*getConfig({model_id:temId}).then(res => {
        this.addWidget({ section: this.node.children, widgetType, newIndex ,config: res.data['props']})
      })*/
    }
  }
}
</script>

<style scoped>
  .section {
   background-color:darkgray;width:100%;min-height:30px;box-sizing: border-box;padding-top:4px!important;
  }

</style>
