<template>
  <div class="root">
    <div class="view_box">
      <render v-for="(child,index) in site.children" :key="child.id" :index="index" :node="child" :type="'view'"/>
    </div>
  </div>
</template>

<script>
  import './assets/less/rest.less'
  import { mapState, mapActions} from 'vuex'
  import Render from './layout/viewRender'
  export default {
    name: 'app',
    components: {
      Render,
    },
    data () {
      return {
        old:null,
      }
    },
    computed: {
      ...mapState(['site', 'currentConfig', 'page_id']),
    },
    methods: {
      ...mapActions(['getSite']),
    },
    mounted () {
      this.getSite();

    }
  }
</script>

<style lang="less">
  .no-dragClass{display:none;}
  .root {
    .laoding {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      z-index:9999;
      font-size:14px;
      color: #686868;
      display:none;
      text-align: center;
      .jd-load {
        position: relative;
        top: 40%
      }
      .jd-load img {
        display: block;
        margin: 5px auto
      }
    }
  }
  .component_hover{
    border:1px solid #5E9EF3;position: relative;
    &:before{
      content:attr(component-name);position:absolute;right:0;top:0;background-color:#5E9EF3;color:#fff;height:24px;line-height:24px;
    }
  }
  .icon-shouqi{
    transform: rotate(180deg);
  }
  .iconfont{
    font-size:18px;color:#666;
  }
  .icon-white{color:#fff;}

  // main
  #view_main{
    background:url('./assets/img/main_bg.png') no-repeat;width:364px;height:720px;margin:0 auto;background-size:contain;position:relative;top:70px;
    .view_box{
      background-color:#F8F8F8;width:79%;height:72%;/*-webkit-transform: translate(13%,17%);*/border:1px solid #ccc;border-radius:5px;
      overflow-x:auto;position:absolute;left: 10.2%;top: 12.8%;
    }
  }

</style>
