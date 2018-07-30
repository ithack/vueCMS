<template>
  <div id="config_right">
    <div class="config_header">
      <i class="icon iconfont icon-zhankai icon-white" :class="configShow?'':'icon-shouqi'" @click="showCon"></i>
      <h3><span v-if="configShow&&currentConfig">{{config.name}}</span>编辑区</h3>
    </div>
    <dl class="config_dl" >
      <template v-if="configShow">
      <dd class="btn-box">
        <i class="icon iconfont icon-shanchu" @click="del"></i>
        <i class="icon iconfont icon-fuzhi" @click="copyEl"></i>
        <i class="icon iconfont icon-shangyi" @click="moveUp"></i>
        <i class="icon iconfont icon-xiayi" @click="moveDown"></i>
        <!--<i class="icon iconfont" @click="reset">重置</i>-->
        <i class="icon iconfont icon-baocun" v-if="config.name=='楼层容器'" @click="saveCon"></i>
      </dd>
      <dd v-for="(item,pIndex) in config.config">

        <!--色块选择器-->
        <template v-if="item.ui_type==6">
          <label for="">{{item.title}}:</label>
          <color-picker v-model="item.default_val"></color-picker>
        </template>
        <!--图片上传-->
        <template v-else-if="item.ui_type==7">
          <label for="">{{item.title}}:</label>
          <el-upload
            class="avatar-uploader"
            :action="uploadLink"
            name="image"
            :with-credentials="true"
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-error="uploadErr">
            <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
            <i class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">建议上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </template>
        <!--内外边距多值-->
        <template v-else-if="item.name=='margin'|| item.name=='padding'">
          <label for="">{{item.title}}:</label>
          <ul class="input_group">
            <li v-for="(val,i) in item.default_val">{{groupText[i]}}:<input type="text" v-model="item.default_val[i]"></li>
          </ul>
        </template>
        <!--单选框-->
        <template v-else-if="item.ui_type==3">
          <label for="">{{item.title}}:</label>
          <el-radio-group v-model="radio[pIndex]=item.default_val" class="radio_group_flex">
            <el-radio v-for="(sItem,index) in item.options" :key="index" :label="sItem.value">{{sItem.name}}</el-radio>
          </el-radio-group>
        </template>
        <!--复选框-->
        <template v-else-if="item.ui_type==4">
          <label for="">{{item.title}}:</label>
          <el-checkbox-group
            v-model="item.default_val">
            <el-checkbox v-for="(check,index) in item.options" :label="check.value" :key="index">{{check.name}}</el-checkbox>
          </el-checkbox-group>
        </template>
        <!--下拉框-->
        <template v-else-if="item.ui_type==2">
          <label for="">{{item.title}}:</label>
          <el-select v-model="select[pIndex]=item.default_val" placeholder="请选择" size="mini">
            <el-option
              v-for="(sItem,index) in item.options"
              :key="index"
              :label="sItem.name"
              :value="sItem.value">
            </el-option>
          </el-select>
        </template>

        <template v-else>
          <label for="">{{item.title}}:</label>
          <input type="text" v-model="item.default_val">
        </template>
      </dd>
      </template>
    </dl>
  </div>
