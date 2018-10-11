<template>
  <div class="component image_title" :style="node.styl" :component-name="node.name"></div>
</template>

<script>
    export default {
      name: "imgTitle",
      props: ['node', 'themeColor'],
      data(){
        return {
        }
      },
      computed: {
      },
    }
</script>

<style scoped lang="less">
.image_title{
  background-repeat:no-repeat;
}
</style>
