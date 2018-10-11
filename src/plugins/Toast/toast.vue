<template>
  <div v-show='visible' :class="[position]" class='toast'>
    <i>{{message}}</i>
  </div>
</template>

<script>
  export default {
    name: "toast",
    data(){
      return {
        message:"",
        visible:true,
        position: 'middle-bottom'
      }
    }
  }
</script>

<style lang='less' scoped>
  .toast {
    position: fixed;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    word-wrap: break-word;
    padding: rem(10);
    text-align: center;
    z-index: 888;
    @include fontSize(30);
    max-width: 80%;
    color: #fff;
    border-radius: rem(20);
    padding: rem(30) rem(34);
    background: rgba(0, 0, 0, 0.7);
    overflow: hidden;
  }
  .toast.middle {
    top: 50%;
  }
  .toast.top {
    top: 10%;
  }
  .toast.middle-bottom {
    top: 70%;
  }
  .toast.bottom {
    top: 90%;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: transform 0.5s;
  }
  // .fade-enter,
  // .fade-leave-active {
  //   transform: translate(-50%, -50%) scale(0);
  // }
  .fade-enter {
    transform: translate(-50%, -50%) scale(0);
  }
  .fade-leave-active {
    opacity: 0;
  }
</style>
