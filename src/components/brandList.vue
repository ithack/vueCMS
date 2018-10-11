<template>
  <div class="component1"  :component-name="node.name">
          <div class="container1" :style="node.styl">
            <ul v-for="(item,index) in imgList" :key="index" >
                  <li v-for="(img,ind) in item" :key="ind" v-show="img!=null">
                        <img :src="img.imgurl" alt="" :style="{'transform':mScale}">
                  </li>
                  <li class="kong" v-if="item.length < showNum" :style="{'flex':mod,'margin-left':mod*10+'px'}"></li>
            </ul>

          </div>
  </div>
</template>

<script>
import { poolList } from "../server/api";
export default {
  name: "brand-list",
  props: ["node", "themeColor"],
  data() {
    return {
      imgList: [],
      list: [],
      mod: 0 //补空的flex值 和 对应 margin-left值
    };
  },
  computed: {
    pid: function() {
      return this.node.other.pid;
    },
    showNum: function() {
      return parseInt(this.node.other.showNum) || 2;
    },
    mScale: function() {
      if (
        Number(this.node.other.pictureSize) &&
        this.node.other.pictureSize < 1
      ) {
        return "scale(" + this.node.other.pictureSize + ")";
      } else {
        return "scale(1,1)";
      }
    }
  },
  watch: {
    pid: function(val, old) {
      if (val.length >= 7) {
        this.getData1(val);
      }
    },
    showNum: function() {
      this.largeFun();
    }
  },
  methods: {
    getData1(id) {
      let that = this;
      poolList({ pid: id }).then(({ code, list }) => {
        if (code == 0) {
          that.list = list;
          that.largeFun();
        } else {
          this.$toast("接口错误");
        }
      });
    },
    //显示数量变化调用方法
    largeFun() {
      this.imgList = [];
      var nn = Math.ceil(this.list.length / this.showNum);
      for (var i = 0; i < nn; i++) {
        this.imgList.push(
          this.list.slice(i * this.showNum, (i + 1) * this.showNum)
        );
      }
      this.mod = this.showNum - this.list.length % this.showNum;

    }
  },
  created() {
    this.getData1(this.pid);
  }
};
</script>

<style lang="less">
.container1 {
  width: 100%;
  padding: 0px 10px 10px 10px;
  box-sizing: border-box;
  overflow: hidden;
  p {
    text-align: center;
  }
  ul {
    display: -webkit-flex;
    display: flex;
    li {
      flex: 1;
      margin-top: 10px;
     img {
          width: 100%;
        }
    }
    li + li {
      margin-left: 10px;
    }
    .kong {
      background: none;
      border: none;
    }
  }
}
</style>

