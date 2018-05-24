<template>
  <div class="floor" @click.stop="setConfig(node)" :style="styl">
    <button @click.stop="del">删除</button>
    {{other.title}}
  </div>
</template>

<script>
  import { mapMutations,mapActions,mapState } from 'vuex'
  export default {
    name: 'floor',
    props: ['node', 'themeColor'],
    data(){
      return {
        styl: {},
        other:{}
      }
    },
    created(){

      this.node.config.map(item => {
        if(item.type === 'css'){
          this.styl[item.style] = item.value
        }else{
          this.other[item.key]=item.value
        }

      })
    },
    computed:{
      ...mapState(['site']),
    },
    methods:{
      ...mapActions(['setSite']),
      ...mapMutations(['setConfig']),
      del(){
        console.log(this.site)
      }
    }
  }
</script>

<style scoped>
  section {
    border: 2px solid transparent;
  }
  section:hover {
    border: 2px solid tomato;
  }
</style>
