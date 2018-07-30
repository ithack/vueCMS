<template>
  <div class="component paragraph" :style="styl" :component-name="node.name">
    <h1>{{other.title}}</h1>
    <small>333</small>
    <input>
    <div>提交</div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
export default {
  name: 'paragraph',
  props: ['node', 'themeColor','msg'],
  data(){
    return {
    }
  },
  computed: {

  },
  created(){

  },

  methods:{

  }
}
</script>

<style scoped>
.paragraph {
  cursor: move;
}
.paragraph:hover {
  background: #ddd;
}
</style>

