<template>
  <div class="component" :style="node.styl" :component-name="node.name">
    <ul class="product_list">
      <li v-for="item in productList">
        <img :src="item.image_url" alt="">
        <p class="title">{{item.name}}</p>
        <div class="product_children">价格box</div>
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
      /*styl: function(){
        let styl={}
        this.node.config.map(item => {
          if(item.type === 'css'||item.type === 'color'){
            styl[item.style] = item.value
          }
        })
        return styl
      },
      other: function () {
        let other={}
        this.node.config.map(item => {
          if(item.type !== 'css'&&item.type !== 'color'){
            other[item.key] = item.value
          }
        })
        return other
      }*/
    },
    created(){
      poolList({pool_id:this.node.other.pid}).then(res=>{
        this.productList=res.data;
      })
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
    min-width:48%;flex:1;
  }

}
</style>

