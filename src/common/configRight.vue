<template>
  <div>
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
        <i class="icon iconfont icon-baocun" @click="saveCon"></i>
      </dd>
      <dd v-for="(item,pIndex) in config.config">
        <!--组件ID-->
        <template v-if="item.name=='pool_id'">
          <label for="">{{item.title}}:{{item.default_val}}</label>
        </template>
        <!--色块选择器-->
        <template v-else-if="item.ui_type==6">
          <label for="">{{item.title}}:</label>
          <color-picker v-model="item.default_val"></color-picker>
        </template>
        <!--图片上传-->
        <template v-else-if="item.ui_type==7">
          <label for="">{{item.title}}:</label>
          <el-upload
            class="avatar-uploader"
            action="http://www.baidu.com/common/img/ajaxUpload"
            name="image"
            :with-credentials="true"
            :accept="'image/*'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-error="uploadErr">
            <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
            <i class="el-icon-plus avatar-uploader-icon"></i>
            <input type="hidden" v-model="item.default_val=imageUrl">
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
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
          <el-radio-group v-model="radio[pIndex]=item.default_val">
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
  import $ from 'jquery'
  import { VueColorpicker } from 'vue-pop-colorpicker'
  export default {
      data() {
          return {
            color: 'red',
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
            if(index>=0) {
              this.dekonstruo(this.currentConfig.children[index])
              return this.currentConfig.children[index]
            }
          //}
        }
      },

      mounted(){
        // this.uploadList = this.$refs.upload.fileList;
        console.log(this.currentConfig)
      },
      methods: {
        ...mapMutations(['delCurrDom', 'sortWidget', 'copyWidget', 'changeShow']),
        handleAvatarSuccess(res, file) {
          this.imageUrl = res.data.img_url;
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
              console.log(item.name+':'+item.default_val)
            }else{
              val.other[item.name] = item.default_val
            }
          })
        },
        uploadErr(res, file){
          console.log(res,file)
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/*';
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isLt2M) {
            console.log('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
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
            this.currentConfig.index=-1
            this.sortWidget({array:this.currentConfig.children,oldIndex,newIndex: oldIndex-1})
          }else{
            alert('已到顶')
          }

        },
        moveDown(){
          let oldIndex = this.currentConfig.index
          if(oldIndex<this.currentConfig.children.length-1){
            this.currentConfig.index=-1
            this.sortWidget({array:this.currentConfig.children,oldIndex,newIndex: oldIndex+1});
          }else{
            alert('已到低')
          }
        },
        saveCon(){
          var that=this
          console.log(JSON.stringify(this.site))
        }
      },
      watch: {
        'currentConfig' : {
          handler: function (val, oldVal) {
            console.log("configUpdate")
            //this.$forceUpdate();
          },
          deep: true
        },
      },
      components: {
        'color-picker': VueColorpicker,
        'elSelect': Select,
        'elOption': Option,
        'elRadioGroup': RadioGroup,
        'elRadio': Radio,
        'elCheckboxGroup':CheckboxGroup,
        'elCheckbox':Checkbox
      },
  }
</script>
<style type="less" >
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
    color:#fff;overflow-y: scroll;max-height:500px;

    &>dd{
      color:#333333;font-size:14px;padding:0 5px;margin-bottom:12px;min-width:300px;padding:4px 10px;
      &>label{
        display:block;padding:6px 0;
        font-weight:bold;
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

