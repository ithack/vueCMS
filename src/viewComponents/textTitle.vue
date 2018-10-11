<template>
  <div class="component" :style="node.styl" :component-name="node.name">{{node.other.title}}</div>
</template>

<script>
    export default {
      name: "textTitle",
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
