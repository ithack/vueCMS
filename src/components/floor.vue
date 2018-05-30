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
      }
    },
    computed: {
      ...mapState(['site']),
      styl: function(){
        let styl={}
        this.node.config.map(item => {
          if(item.type === 'css'||item.type === 'color'){
            styl[item.style] = item.value
          }
        })
        return styl
      },
      other: function () {
        let other={}
        this.node.config.map(item => {
          if(item.type !== 'css'&&item.type !== 'color'){
            other[item.key] = item.value
          }
        })
        return other
      }

    },

    /*watch: {
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
          console.log("floorUpdate")
          that.$forceUpdate()
        },
        deep: true
      },
    },*/
    methods:{

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
