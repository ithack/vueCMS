<template>
    <component :is="node.type" :node="node">
      <render v-for="child in node.children" :key="child.temId" :node="child" />
    </component>
</template>

<script>
import components from './../components/index'
// import com
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'render',
  props: ['node','themeColor'],
  data(){
    return{
      currDom: {}
    }
  },
  computed:{
    ...mapState(['site'])
  },
  components: components,
  methods:{
    ...mapMutations(['setConfig', 'delCurrDom']),
  }
}
</script>
