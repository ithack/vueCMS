<template>
  <div class="component startEffect"  :component-name="node.name" v-show="mVisible">
          <div class="container3" :style="{'height':node.styl.height,'width':node.styl.width}">
              <div class="btn1 btn" v-if="node.other.isStyle == '0'" :style="{'background-color':node.styl.backgroundColor,'color':node.styl.color,'border-color':node.styl.borderColor}">
                  跳转{{mTime}}秒
              </div>
              <div class="btn2 btn" v-else-if="node.other.isStyle == '1'" :style="{'background-color':node.styl.backgroundColor,'color':node.styl.color,'border-color':node.styl.borderColor}">
                   跳转{{mTime}}秒
              </div>
              <div class="btn3 btn" v-else-if="node.other.isStyle == '2'" :style="{'background-color':node.styl.backgroundColor,'color':node.styl.color,'border-color':node.styl.borderColor}">
                  {{mTime}}秒
              </div>
              <img :src="node.other.pictureVideo" alt="" :style="{'height':node.styl.height,'width':node.styl.width}">
          </div>
  </div>
</template>

<script>
import { poolList } from "../server/api";
export default {
  name: "start-effect",
  props: ["node", "themeColor"],
  data() {
    return {
      imgList: [],
      mVisible: true,
      mTime: 6,
      tt: null
    };
  },
  computed: {
    isShow: function() {
      return parseInt(this.node.other.isShow);
    },
    timeLong: function() {
      return parseInt(this.node.other.timeLong);
    }
  },
  watch: {
    isShow: function() {
      if (this.isShow == 0) {
        this.mVisible = true;
        this.mTime = this.timeLong;
        if (this.tt) {
          clearTimeout(this.tt);
        }
        this.countDownFun();
      } else {
        this.mVisible = false;
      }
    },
    timeLong: function() {
      this.mTime = this.timeLong;
      if (this.tt) {
        clearTimeout(this.tt);
      }
      this.countDownFun();
    }
  },

  created() {
    console.log(this.node.other);
    console.log(this.node.styl);
    this.mTime = this.timeLong;
    this.countDownFun();
  },
  methods: {
    //倒计时方法
    countDownFun: function() {
      var that = this;
      that.tt = setTimeout(function() {
        if (that.mTime == 1) {
          // that.mVisible = false;
        } else {
          that.mTime = that.mTime - 1;
          that.countDownFun();
        }
      }, 1000);
    }
  }
};
</script>

<style lang="less">
.startEffect {
  z-index:100;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-color:#CACACA;
  .container3 {
    width: 100%;
    height: 100%;
    position: relative;
    img {
      width: 100%;
      display: block;
    }
    .btn {
      text-align: center;
      border-width: 1px;
      border-style: solid;
      position: absolute;
      top: 5px;
      right: 10px;
    }
    .btn1 {
      height: 28px;
      width: 58px;
      line-height: 28px;
      -moz-border-radius: 16px;
      -ms-border-radius: 16px;
      -o-border-radius: 16px;
      border-radius: 16px;
    }
    .btn2 {
      height: 48px;
      width: 48px;
      line-height: 48px;
      -moz-border-radius: 50%;
      -ms-border-radius: 50%;
      -o-border-radius: 50%;
      border-radius: 50%;
    }
    .btn3 {
      height: 25px;
      width: 25px;
      line-height: 25px;
      -moz-border-radius: 50%;
      -ms-border-radius: 50%;
      -o-border-radius: 50%;
      border-radius: 50%;
    }
  }
}
</style>

