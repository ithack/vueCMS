<template>
  <header>
    <span class="header_but" @click="goBack">返回</span>
    <p class="header_right">
      <span class="header_but" @click="preview">预览</span>
      <span class="header_but">存为模版</span>
      <span class="header_but but_blue" @click="saveSketch">保存草稿</span>
      <span class="header_but but_blue" @click="publish">提交发布</span>
    </p>
  </header>
</template>

<script>
  import '~/assets/less/header.less'
  var $ = require('jquery')
  import { savePage,publish, preview } from '~/mock/api'
  import { mapState} from 'vuex'
    export default {
      name: "top",
      computed: {
        ...mapState(['site','htmlCon','page_id']),
      },
      methods:{
        goBack(){},
        preview(){//预览
          let params={
            page_id:this.page_id,
            "page_data":JSON.stringify(this.site)
          }
          preview(params).then(res=>{
            console.log(res)
          })
        },
        saveSketch(){//保存草稿
          let params={
            "page_id":this.page_id,
            "page_data":JSON.stringify(this.site)
          }
          savePage(params).then(res=>{
            console.log('保存')
            console.log(res)
          })
        },
        publish(){//发布
          publish({"page_id":this.page_id},{withCredentials: true}).then(res=>{
            console.log("发布")
          })
        },
      },
    }
</script>

<style scoped>

</style>
