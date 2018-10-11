import toast from './toast.vue'
let Toast={};
Toast.install=(Vue,option={})=>{
  const ToastTem=Vue.extend(toast);
  let removeDom = event => {
    if (event.target.parentNode.childNodes.length > 1) {
      event.target.parentNode.removeChild(event.target)
    } else {
      event.target.parentNode.parentNode.removeChild(event.target.parentNode)
    }
  }
  ToastTem.prototype.close=function(){
    this.visible=false;
    this.$el.addEventListener('transitionend',removeDom)
  }
  Vue.prototype.$toast=(option)=>{
    var instance = new ToastTem().$mount(document.createElement('div'));
    let duration = option.duration || option.duration || 2500;
    instance.message = typeof option==='string'? option :option.message;
    instance.position=option.position|| 'middle-bottom'
    document.body.appendChild(instance.$el);
    setTimeout(function () {
      instance.close()
    }, duration)
  }
}
export default Toast
