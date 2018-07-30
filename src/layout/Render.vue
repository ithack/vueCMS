<template>
    <component :is="node.type" :node="node" :type="type">
      <render v-for="child in node.children" :key="child.temId" :node="child" :type="type"/>
    </component>
</template>

<script>
import components from './../components/index'
// import com
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'render',
  props: ['node','type'],
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
