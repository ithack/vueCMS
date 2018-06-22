<template>
  <div class="component" :style="node.styl" :component-name="node.name">
    <h3 v-if="node.other.title==1">{{node.other.pid}}</h3>
    <ul class="product_list">
      <!--<li v-for="item in productList" data-price-area="need">
        <a :href="'//item.m.jd.com/ware/view.action?wareId='+item.sku_id" target="_blank">
          <img v-lazy="item.image_url" :src="item.image_url" alt="">
          <p class="title">{{item.name}}</p>
          <div class="product_children" ><span :data-price-id="item.sku_id" data-price-type="p"></span><i></i></div>
        </a>
      </li>-->
      <li v-for="item in productList" data-price-area="need" @click.stop="itemLinkUrl(item.sku_id)">
          <img v-lazy="item.image_url" :src="item.image_url" alt="">
          <p class="title">{{item.name}}</p>
          <div class="product_children" ><span :data-price-id="item.sku_id" data-price-type="p"></span><i></i></div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {poolList} from './../mock/api'
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
      console.log("ddd")
      this.$nextTick(function(){
      })

    },
    created(){
      this.getData(this.node.other.pid||224)
    },
    mounted(){
    },
    watch:{
      'node.other.pid':function(val,old){
        console.log("aaa")
          if(val.length>=3){
            this.getData(val)
          }

      }
    },
    methods:{
      getData(id){
        let that=this;
        poolList({pool_id:id}).then(res=>{
          that.productList.length>0&&(that.productList.length=0)
          that.productList=res.data;
        })
      },
      itemLinkUrl(skuId){
        if(htmlConfig.readOnly){
        }
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
  li{
    min-width:46%;flex:1;margin:2px;background-color:#fff;
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

