<template>
  <div class="component hot-image" :style="node.styl" :component-name="node.name" >
    <img :src="node.other.image" alt="" class="hot_bg_img">
      <drag v-if="isRenner" v-for="(item,index) in hotStyle" ref="hot" :w="item.w" :h="item.h" :x="item.x" :y="item.y" :key="index" :dragindex="index" @dragstop="onDrag" @resizestop="onResize" :parent="true">
        {{index}}
      </drag>
      <span @click.stop.self="edit" class="add_hot">编辑</span>
      <el-dialog title="热区设置" :visible.sync="dialogFormVisible" :width="'30%'" class="contion" :append-to-body="true" :modal-append-to-body="true">
        <el-row v-for="(item,index) in temHot" :key="index">
          <el-input v-model="item.linkValue" class="input-with-select" size="mini" :placeholder="item.linkType==0?'请输入http://或https://开头的链接地址':'请输入ID数字'">
            <el-select v-model="item.linkType" slot="prepend">
              <el-option v-for="(list,i) in options" :key="i" :label="list.label" :value="list.value"></el-option>
            </el-select>
            <el-button type="danger" slot="append" icon="el-icon-delete" v-if="temHot.length>1" @click="del(index)"></el-button>
          </el-input>
        </el-row>
        <el-row>
          <el-button type="primary" size="mini" @click="add">新增热区</el-button>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click.stop="cacle">取 消</el-button>
          <el-button type="primary" @click.stop="saveEdit">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
  import drag from '~/common/hotDrag'
  export default {
    name: "hotImage",
    props: ['node', 'type'],
    components:{
      drag
    },
    data(){
      return {
        hotStyle:[
          {
            w:80,
            h:30,
            x:20,
            y:30,
            linkType:'0',
            linkValue:''
          }
        ],
        temHot:[],
        isRenner:true,
        defalutHot:{
          w:80,
          h:30,
          x:60,
          y:60,
          linkType:'0',
          linkValue:''
        },
        dialogFormVisible:false,
        activeModle:0,
        activeValue:'0',
        activeInput:'',
        options:[{
          value:'0',
          label:'链接'
        },{
          value:'1',
          label:'商品id'
        },{
          value:'2',
          label:'店铺id'
        }],
        elWidth:0,
        elHeight:0,
      }
    },
    computed: {
    },
    mounted(){
      !this.node.hotStyle&&(this.node.hotStyle=this.hotStyle)||(this.hotStyle=this.node.hotStyle);
      this.node.defaultwh={
        width:$('.hot-image').width(),
        height:$('.hot-image').height()
      }
    },
    watch:{
      'node.styl.height':function(val){
        this.isRenner = false
        this.$nextTick(() => {
          this.isRenner = true
        })
      },
      'node.styl.width':function(val){
        this.isRenner = false
        this.$nextTick(() => {
          this.isRenner = true
        })
      }
    },
    methods:{
      edit(){
        this.dialogFormVisible=true;
        this.temHot.length=0;
        let a=JSON.parse(JSON.stringify(this.hotStyle))
        this.temHot.push(...a);
      },
      del(i){
        this.$confirm('此操作将删除该配置, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.temHot.splice(i,1)
        }).catch(() => {

        });

      },
      add(){
        this.temHot.push({...this.defalutHot})
      },
      saveEdit(){
        this.hotStyle.length=0;
        this.hotStyle.push(...this.temHot)
        this.dialogFormVisible=false
      },
      cacle(){
        this.dialogFormVisible=false;
      },
      onResize: function (x, y, w, h,i) {
        let old=this.hotStyle[i];
        this.hotStyle.splice(i,1,Object.assign(old,{x:x,y:y,w:w,h:h}))
      },
      onDrag: function (x,y,i) {
        this.hotStyle[i].x=x
        this.hotStyle[i].y=y
      }
    },
  }
</script>

<style scoped lang="less">
  .image_title{
    background-repeat:no-repeat;
  }
.hot-image{
  position:relative;box-sizing: border-box;
  .hot_bg_img{position:absolute;width:100%;height:100%;z-index:1}
  .add_hot{position:absolute;z-index:999;color:#5E9EF3;padding:8px 12px;background-color:#fff;cursor:pointer}
  .hot_link{position:absolute;}
}
  .el-row{margin-bottom:10px;}
  .el-input-group__prepend .el-select{
   width:120px;
  }
  .el-input-group__prepend{background-color:#fff}
</style>
