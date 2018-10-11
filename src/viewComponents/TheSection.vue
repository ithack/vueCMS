<template>
  <div class="section component floor" :id="'floor-'+node.id" :floorId="node.id" :style="node.styl">
    <slot></slot>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  name: 'the-section',
  props: ['node', 'type' , 'curr'],
  data () {
    return {
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
  }
}
</script>

<style scoped>
  .section {
   background-color:darkgray;width:100%;min-height:30px;box-sizing: border-box;
  }

</style>
