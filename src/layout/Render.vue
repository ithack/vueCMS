<template>
    <component :is="node.type" :node="node" :type="type" :floor-index="index" :com-id="node.id">
      <render v-for="child in node.children" :key="child.temId" :node="child" v-if="!child.placeholder" :type="type" :com-id="child.id"/>
    </component>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import edit from '~/components/index'
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
  components: edit,
  mounted(){
    this.incrementGid();
    console.log("aaa")
  },
  methods:{
    ...mapMutations(['setConfig', 'delCurrDom','incrementGid']),
  }
}
</script>
