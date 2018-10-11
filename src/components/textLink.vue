<template>
  <div class="component"  :component-name="node.name">
          <div class="container" :style="{'height':node.styl.height}">
            <ul :style="{'height':node.styl.height,'width':ulWidth}">
              <li :style="node.styl" v-for="(item,i) in imgList" :key="i" v-if="i<showNum">
                <a href="javascript:;" :style="{'color':node.styl.color,'line-height':node.styl.height}"  :class="{ 'linehas': node.other.isLine == '1' }">{{item.title}}</a>
              </li>
            </ul>
          </div>
  </div>
</template>

<script>
import { poolList } from "../server/api";
export default {
  name: "text-link",
  props: ["node", "themeColor"],
  data() {
    return {
      imgList: [],
    };
  },
  computed: {
    pid: function() {
      return this.node.other.pid;
    },
    showNum() {
      if(parseInt(this.node.other.showNum)>this.imgList.length){
           return this.imgList.length;
      }else{
           return parseInt(this.node.other.showNum) || 2;
      }
    },
    ulWidth(){
      var m = String(parseInt(this.node.styl.width)).length;
      var n = this.node.styl.width.slice(m);
      console.log(m,n);
      console.log(this.showNum);
      return parseInt(this.node.styl.width)*(this.showNum)+n;
    }
  },
  watch: {
    'pid': function(val, old) {
      if (val.length >= 7) {
        this.getData(val);
      }
    },
  },
  created() {
    this.getData(this.pid);
  },
  methods: {
    getData(id) {
      let that = this;
      poolList({ pid: id }).then(({ code, list }) => {
        if (code == 0) {
          that.imgList = [...list];
          console.log(that.imgList);
        } else {
          this.$toast("接口错误");
        }
      });
    }
  }
};
</script>

<style lang="less">
.container {
  position:relative;
  width: 100%;
  overflow:scroll;
  ul {
    li {
      float: left;
      text-align: center;
    }
    .linehas{
      text-decoration: underline;
    }
  }
}
</style>

