<template>
  <div class="component" :style="styl | styleFn" :component-name="node.name">

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

<style scoped>

</style>

