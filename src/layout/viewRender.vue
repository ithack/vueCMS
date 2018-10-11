<template>
  <component :is="node.type" :node="node" :type="type" :com-id="node.id" :floor-index="index">
    <render v-for="child in node.children" :key="child.temId" :node="child" :type="type" :com-id="child.id"/>
  </component>
</template>

<script>

  // import com
  import { mapState, mapMutations } from 'vuex'
  import view from '~/viewComponents/index'
  export default {
    name: 'render',
    props: ['node','type','index'],
    data(){
      return{
      }
    },
    computed:{
      ...mapState(['site'])
    },
    components: view,
    mounted(){
      this.incrementGid()
    },
    methods:{
      ...mapMutations(['setConfig', 'delCurrDom','incrementGid']),
    }
  }
</script>
