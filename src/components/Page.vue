<template>
  <div class="component" :style="node.styl" :component-name="node.name">

  </div>
</template>

<script>
  export default {
    name: 'template',
    props: ['node', 'themeColor'],
    data(){
      return {
      }
    },
    computed: {
    },
  }
</script>

<style lang="less">

</style>

