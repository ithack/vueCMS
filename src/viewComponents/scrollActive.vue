<template>
  <div class="component nab_tab_box"  :component-name="node.name">
    <scroll ref="scrollactive" :offset="0" :always-track="alwaysTrack" :duration="duration" :click-to-scroll="clickToScroll" :bezier-easing-value="easing" :activeObj="node.other" :style="node.styl">
      <ul class="nav-center">
        <li v-for="(item,index) in el" :style="{'lineHeight':node.styl.height}">
          <a :href="item.floor" v-if="index==0" :style="activeClass" class="scrollactive-item nav-item isActive">{{item.name}}</a>
          <a :href="item.floor" v-else :style="{'color':node.other.fontColor,'width':node.other.otherWidth}" class="scrollactive-item nav-item">{{item.name}}</a>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
    import scroll from '~/common/scroll'
    export default {
      name: "scroll-active",
      props: ['node', 'type'],
      components:{
        scroll,
      },
      data(){
        return {
          alwaysTrack: false,
          duration: 600,
          clickToScroll: true,
          offset: this.node.other.lineHeight,
          easing: '.5,0,.35,1',

          dialogFormVisible:false,
          nav_json:[],
          floor_list:[]
        }
      },
      computed: {
        numberOfElements() {
          return this.el.length;
        },
        el(){
          return this.node.saveConfig
        },
        activeClass(){
          let obj=this.node.other;
          let activeCss=`background-color:${obj.activeBgColor};background-image:url(${obj.activeBgImg});color:${obj.activeColor};width:${obj.otherWidth}`
          return activeCss
        }
      },
      mounted() {
      },
      methods: {
      },
    }
</script>

<style lang="less">
.nab_tab_box{
  position:relative;min-height:24px;
  .nav-center{
    overflow:auto;display:flex;padding:0 10px;box-sizing:border-box;flex-flow:row nowrap;flex-shrink: 0;min-width: 100%;
    li{
      font-size: 14px;text-align:center;padding:0 5px;min-width:50px;display:inherit;
      &:not(:first-child) {
        margin-left: 15px;
      }
    }
    a{
      color:#000;display:inline-block;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
    }
  }
  .nav_edit_but{position:absolute;height:24px;right:2px;top:100%;background-color:#fff;color:#5E9EF3;padding:0 5px;}
}
.contion{
  width:80%;margin:0 auto
}
.el-select .el-input {
  width: 100px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
  .el-row{margin-bottom:10px;}
</style>
