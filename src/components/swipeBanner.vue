<template>
  <mt-swipe ref="swipe" :show-indicators="node.other.showButton==0?false:true" :auto="timer" :speed="speed" class="component swipe-banner" :style="node.styl" :component-name="node.name" v-if="upTimer" @change="handleChange">
    <mt-swipe-item v-for="(item,i) in imgList" :key="i" v-if="i<showNum" class="swipe_item">
      <img :src="item.imgurl" />
      <p class="swipe_p" v-if="node.other.isTitle=='0'" :style="{'color':node.other.titleColor,'backgroundColor':node.other.titleBgColor}">{{item.name}}</p>
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
  import { Swipe, SwipeItem } from 'mint-ui';
  import {poolList} from '../server/api'
  export default {
    name: 'swipe-banner',
    props: ['node', 'themeColor'],
    data(){
      return {
        imgList:[],
        upTimer:true
      }
    },
    computed: {
      "timer":function(){
        this.upTimer=false;
        this.$nextTick(function(){
          this.upTimer=true;
        })
        return parseInt(this.node.other.timer)
      },
      speed:function(){
        this.upTimer=false;
        this.$nextTick(function(){
          this.upTimer=true;
        })
        return parseInt(this.node.other.speed)
      },
      pid:function(){
        return this.node.other.pid
      },
      showNum(){
        return parseInt(this.node.other.showNum)||1
      }
    },
    watch:{
      'pid':function(val,old){
        if(val.length>=7){
          this.getData(val)
        }

      }
    },
    created(){
      this.getData(this.pid);
    },
    mounted(){
    },
    methods:{
      getData(id){
        let that=this;
        poolList({pid:id}).then(({code, list})=>{
          if(code==0){
            that.imgList=[...list]
          }else{
            this.$toast("接口错误")
          }
        })
      },
      handleChange(index){

      }
    },

    components:{
      'mtSwipe':Swipe,
      'mtSwipeItem':SwipeItem
    }
  }
</script>

<style lang="less">
.mint-swipe-item,.mint-swipe,.mint-swipe-items-wrap{
  min-height:50px;
}
.mint-swipe-indicators{bottom:30px;}
  .swipe_item{
    img{width:100%;display:block;}
    .swipe_p{
      position:absolute;left:0;bottom:0;line-height:30px;background-color:rgba(0,0,0,.4);width:100%;text-indent: 14px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;
    }
  }
</style>

