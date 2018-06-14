<template>
  <mt-swipe :show-indicators="true" :auto="5000" class="component" :style="styl | styleFn">
    <mt-swipe-item>1</mt-swipe-item>
    <mt-swipe-item>2</mt-swipe-item>
    <mt-swipe-item>3</mt-swipe-item>
  </mt-swipe>
</template>

<script>
  import { Swipe, SwipeItem } from 'mint-ui';
  export default {
    name: 'banner',
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
      'mtSwipe':Swipe,
      'mtSwipeItem':SwipeItem
    }
  }
</script>

<style>
.mint-swipe-item,.mint-swipe,.mint-swipe-items-wrap{
  min-height:200px;
}
</style>

