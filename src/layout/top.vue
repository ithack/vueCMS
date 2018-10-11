<template>
  <header>
    <p class="header_left">
      <span class="header_but a_but" @click="goBack">返回</span>
    </p>
    <p class="header_right">
      <span class="header_but" style="width:140px">
        <el-switch
          @change="autoSave"
          v-model="auto_save"
          inactive-text="自动保存">
      </el-switch>
      </span>
      <span class="header_but text_but" @click="replace_tpl">更换/选择模版 |</span>
      <span class="header_but a_but" @click="preview">预览</span>
      <span class="header_but a_but" @click="save_model">存为模版</span>
      <span class="header_but a_but" @click="saveSketch">保存草稿</span>
      <span class="header_but a_but" @click="publish">提交发布</span>
    </p>
    <el-dialog title="存为模版" :visible.sync="dialogFormVisible" :width="'30%'" class="contion">
      <el-form ref="form" :model="modelFrom" label-width="80px" size="mini">
        <el-form-item label="模版名称" prop="name"
                      :rules="[
                        { required: true, message: '模版名称不能为空'},
                      ]"
        >
          <el-input v-model="modelFrom.name" type="name"></el-input>
        </el-form-item>
        <el-form-item label="模版类型">
          <el-select
            v-model="modelFrom.brand_categroy"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择模版类型">
            <el-option
              v-for="item in brandOptions"
              :key="item.name"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模版类目" >
          <el-select v-model="publicData.category_1st" placeholder="一级类目" @change="selsect1" style="width:120px">
            <el-option
              v-for="item in options1"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="publicData.category_2nd" placeholder="二级类目" @change="selsect2" style="width:120px">
            <el-option
              v-for="item in options2"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="publicData.category_3rd" placeholder="三级类目" style="width:120px">
            <el-option
              v-for="item in options3"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模版图片" prop="thumb_url"
                      :rules="[
                        { required: true, message: '模版图片不能为空'},
                      ]">
          <div class="active-new-img" v-show="modelFrom.thumb_url">
            <img v-if="modelFrom.thumb_url" :src="modelFrom.thumb_url" class="avatar">
            <div class="active-upload-set">
              <i class="icon iconfont icon-shanchu" @click="activUploadImgDel"></i>
            </div>
          </div>
          <el-upload
            v-show="!modelFrom.thumb_url"
            class="avatar-uploader"
            :action="uploadLink"
            name="image"
            :with-credentials="true"
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            >
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="模版描述">
          <el-input v-model="modelFrom.intro" type="name" @input="inputNum" maxlength="30" class="introInput"></el-input>{{testNum}}/30
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.stop="cancel">取 消</el-button>
        <el-button type="primary" @click.stop="success">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="页面模版" :visible.sync="page_model" :width="'60%'" class="contion">
      <el-form ref="pageFrom" :model="pageFrom" label-width="80px" size="mini">
        <el-form-item label="模版类型" style="width:250px;float:left;">
          <el-select v-model="pageFrom.brand_categroy" default-first-option style="width:120px" >
            <el-option
              v-for="item in brandOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模版类目" style="width:600px;float:left">
          <el-select v-model="publicData.category_1st" placeholder="一级类目" @change="selsect1" style="width:120px">
            <el-option
              v-for="item in options1"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="publicData.category_2nd" placeholder="二级类目" @change="selsect2" style="width:120px">
            <el-option
              v-for="item in options2"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="publicData.category_3rd" placeholder="三级类目" style="width:120px">
            <el-option
              v-for="item in options3"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float:left;">
          <el-input placeholder="请输入内容" v-model="pageFrom.search_value" class="input-with-select">
            <el-select v-model="pageFrom.search_type" slot="prepend" placeholder="请选择" class="model_select">
              <el-option label="模版名称" value="1"></el-option>
              <el-option label="模版ID" value="2"></el-option>
              <el-option label="创建人" value="3"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="searchBut"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <ul class="model_list">
        <li v-for="(item,index) in modelList">
          <div class="def_init">
            <img :src="item.thumb_url" alt="">
            <p class="title">{{item.name}}</p>
            <p class="modeId">ID:{{item.id}}</p>
            <p class="modelIntro">{{item.intro}}</p>
          </div>
          <div class="hoverAcitve" v-if="!item.is_current_using">
            <span class="but" @click="modelUse(item)">立即使用</span>
            <span class="but" @click="modelView(item)">预览</span>
            <span class="but" v-if="item.can_delete" @click="modelDel(item,index)">删除</span>
          </div>
          <p class="isUse" v-else>当前使用</p>
        </li>
      </ul>
      <el-pagination
        background
        layout="sizes,prev, pager, next,jumper"
        :page-sizes='pageFrom.pageSizes'
        :page-size="pageFrom.size"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :total="pageFrom.total">
      </el-pagination>
    </el-dialog>
  </header>
