<template>
  <div class="component ordinary-product" :style="node.styl" :component-name="node.name">
    <ul class="product_list">
      <li v-for="(item,index) in productList" data-price-area="need">
          <img v-lazy="item.imgurl" :key="item.imgurl" alt="" class="_pimg">
          <p class="title">{{item.name}}</p>
          <div class="product_children" ><span :data-price-id="item.skuid" data-price-type="p"></span><i></i></div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {poolList} from '../server/api'
  import {link} from "~/widgets/util";
  export default {
    name: 'ordinaryProduct',
    props: ['node', 'themeColor'],
    data(){
      return {
        productList:'',
      }
    },
    computed: {
    },
    beforeUpdate(){
      this.$nextTick(function(){
        jdGetPriceByJs.init();
      })

    },
    created(){
      this.getData(this.node.other.pid||'0201348')
    },
    mounted(){
    },
    watch:{
      'node.other.pid':function(val,old){
          if(val.length>=3){
            this.getData(val)
          }

      }
    },
    methods:{
      getData(id){
        let that=this;
        console.log("334")
        poolList({pid:id}).then(res=>{
          if(res.code==0){
            that.productList.length>0&&(that.productList.length=0)
            that.productList=res.list;
            jdGetPriceByJs.init();
          }

        })
      }
    },
  }
</script>

<style lang="less">
.product_list{
  display:flex;flex-wrap:wrap;
  img{
    width:100%;
  }
  ._pimg[lazy=loading]{
    background: no-repeat center url(//common.360buyimg.com/shangou/rednew/common/img/loading.gif);
  }
  ._pimg[lazy=error]{
    background: no-repeat center url(//m.360buyimg.com/babel/jfs/t24394/33/669352346/2028/a1688747/5b3b7781Nab790b79.png);
  }
  li{
    width:46%;margin:2px;background-color:#fff;
    .title{
      overflow: hidden;text-overflow: ellipsis;-webkit-line-clamp: 2;-webkit-box-orient: vertical;word-break: break-all;display:-webkit-box;margin:8px 0;color:#333;
    }
    .product_children{
      display:flex;padding:4px 8px;
      span{
        display:block;flex:1;
      }
      i{
        dispay:block;
        width: 16px;
        height: 16px;background-color:red;padding:2px;border-radius:4px;position:relative;
        &:before{
          content:"";position:absolute;left:11%;top:15%;width:15px;height:15px;
          background-image: url("//m.360buyimg.com/babel/jfs/t19954/149/1197396512/53003/d995012f/5b1792e9Ncc0da2b3.png");
          background-size: 297px 291.5px;
          background-position: -15px -253.5px;
        }

      }
    }
  }

}
</style>

