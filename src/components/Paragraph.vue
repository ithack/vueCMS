<template>
  <div class="paragraph" :style="styl">
    <h1>{{other.title}}</h1>
    <small>333</small>
    <input>
    <div>提交</div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
export default {
  name: 'paragraph',
  props: ['node', 'themeColor','msg'],
  data(){
    return {
    }
  },
  computed: {
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
  created(){

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
          console.log("paragraphWatch")
          that.$forceUpdate()
        },
        deep: true
      },
  },
  methods:{

  }
}
</script>

<style scoped>
.paragraph {
  cursor: move;
}
.paragraph:hover {
  background: #ddd;
}
</style>

