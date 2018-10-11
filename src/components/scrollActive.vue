<template>
  <div class="component nab_tab_box" :component-name="node.name" :style="node.styl">
    <scroll ref="scrollactive" :offset="offset" :always-track="alwaysTrack" :duration="duration" :click-to-scroll="clickToScroll" :bezier-easing-value="easing" :activeObj="node.other" :style="node.styl">
        <ul class="nav-center">
          <li v-for="(item,index) in el" :style="{'lineHeight':node.styl.height}">
            <a :href="item.floor" v-if="index==0" :style="activeClass" class="scrollactive-item nav-item isActive">{{item.name}}</a>
            <a :href="item.floor" v-else :style="{'color':node.other.fontColor,'width':node.other.otherWidth}" class="scrollactive-item nav-item">{{item.name}}</a>
          </li>
        </ul>
        <p @click.stop.self="edit" class="nav_edit_but" type="text">编辑</p>
    </scroll>
    <el-dialog title="锚点编辑" :visible.sync="dialogFormVisible" :width="'30%'" class="contion" :append-to-body="true" :modal-append-to-body="true">
        <el-row v-for="(item,index) in nav_json" :key="index">
          <el-input v-model="item.name" class="input-with-select" size="mini">
            <el-select v-model="item.floor" slot="prepend">
              <el-option v-for="(list,i) in floor_list" :key="i" :label="'楼层'+(i+1)" :value="list"></el-option>
            </el-select>
            <el-button type="danger" slot="append" icon="el-icon-delete" @click="removeElement(index)"></el-button>
          </el-input>
        </el-row>
        <el-row>
          <el-button type="success" size="mini" @click="addNewElement">+锚点</el-button>
        </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click.stop="cancel">取 消</el-button>
        <el-button type="primary" @click.stop="success">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import scroll from '~/common/scroll'
    export default {
      name: "scroll-active",
      props: ['node', 'type'],
      components:{
        scroll,
      },
      data(){
        return {
          alwaysTrack: false,
          duration: 600,
          clickToScroll: true,
          offset: this.node.other.lineHeight,
          easing: '.5,0,.35,1',

          dialogFormVisible:false,
          nav_json:[],
          floor_list:[]
        }
      },
      computed: {
        numberOfElements() {
          return this.el.length;
        },
        el(){
          return this.node.saveConfig
        },
        activeClass(){
          let obj=this.node.other;
          let activeCss=`background-color:${obj.activeBgColor};background-image:url(${obj.activeBgImg});color:${obj.activeColor};width:${obj.otherWidth}`
          return activeCss
        }
      },
      mounted() {
        let el=document.querySelector('.nab_tab_box');
        this.$off('choose')
      },
      methods: {
        stop(e){
          e.preventDefault();
          return false
        },
        edit(){
          this.dialogFormVisible = true;
          let query=document.querySelectorAll('.floor');
          this.floor_list.splice(0,this.floor_list.length);
          query.forEach(item=>{
            this.floor_list.push('#'+item.id)
          })
        },
        addNewElement() {
          let defaultVal={
            name:'标题',
            floor:''
          }
          this.nav_json.push(defaultVal)
        },
        removeElement(i) {
          this.$confirm('此操作将删除该配置, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.nav_json.splice(i,1)
          }).catch(() => {

          });

        },
        cancel(){
          let that=this;
          this.dialogFormVisible = false;
          this.nav_json.length=0
          this.el.map(item=>that.nav_json.push(item));
        },
        success(){
          let that=this;
          that.el.length=0
          this.nav_json.map(item=>that.el.push(item))
          this.dialogFormVisible = false;
        }
      },
    }
</script>

<style lang="less">
.nab_tab_box{
  position:relative;min-height:24px;
  .nav-center{
    overflow:auto;padding:0 10px;box-sizing:border-box;display:flex;flex-flow:row nowrap;flex-shrink:1;flex-basic:50px;
    li{
      font-size: 14px;text-align:center;padding:0 5px;display:block;
      &:not(:first-child) {
        margin-left: 15px;
      }
    }
    a{
      color:inherit;display:inline-block;min-width:50px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
    }
  }
  .nav_edit_but{position:absolute;line-height:26px;left:0px;top:0;background-color:#fff;color:#5E9EF3;padding:0 8px;}
}
.contion{
  width:80%;margin:0 auto
}
.el-select .el-input {
  width: 100px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.sortable-ghost{z-index:99;}
  .el-row{margin-bottom:10px;}
</style>
