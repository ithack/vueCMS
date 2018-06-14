<template>
  <mt-header fixed :title="other.title" :style="styl | styleFn" :component-name="node.name">
    <mt-button icon="back" slot="left">返回</mt-button>
    <mt-button icon="more" slot="right"></mt-button>
  </mt-header>
</template>

<script>
  import { Header, Button } from 'mint-ui';
  export default {
    name: 'header-component',
    props: ['node', 'themeColor'],
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
    components:{
      'mtHeader': Header,
      'mtButton': Button,
    }
  }
</script>

<style scoped>
.mint-header{
  background-color:#fff;color:#000;
}
</style>

