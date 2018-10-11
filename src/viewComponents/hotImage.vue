<template>
  <div class="component hot-image" :style="node.styl" :component-name="node.name" >
    <img :src="node.other.image" alt="" class="hot_bg_img">
    <a class="hot_link" v-for="(item,index) in hotStyle" :style="{width:`${item.w}`,height:`${item.h}`,left:`${item.x}`,top:`${item.y}`}" :link="item.linkValue" :link-type="item.linkType" @click.capture="clickHal(item.linkValue,item.linkType)"></a>
  </div>
</template>

<script>
  export default {
    name: "hotImage",
    props: ['node', 'type'],
    data(){
      return {
      }
    },
    computed: {
      hotStyle(){
        let elWidth=this.node.defaultwh.width,
            elHeight=this.node.defaultwh.height;
        this.node.hotStyle.map((item,i)=>{
          item.w=(item.w/elWidth*100).toFixed(2)+'%';
          item.h=(item.h/elHeight*100).toFixed(2)+'%';
          item.x=(item.x/elWidth*100).toFixed(2)+'%';
          item.y=(item.y/elHeight*100).toFixed(2)+'%';
        })
        return this.node.hotStyle
      }
    },
    mounted(){
    },
    methods:{
      clickHal(val,type){
          if(type==0){
            window.location.href=val;
          }else if(type==1){
            window.location.href='//item.m.jd.com/ware/view.action?wareId='+val;
          }else{
            window.location.href='//item.m.jd.com/ware/view.action?wareId='+val;
          }
      }
    },
  }
</script>

<style scoped lang="less">
  .image_title{
    background-repeat:no-repeat;
  }
.hot-image{
  position:relative;box-sizing: border-box;
  .hot_bg_img{position:absolute;width:100%;height:100%;z-index:1}
  .add_hot{position:absolute;z-index:99}
  .hot_link{position:absolute;z-index:999;}
}

  .el-input-group__prepend .el-select{
   width:120px;
  }
  .el-input-group__prepend{background-color:#fff}
</style>
