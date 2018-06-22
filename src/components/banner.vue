<template>
  <mt-swipe :show-indicators="true" :auto="timer" class="component" :style="node.styl">
    <mt-swipe-item>测试1</mt-swipe-item>
    <mt-swipe-item>测试2</mt-swipe-item>
    <mt-swipe-item>测试3</mt-swipe-item>
  </mt-swipe>
</template>

<script>
  import { Swipe, SwipeItem } from 'mint-ui';
  import {poolList} from './../mock/api'
  export default {
    name: 'banner',
    props: ['node', 'themeColor'],
    data(){
      return {
        productList:""
      }
    },
    computed: {
      "timer":function(){
        return parseInt(this.node.other.time)
      }
    },
    created(){
      this.getData(this.node.other.pid)
    },
    watch:{
      'node.other.pid':function(val,old){
        if(val.length>=3){
          console.log("banner")
          this.getData(val)
        }

      }
    },
    methods:{
      getData(id){
        let that=this;
        poolList({pool_id:id}).then(res=>{
          that.productList.length>0&&(that.productList.length=0)
          that.productList=res.data;
          this.$forceUpdate()
        })
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

