<template>
  <div class="component hot-image" :style="node.styl" :component-name="node.name" >
    <img :src="node.other.image" alt="" class="hot_bg_img">
    <template v-if="type=='edit'">
      <drag v-for="(item,index) in hotStyle" :w="item.w" :h="item.h" :key="index" :dragindex="index" @dragstop="onDrag" @resizestop="onResize" :parent="true">
        <span @mousedown.stop="edit(index)">编辑</span>
        <span @mousedown.stop="del(index)">删除</span>
      </drag>

      <button @mousedown.stop.self="add" class="add_hot">添加+</button>
    </template>
    <template v-else>
      <a class="hot_link" :style="{width:`${item.w}px`,height:`${item.h}px`,left:`${item.left}px`,top:`${item.top}px`}" v-for="(item,index) in node.hotStyle">{{item.w}}</a>
    </template>

  </div>
</template>

<script>
  import drag from '~/layout/util/hotDrag'
  export default {
    name: "hotImage",
    props: ['node', 'type'],
    components:{
      drag
    },
    data(){
      return {
        hotStyle:[{
          w:120,
          h:80
        }]
      }
    },
    computed: {

    },
    mounted(){
      this.node.hotStyle=this.hotStyle
    },
    methods:{
      edit(i){
        console.log("编辑")
      },
      del(i){
        this.hotStyle.splice(i,1)
      },
      add(){
        console.log("dsd")
        this.hotStyle.push({x:0,y:0,w:120,h:80})
      },
      onResize: function (x, y, w, h,i) {
        this.hotStyle.splice(i,1,{top:x,left:y,width:w,height:h})
      },
      onDrag: function (x,y,i) {
        this.hotStyle[i].top=x
        this.hotStyle[i].left=y
        console.log(this.hotStyle[i])
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
  .hot_link{position:absolute;}
}

</style>
