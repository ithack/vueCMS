<template>
  <div>
    <dl class="config_dl" v-if="currentConfig.index>=0">
        <dt>配置项</dt>
        {{currentConfig.index}}
        <dd v-for="item in currentConfig.children[currentConfig.index].config">
          <template v-if="item.type=='color'">
            <label for="">{{item.text}}</label>
            <color-picker v-model="item.value"></color-picker>
          </template>
          <template v-else>
            <label for="">{{item.text}}</label>
            <input type="text" v-model="item.value">
          </template>
        </dd>
        <button >提交</button>
        <button @click="del">删除</button>
        <button @click="copyEl">复制</button>
        <button @click="moveUp">上移</button>
        <button @click="moveDown">下移</button>
        <button @click="reset">重置</button>
    </dl>
  </div>
</template>
<script>
  import { mapMutations, mapState } from 'vuex'
  import { VueColorpicker } from 'vue-pop-colorpicker'
  export default {
      data() {
          return {
            color: 'red',
          }
      },
      computed:{
        ...mapState(['currentConfig','site']),
      },
      mounted(){
      },
      methods: {
        ...mapMutations(['delCurrDom', 'sortWidget', 'copyWidget']),
        del(){
          this.delCurrDom({section:this.currentConfig.children, oldIndex:this.currentConfig.index})
        },
        reset(){
          this.currentConfig.children[this.currentConfig.index].config=[{
            type: 'text',
            value: '重置测试文字',
            key: 'title',
            text: '重置测试'
          }]
        },
        copyEl(){
          let oEl=this.currentConfig.children[this.currentConfig.index]
          this.copyWidget({array:this.currentConfig.children, oldIndex:this.currentConfig.index})
        },
        moveUp (){
          let oldIndex = this.currentConfig.index
          if(oldIndex>0){
            this.currentConfig.index=-1
            this.sortWidget({array:this.currentConfig.children,oldIndex,newIndex: oldIndex-1})
          }else{
            alert('已到顶')
          }

        },
        moveDown(){
          let oldIndex = this.currentConfig.index
          console.log(oldIndex)
          if(oldIndex<this.currentConfig.children.length-1){
            this.currentConfig.index=-1
            this.sortWidget({array:this.currentConfig.children,oldIndex,newIndex: oldIndex+1})
          }else{
            alert('已到低')
          }
        }
      },
      watch: {
        'site' : {
          handler: function (val, oldVal) {
            console.log("configUpdate")
            console.log(val);
            this.$forceUpdate();

          },
          deep: true
        },
      },
      components: {
        'color-picker': VueColorpicker
      },
  }
</script>
<style>
  .config_dl{
    max-width:300px;
  }
</style>

