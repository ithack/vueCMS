<template>
    <component :is="node.type" :node="node" @updata="updata" :theme="themeColor" :curr="curr">
      <render v-for="child in node.children" :key="child.temId" :node="child" :theme="themeColor"/>
    </component>
</template>

<script>
// 导入JSON 树中所涉及的所有节点
import Page from './../components/Page.vue'
import Paragraph from './../components/Paragraph.vue'
import TheSection from './../components/TheSection.vue'
import Floor from './../components/floor.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'render',
  props: ['node','themeColor', 'curr'],
  data(){
    return{
      currDom: {}
    }
  },
  computed:{
    ...mapState(['site'])
  },
  /*watch: {
    'node' : {
      handler: function (val, oldVal) {
        var that=this

        console.log("renderUpdate")
        that.$forceUpdate()
      },
      deep: true
    },
  },*/
  components: {
    Page,
    TheSection,
    Paragraph,
    Floor,
  },
  methods:{
    ...mapMutations(['setConfig', 'delCurrDom']),
    updata(){
      this.$emit('updata')
    }
  }
}
</script>