</template>

<script>
  import '~/assets/less/header.less'
  import { savePage,publish, preview, getTemType, getCategory, getAllList, createTem, modelUse, modelDel} from '~/server/api'
  import { mapState, mapActions,mapMutations} from 'vuex'
  import { jsList, getQueryUrl,link} from '~/widgets/util'
  import { Checkbox,CheckboxButton,CheckboxGroup,Cascader, Pagination} from 'element-ui';

  export default {
    name: "top",
    components: {
      'elCheckboxGroup':CheckboxGroup,
      'elCheckboxButton':CheckboxButton,
      'elCheckbox':Checkbox,
      'elCascader':Cascader,
      'elPagination':Pagination
    },
    data(){
      return {
        saveSite:'',
        uploadLink:link().domain+'/common/img/ajaxUpload',
        copyValue:'//goto.jd.com/'+getQueryUrl('app_id')+'-'+getQueryUrl('page_id'),
        saveTime:0,
        previewTime:0,
        auto_save:true,
        timer:null,
        dialogFormVisible:false,
        options1:[],
        options2:[],
        options3:[],
        brandOptions:[],
        testNum:0,
        modelFrom:{
          brand_categroy:[],
          name:'',
          thumb_url:'',
          intro:'',
        },
        publicData:{

          category_1st:'',
          category_2nd:'',
          category_3rd:'',
        },
        page_model:false,
        pageFrom:{
          brand_categroy:'',
          search_value:'',
          search_type:'1',
          total:10,
          page:1,
          current_page_id:0,
          size:10,
          pageSizes:[10,20,50,100,200]
        },
        modelList:[]
      }
    },
    computed: {
      ...mapState(['site','htmlCon','page_id']),
    },
    created(){
      var that=this;
    },
    mounted(){
      this.autoSave()
      this.getDefalutDate();
    },
    methods:{
      ...mapActions(['setSite']),
      ...mapMutations(['changeShow']),
      getDefalutDate(){//分类和类目获取
        let that=this;
        console.log("334")
        //同时获取分类和类目
        this.$http.all([
          getCategory({fid:0}),
          getTemType()
        ]).then(that.$http.spread((catRes,typeRes)=>{
          if(catRes.code==0){
            that.options1=[...catRes.data]
          }
          if(typeRes.code==0){
            that.brandOptions=[...typeRes.data];
          }
        }))
      },
      getAllModelList(){//获取模版列表
        let params=Object.assign({},this.pageFrom,this.publicData)
        getAllList(params)
          .then(res=>{
            if(!res.code){
              this.pageFrom.total=res.info.total_count
              this.modelList=res.data;
              this.pageFrom.current_page_id=getQueryUrl('page_id')
            }else{
              this.$toast(res.msg)
            }
          })
          .catch(err=>{
            this.$toast(err)
          })
      },
      goBack(){//返回
        let that=this;
        if(JSON.stringify(this.site)!=this.saveSite){
          this.$confirm('当前页面未保存，退出将影响您的操作', {
            confirmButtonText: '保存并退出',
            cancelButtonText: '继续设计',
            type: 'warning',
            center: true
          }).then(() => {
            console.log("232")
            this.saveSketch()
            window.location.href=link().domain+'/app/page/list?app_id='+getQueryUrl('app_id')
          }).catch(() => {

          });
        }else{
          window.location.href=link().domain+'/app/page/list?app_id='+getQueryUrl('app_id')
        }

      },
      autoSave(){//自动保存
        let _this=this;
        clearTimeout(this.timer)
        if(this.auto_save){
          this.timer=setTimeout(function(){
            console.log("自动保存")
            _this.saveSketch('auto')
          },10000)
        }
      },
      replace_tpl(){//更换模版
        this.page_model=true;
        this.getAllModelList()
      },
      searchBut(){//搜索
        this.getAllModelList()
      },
      modelUse({id}){//使用模版
        let pageId=getQueryUrl('page_id')
        let _this=this;
        this.$confirm('是否使用该模版？', {
          confirmButtonText: '确定',
          cancelButtonText: '再想想',
          type:'warning',
          iconClass:"icon iconfont icon-wenhao p-wenhao",
          center:true,
        }).then(()=>{
          modelUse({tpl_id:id,page_id:pageId})
            .then(res=>{
              if(!res.code){
                _this.setSite(res.data.page_data);
                _this.page_model=!1;
                _this.changeShow(false)
              }else{
                _this.$toast(res.msg)
              }
            })
        })

      },
      /**
       * 模版预览
       * @param item
       */
      modelView(item){
        let newLink=window.open()
        newLink.location.href=item.thumb_url;
      },
      modelDel({id},index){//删除模版
        let _this=this;
        this.$confirm('是否确认删除该模版？', {
          confirmButtonText: '确定',
          cancelButtonText: '再想想',
          type:'warning',
          iconClass:"icon iconfont icon-wenhao p-wenhao",
          center:true,
        }).then(()=>{
          modelDel({id})
            .then(res=>{
              if(!res.code){
                _this.modelList.splice(index,1);
                !_this.modelList.length&&(_this.pageFrom.page--);
                _this.getAllModelList();
                _this.$toast('删除成功！');
              }else{
                _this.$toast(res.msg)
              }
            })
        }).catch(()=>{
        })

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
      save_model(){
        this.dialogFormVisible=true;
        this.publicData={
          category_1st:'',
          category_2nd:'',
          category_3rd:'',
        }
      },
      saveSketch(type){//保存草稿
        let params={
          "page_id":this.page_id,
          "page_data":JSON.stringify(this.site)
        },that=this;
        type=='auto'&&(params.cancelLoad=true)
        params=jsList(params);
        savePage(params).then(res=>{
          if(res.code==0){
            that.saveSite=null;
            that.saveSite=JSON.stringify(that.site)
            type=='auto'&&that.$toast('自动保存成功')||that.$toast('保存草稿成功')
            that.autoSave()
          }else{
            that.$toast(res.msg)
          }
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
      cancel(){
        this.options2.length=0;
        this.options3.length=0;
        this.modelFrom={
          brand_categroy:[],
          name:'',
          thumb_url:'',
          intro:'',
        }
        this.publicData={
          category_1st:'',
          category_2nd:'',
          category_3rd:'',
        }
        this.$refs.form.resetFields();
        this.dialogFormVisible=false
      },
      success(){
        let params=Object.assign({},this.modelFrom,this.publicData)
        params.page_data=JSON.stringify(this.site);
        this.$refs.form.validate((valid) => {
          if (valid) {
            createTem(params)
              .then(res=>{
                if(!res.code){
                  this.$toast('保存模版成功')
                  this.dialogFormVisible=!1;
                  this.modelFrom={
                    name:'',
                    brand_categroy: [],
                    thumb_url:'',
                    intro:'',
                  }
                  this.publicData={
                    brand_categroy:[],
                    category_1st:'',
                    category_2nd:'',
                    category_3rd:'',
                  }
                  this.$refs.form.resetFields();
                }else{
                  this.$toast(res.msg)
                }
              })
          } else {
            return false;
          }
        });

      },
      //类目事件
      selsect1(val) {
        let that=this;
        getCategory({fid:val})
          .then(res=>{
            if(!res.code){
              this.publicData.category_2nd=''
              this.publicData.category_3rd=''
              that.options2=[...res.data]
            }

          })
      },
      selsect2(val) {
        let that=this;
        getCategory({fid:val})
          .then(res=>{
            if(!res.code){
              this.publicData.category_3rd=''
              that.options3=[...res.data]
            }
          })
      },
      activUploadImgDel(obj){
        this.modelFrom.thumb_url="";
      },
      handleAvatarSuccess(res, file) {
        this.modelFrom.thumb_url=res.data.img_url
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
      handleCurrentChange(val){
        this.pageFrom.page=val;
        this.getAllModelList(this.pageFrom)
      },
      handleSizeChange(val){
        this.pageFrom.size=val;
        this.getAllModelList()
      },
      inputNum(){
        this.testNum=this.modelFrom.intro.length
      }
    },
  }
</script>

<style lang="less" scoped>
  .p-success{
    color:#6FC60F
  }

  .el-select{width:200px;max-width:none;}
  .input-with-select{
    .model_select{width:100px}
    width:340px;
  }
  .introInput{width:200px;margin-right:6px;}
  .text_but{color:#5E9EF3}
  .p-wenhao{color:#5B9BF0}
  .model_list{
    width:100%;display:flex;flex-wrap: wrap;margin:14px 0;
    li{
      width:176px;height:280px;margin:15px 0 0 15px;box-shadow: #333333 2px 2px 10px;position:relative;
      img{width:100%;height:210px;}
      .def_init{
        p{
          text-indent:12px;line-height:20px;text-overflow:ellipsis;width:100%;word-wrap: normal;overflow:hidden;
        }
      }
      .hoverAcitve{
        display:none;position:absolute;width:100%;height:100%;background-color:rgba(0,0,0,.5);left:0;top:0;box-sizing:border-box;padding:80px 50px;
        span{
          display:block;width:80px;line-height:30px;margin-bottom:12px;text-align:center;
        }
      }
      .isUse{position:absolute;line-height:30px;color:#fff;text-align:center;left:0;top:0;width:100%;background-color:rgba(0,0,0,.4)}
      &:hover .hoverAcitve{display:block;}
    }
  }
</style>
