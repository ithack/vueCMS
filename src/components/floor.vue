<template>
  <div class="floor" :style="styl">
    dddddd
    cccc
    cccc
    ddd
    sadsa
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
    watch: {
      'node' : {
        handler: function (val, oldVal) {
          var that=this
          this.node.config.map(item => {
            if(item.type === 'css'){
              that.styl[item.style] = item.value
            }else{
              that.other[item.key]=item.value
            }
          })
          console.log("configUpdate")
          that.$forceUpdate()
        },
        deep: true
      },
    },
    computed:{
      ...mapState(['site']),
    },
    methods:{
      ...mapActions(['setSite']),
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