</template>
<script>
  import { mapMutations, mapState } from 'vuex'
  import { Select, Option,RadioGroup, Radio, CheckboxGroup, Checkbox } from 'element-ui';
  import { VueColorpicker } from 'vue-pop-colorpicker'
  import {link} from "~/widgets/util";

  export default {
    components: {
      'color-picker': VueColorpicker,
      'elSelect': Select,
      'elOption': Option,
      'elRadioGroup': RadioGroup,
      'elRadio': Radio,
      'elCheckboxGroup':CheckboxGroup,
      'elCheckbox':Checkbox
    },
    data() {
          return {
            uploadLink:link().domain+'/common/img/ajaxUpload',
            groupText:['上','右','下','左'],
            defaultList: [],
            imgName: '',
            visible: false,
            select:[],
            checked:{},
            imageUrl:'',
            radio:[],
          }
      },
      computed:{
        ...mapState(['currentConfig','site']),
        configShow:function(){
          return this.$store.state.configShow
        },
        config:function(){/*
          if(this.currentConfig.type=='page'&&this.currentConfig.index==='0'){
            return this.currentConfig
          }else{*/
            let index=this.currentConfig.index;
            console.log(this.currentConfig)
            if(index>=0) {
              this.dekonstruo(this.currentConfig.children[index])
              return this.currentConfig.children[index]
            }
          //}
        }
      },

      mounted(){
        $('.config_dl').css("maxHeight",$(window).height()-70+"px");
        window.onresize=function(){
          $('.config_dl').css("maxHeight",$(window).height()-20+"px");
        }
        $(window).scroll(function(){
          var scrollTop = $(window).scrollTop();
          if(scrollTop < 80)
            $("#config_right").css('top', '80px');
          else
            $("#config_right").css('top', scrollTop +'px');
        });
      },
      methods: {
        ...mapMutations(['delCurrDom', 'sortWidget', 'copyWidget', 'changeShow']),
        handleAvatarSuccess(res, file) {
          let index=this.currentConfig.index;
          this.currentConfig.children[index].config.map(item=>{
            item.name=='backgroundImage'&&(item.default_val=res.data.img_url)
            if(item.name=='image'){item.default_val=res.data.img_url}
          })
        },
        dekonstruo(val){
          val.config.map(item=>{
            if(item.name=='margin'||item.name=='padding'){
              item.default_val=typeof item.default_val=='string'?item.default_val.split(' '):item.default_val;
            }/*else if(item.name=='backgroundImage'){
              item.default_val=this.imageUrl;
            }*/
            if(item.remark === 'css'){
              if(item.name=='backgroundImage'){
                val.styl[item.name]='url('+item.default_val+')'
              }else{
                val.styl[item.name] = typeof item.default_val=='object'?item.default_val.join(' '):item.default_val;
              }
            }else{
              val.other[item.name] = item.default_val
            }
          })
        },
        beforeAvatarUpload(file) {
          const isJPG = (file.type).indexOf("image/")!=-1;
          console.log(file.type)
          const isLt2M = file.size / 1024/ 1024 < 2;
          if (!isJPG) {
            this.$alert('请上传图片文件!');
            return isJPG
          }
          if (!isLt2M) {
            this.$alert('上传图片大小不能超过2M!');
            return isLt2M;
          }
        },
        uploadErr(err){
          this.$toast(err)
        },
        showCon(){
          this.configShow?this.changeShow(false):this.changeShow(true);
        },
        del(){
          this.delCurrDom({section:this.currentConfig.children, oldIndex:this.currentConfig.index})
        },
        /*reset(){
          this.currentConfig.children[this.currentConfig.index].config=[{
            type: 'text',
            value: '重置测试文字',
            key: 'title',
            text: '重置测试'
          }]
        },*/
        copyEl(){
          let oEl=this.currentConfig.children[this.currentConfig.index]
          this.copyWidget({array:this.currentConfig.children, oldIndex:this.currentConfig.index})
        },
        moveUp (){
          let oldIndex = this.currentConfig.index
          if(oldIndex>0){
            this.currentConfig.index--
            this.sortWidget({array:this.currentConfig.children,oldIndex,newIndex: oldIndex-1})
          }else{
            alert('已到顶')
          }

        },
        moveDown(){
          let oldIndex = this.currentConfig.index
          if(oldIndex<this.currentConfig.children.length-1){
            this.currentConfig.index++
            this.sortWidget({array:this.currentConfig.children,oldIndex,newIndex: oldIndex+1});
          }else{
            alert('已到低')
          }
        },
        saveCon(){
          var that=this
          this.$toast('功能暂未开放')
          console.log(JSON.stringify(this.site))
        }
      },
      watch: {
        'currentConfig' : {
          handler: function (val, oldVal) {
            //this.$forceUpdate();
          },
          deep: true
        },
      },

  }
</script>
<style lang="less" >
  #config_right{
    position:absolute;top:70px;right:0;background-color:#fff;max-height:100%;
  }
  input{line-height:26px;border-radius:5px;border:1px solid #ccc;padding:0 6px;}
  .el-select{max-width:100px;}
  .radio_group_flex{display:flex}
  .config_header {
    background-color:#5E9EF3;padding:4px 10px;display:flex;color:#fff;
    &>i {margin-right:12px;}
  }
  .uploader-example {
    width: 100px;height:100px;
    margin: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }
  .uploader-example .uploader-btn {
    margin-right: 4px;width:80px;height:80px;
  }
  .config_dl{
    color:#fff;overflow-y:auto;max-height:500px;

    &>dd{
      color:#333333;font-size:14px;padding:0 5px;margin-bottom:12px;min-width:300px;padding:4px 10px;
      label{
        display:block;padding:6px 0;
        font-weight:bold;
      }
      .label_flex{
        display:flex;justify-content:space-between;
      }
    }

    &>.btn-box{
      display:flex;justify-content: flex-start;
      &>i{
        padding:6px 8px;color:#999;

      }
      &>i:hover{color:#5E9EF3}
    }
  }
  .input_group {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows:40px;
    & input{width:50px;margin-left:10px}
  }
  .el-upload{
    width:120px;height:60px;line-height:60px;border: 1px dashed;
    &>img{
      width:120px;height:60px;
    }
  }
</style>

