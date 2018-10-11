<template>
  <div class="tree">
    <el-tree
      :data="json"
      :props="defaultProps"
      default-expand-all
      :expand-on-click-node="false"
      @node-click="handleNodeClick">
    </el-tree>
  </div>
</template>

<script>
  import { mapMutations} from 'vuex'
    export default {
      name: "tree",
      props:['json'],
      data(){
        return {
          defaultProps: {
            children: 'children',
            label: 'name'
          }
        }
      },
      methods: {
        ...mapMutations(['setConfig']),
        handleNodeClick(data,node,self) {
          data.index=-1;
           this.setConfig({currDom: data})
           let elId=data.id,
                el=document.querySelector(`[com-id='${elId}']`),
                elTop=el.getBoundingClientRect().top,
                parentEl=document.querySelector('.view_box');
           parentEl.scrollTop=el.offsetTop
        }
      }
    }
</script>

<style scoped>

</style>
