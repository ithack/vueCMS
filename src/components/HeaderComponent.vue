<template>
  <mt-header :fixed="node.other.isFixed==1" :title="node.other.title" :style="node.styl" :component-name="node.name">
    <mt-button icon="back" slot="left">返回</mt-button>
    <div slot="right">
      <mt-button v-if="node.other.title_menu==1">
        <div class="icon iconfont icon-search" slot="icon"></div>
      </mt-button>
      <mt-button v-else-if="node.other.title_menu==2">
        <div class="icon iconfont icon-gouwuche" slot="icon"></div>
      </mt-button>
      <mt-button icon="more" slot="right" v-if="node.other.isMore==1"></mt-button>
    </div>

  </mt-header>
</template>

<script>
  import { Header, Button,Search } from 'mint-ui';
  export default {
    name: 'header-component',
    props: ['node', 'themeColor'],
    data(){
      return {
        search:""
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

