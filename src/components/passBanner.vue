<template>
  <div class="component pass-banner" :style="node.styl" :component-name="node.name">
    <img v-for="(item,i) in imgList" v-if="i==1" :src="item.imgurl" alt="">
  </div>
</template>

<script>
  import {poolList} from '../server/api'
  export default {
    name: 'pass-banner',
    props: ['node', 'themeColor'],
    data(){
      return {
        imgList:[]
      }
    },
    computed: {
      pid:function(){
        return this.node.other.pid
      },
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
    },
  }
</script>

<style lang="less">
.pass-banner{
  border-width:1px;box-sizing:border-box;overflow:hidden;background-size: contain;background-repeat:no-repeat;
  img{width:100%;}
}
</style>

