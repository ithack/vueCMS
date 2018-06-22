<template>
  <aside>
    <div>
      <h3 class="left_title">
        <span v-show="leftHide">组件库</span>
        <i @click.stop="switchFn" class="icon iconfont icon-zhankai icon-white" :class="leftHide?'icon-shouqi':''"></i>
      </h3>
      <ul class="tab_nav" @click="tabClick">
        <li v-for="(tabItem,index) in tabTree" :class="tabIndex==index?'active':''">
          <i class="icon iconfont tabIcon" :class="tabItem.icon"></i>
          <p>{{tabItem.text}}</p>
        </li>
      </ul>
      <p class="list_length" v-show="leftHide" v-if="widgets.length">全部（{{widgets.length}}）</p>
      <draggable v-show="leftHide" :options="dragOptions" class="leftModel" :list="widgets">
        <p class="nolist" v-if="!widgets.length">暂无相关组件</p>
        <div v-else v-for="widget in widgets" class="widget-card" :type="widget.placeholder.type" :model_id="widget.model_id">
          <i class="icon iconfont" :class="widget.icon"></i>
          <p>{{widget.name}}</p>
        </div>
      </draggable>
    </div>
  </aside>
</template>

<script>
  import { mapState, mapActions , mapMutations} from 'vuex'
  import Draggable from 'vuedraggable'
    export default {
      name: "leftModel",
      components: {
        Draggable,
      },
      data(){
          return {
            tabIndex:0,
            leftHide: false,
            dragOptions: {
              group: {
                name: 'widgets',
                pull: 'clone',
                put:false,
              },
              sort: false
            },
          }
      },
      computed: {
        ...mapState([ 'tabTree','widgets',]),
      },
      methods:{
        ...mapMutations(['setWidget']),
        ...mapActions(['getSite','getDefaultConfig']),
        tabClick(e){
          let i=$(e.target).parent().index();
          this.tabIndex=i
          this.setWidget(this.tabTree[i].list)
          this.leftHide=true;
        },
        switchFn(){
          this.leftHide?this.leftHide=false:this.leftHide=true;
        },
      }
    }
</script>

<style scoped lang="less">
aside {
  background-color:#fff;
  position:fixed;
  top:70px;left:0;overflow:hidden;
  max-width:280px;
  .left_title{
    color:#fff;
    background:#5E9EF3;
    display:flex;
    justify-content: space-between;
    padding:6px 8px;
    &>span{
      display: block;width: 80%;
    }
    &>i{
      text-align: center;flex: 1;
    }
  }
  .tab_nav{
    width:70px;text-align:center;border-right:1px solid #F0F0F0;float:left;padding-bottom:1000px;margin-bottom:-1000px;color:#666;
    li{
      padding:5px 0;
    }
    .active{
      background-color:#5E9EF3;color:#fff;
      .iconfont{color:#fff }
    }
    .tabIcon{
      font-size:24px;text-align:center;display:block;width:100%;padding:4px 0;
    }
  }
  .list_length{
    width:170px;float:left;display:inline-block;fonn-size:12px;color:#D3D3D3;line-height:16px;padding:6px 5px;box-sizing:border-box;
  }
  .leftModel{
    width:170px;overflow-y: scroll;display:flex;flex-wrap: wrap;justify-items: baseline;
    .nolist{color:#666;display:block;width:100%;padding:40px 30px;text-align:center;}
  }
  & .widget-card {
    border-radius: 2px;
    width: 85px;margin:6px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: move;
    &>i {
      display: block;
      font-size: 2em;
    }
    &>p {
      margin-top: 5px;
      margin-bottom: 5px;color:#666;
    }
  }
}
</style>
