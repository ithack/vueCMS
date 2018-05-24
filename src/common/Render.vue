<template>
    <component :is="node.type" :node="node" :theme="themeColor">
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
  props: ['node', 'themeColor'],
  data(){
    return{
      currDom: {}
    }
  },
  components: {
    Page,
    TheSection,
    Paragraph,
    Floor,
  },
  methods:{
    ...mapMutations(['setConfig', 'delCurrDom']),

  }
}
</script>
