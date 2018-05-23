<template>
  <div>
    <dl class="config_dl">
        <dt>配置项</dt>
        <dd v-for="item in currentConfig.config">
          <label for="">{{item.text}}</label>
          <input type="text" v-model="item.value">
        </dd>
        <button >提交</button>
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
        ...mapState(['currentConfig','site'])
      },
      mounted(){
      },
      watch: {
        'currentConfig' : {
          handler: function (val, oldVal) {
            console.log("configUpdate")
            console.log(val)
            this.$store.commit('setConfig',val)
            this.$forceUpdate()
          },
          deep: true
        },
      }
  }
</script>
<style>
.config_dl{}
</style>
