<template>
  <header>
    <span class="header_but a_but" @click="goBack">返回</span>
    <p class="header_right">
      <span class="header_but a_but" @click="preview">预览</span>
      <!--<span class="header_but">存为模版</span>-->
      <span class="header_but a_but" @click="saveSketch">保存草稿</span>
      <span class="header_but a_but" @click="publish">提交发布</span>
    </p>
  </header>
</template>

<script>
  import '~/assets/less/header.less'
  import {getCookie,setCookie} from "~/widgets/util";
  import { savePage,publish, preview } from '~/mock/api'
  import { mapState} from 'vuex'
  import { jsList, copy,getQueryUrl,link} from '~/widgets/util'

    export default {
      name: "top",
      data(){
        return {
          saveSite:'',
          copyValue:'//goto.jd.com/'+getQueryUrl('app_id')+'-'+getQueryUrl('page_id'),
          saveTime:0,
          previewTime:0
        }
      },
      computed: {
        ...mapState(['site','htmlCon','page_id']),
      },
      created(){
        var that=this;
      },

      destroyed() {
      },
      methods:{
        goBack(){
          let that=this;
          if(JSON.stringify(this.site)!=this.saveSite){
            this.$confirm('当前页面未保存，退出将影响您的操作', {
              confirmButtonText: '保存并退出',
              cancelButtonText: '继续设计',
              type: 'warning',
              center: true
            }).then(() => {
              this.saveSketch()
              window.history.go(-1)
            }).catch(() => {

            });
          }else{
            window.history.go(-1)
          }

        },
        preview(){//预览
          let that=this;
          let params={
            "page_id":this.page_id,
            "page_data":JSON.stringify(this.site)
          };
          params=jsList(params);
          let newLink=window.open()
          preview(params).then(res=>{
            if(res.code==0){
              that.previewSite=null;
              that.previewSite=JSON.stringify(that.site)
              newLink.location.href=link().domain+'/app/page/preview?page_id='+that.page_id;
            }else{
              this.$toast(res.msg)
            }
          })
        },
        saveSketch(){//保存草稿
          let params={
            "page_id":this.page_id,
            "page_data":JSON.stringify(this.site)
          },that=this;
          params=jsList(params);
          savePage(params).then(res=>{
            if(res.code==0){
              that.saveSite=null;
              that.saveSite=JSON.stringify(that.site)
              that.$toast('保存草稿成功')
            }else{
              this.$toast(res.msg)
            }
          })
        },
        copy(e){
          e.target.addEventListener('click',()=>{
            const input = document.createElement('input');
            input.setAttribute('readonly', 'readonly');
            input.setAttribute('value', 'hello world');
            document.body.appendChild(input);
            input.setSelectionRange(0, 9999);
            if (document.execCommand('copy')) {
              document.execCommand('copy');
              console.log('复制成功');
            }
            document.body.removeChild(input);

          })


        },
        publish(){//发布
          let that=this;
          let params={
            "page_id":this.page_id,
            "page_data":JSON.stringify(this.site)
          };
          params=jsList(params);

          this.$confirm('是否确认发布该页面？', {
            confirmButtonText: '立即发布',
            cancelButtonText: '再想想',
            type:'warning',
            iconClass:"icon iconfont icon-wenhao p-wenhao",
            center:true,
          }).then(() => {
            publish(params,{withCredentials: true}).then(res=>{
              if(res.code==0){
                const h = that.$createElement;
                that.$msgbox({
                  message: h('div',{'class':"el-message-box__content"}, [
                    h('div',{"class":"el-message-box__status icon iconfont icon-duigou p-success"}),
                    h('h2', null, '页面发布成功'),
                    /*h('h6', null, [
                      '可链接分享给他人 ',
                      h('button', { style: 'color: teal','class':'copyBtn',on: {
                        click:that.copy
                        },attrs:{
                          'data-clipboard-target':"#foo"
                        }}, '复制链接')
                    ]),*/

                  ]),
                  showCancelButton: true,
                  confirmButtonText: '继续设计',
                  cancelButtonText: '返回页面列表',
                  closeOnClickModal:false,
                  center:true,
                }).then(() => {

                }).catch(() => {
                  window.location.href=link().domain+"/app/page/list?app_id="+getQueryUrl('app_id')
                });
              }else{
                this.$toast(res.msg)
              }
            })
          }).catch(() => {
            this.$toast("取消发布")
          });


        },
      },
    }
</script>

<style lang="less">
.p-success{
  color:#6FC60F
}
.p-wenhao{
  color:#5B9BF0
}
</style>
