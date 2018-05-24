<template>
  <div>
    <dl class="config_dl" v-if="currentConfig.index>=0">
        <dt>配置项</dt>
        {{currentConfig.children[currentConfig.index].type}}
        <dd v-for="item in currentConfig.children[currentConfig.index].config">
          <label for="">{{item.text}}</label>
          <input type="text" v-model="item.value">
        </dd>
        <button >提交</button>
        <button @click="del">删除</button>
    </dl>
  </div>
</template>
<script>
  import { mapMutations, mapState } from 'vuex'
  export default {
      data() {
          return {}
      },
      computed:{
        ...mapState(['currentConfig','site']),

      },
      mounted(){
      },
      methods: {
        ...mapMutations(['delCurrDom', 'setSite']),
        del(){
          this.delCurrDom({section:this.currentConfig.children, oldIndex:this.currentConfig.index})
        }
      },
      watch: {
        'site' : {
          handler: function (val, oldVal) {
            console.log("configUpdate")
            console.log(val)
            this.setSite()
          },
          deep: true
        },
      }
  }
</script>
<style>
.config_dl{}
</style>
