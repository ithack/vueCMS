<template>
  <nav class="scrollactive-nav" ref="scrollactive-nav-wrapper">
    <slot></slot>
  </nav>
</template>

<script>
  import bezierEasing from 'bezier-easing';
  export default {
    name:"scroll",
    props: {
      activeClass: {
        type: String,
        default: 'isActive',
      },
      activeObj:{
        type:Object,
        default:''
      },
      offset: {
        type: Number,
        default: 20,
      },

      clickToScroll: {
        type: Boolean,
        default: true,
      },

      duration: {
        type: Number,
        default: 600,
      },

      alwaysTrack: {
        type: Boolean,
        default: false,
      },

      bezierEasingValue: {
        type: String,
        default: '.5,0,.35,1',
      },

      modifyUrl: {
        type: Boolean,
        default: true,
      },

      exact: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        observer: null,
        items: [],
        el:[],
        currentItem: null,
        lastActiveItem: null,
        scrollAnimationFrame: null,
        bezierEasing,
      };
    },
    computed: {
      cubicBezierArray() {
        return this.bezierEasingValue.split(',');
      },
      activeCss(){
        let obj=this.activeObj;
        let activeCss=`background-color:${obj.activeBgColor};background-image:url(${obj.activeBgImg});color:${obj.activeColor};width:${obj.otherWidth}`
        return activeCss
      }
    },
    watch:{
      activeCss:function(value){
        var el=document.querySelector('.isActive')||0;
        if(el){
          el.style.cssText='';
          el.style.cssText=value
        }
      }
    },
    mounted() {
      let that=this;
      const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
      if (!this.observer) {
        // Watch for DOM changes in the scrollactive element wrapper
        this.observer = new MutationObserver(this.initScrollactiveItems);
        this.observer.observe(this.$refs['scrollactive-nav-wrapper'], {
          childList: true,
          subtree: true,
        });
      };
      this.initScrollactiveItems();
      this.removeActiveClass();
      this.currentItem = this.getItemInsideWindow();
      if (this.currentItem) {
        console.log("sss")
        this.currentItem.classList.add(this.activeClass);
        this.currentItem.style.cssText=this.activeCss;
      }else{//加载后默认选中项
        var el=document.querySelector('.nav-center').querySelector('a')||0;
        el&&(el.style.cssText=this.activeCss);
      }
      window.addEventListener('scroll', this.onScroll);
    },
    updated() {
      this.initScrollactiveItems();
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll);
      window.cancelAnimationFrame(this.scrollAnimationFrame);
    },
    methods: {
      onScroll(event) {
        this.currentItem = this.getItemInsideWindow();
        if (this.currentItem !== this.lastActiveItem) {
          this.removeActiveClass();
          this.$emit('itemchanged', event, this.currentItem, this.lastActiveItem);
          this.lastActiveItem = this.currentItem;
        }
        if (this.currentItem) {
          this.currentItem.classList.add(this.activeClass);
          this.currentItem.style.cssText=this.activeCss;
        }

      },

      getItemInsideWindow() {
        let currentItem;
        [].forEach.call(this.items, (item) => {
          const target =item.hash&&document.querySelector(item.hash)||1;
          if (!target) return;
          const isScreenPastSection = window.pageYOffset >= this.getOffsetTop(target) - this.offset;
          const isScreenBeforeSectionEnd = window.pageYOffset <
            (this.getOffsetTop(target) - this.offset) + target.offsetHeight;
          if (this.exact && isScreenPastSection && isScreenBeforeSectionEnd) currentItem = item;
          if (!this.exact && isScreenPastSection) currentItem = item;
        });
        return currentItem;
      },

      initScrollactiveItems() {
        this.items = this.$el.querySelectorAll('.scrollactive-item');
        if (this.clickToScroll) {
          [].forEach.call(this.items, (item) => {
            item.addEventListener('click', this.handleClick);
          });
          return;
        }
        [].forEach.call(this.items, (item) => {
          item.removeEventListener('click', this.handleClick);
        });
      },

      setScrollactiveItems() {
        this.initScrollactiveItems();
      },

      handleClick(event) {
        event.preventDefault();
        const { hash } = event.currentTarget;
        const target = hash&&document.querySelector(hash)||1;
        if (!target) {
          console.warn(`[vue-scrollactive] Element '${hash}' was not found. Make sure it is set in the DOM.`);
          return;
        }

        if (!this.alwaysTrack) {
          window.removeEventListener('scroll', this.onScroll);
          window.cancelAnimationFrame(this.scrollAnimationFrame);
          this.removeActiveClass();
          event.currentTarget.classList.add(this.activeClass);
          console.log(this.activeCss)
          event.currentTarget.style.cssText=this.activeCss;
        }
        this.scrollTo(target).then(() => {
          if (this.modifyUrl) {
            // Update the location hash after we've finished animating
            if (window.history.pushState) {
              window.history.pushState(null, null, hash);
            } else {
              window.location.hash = hash;
            }
          }
        });
      },

      scrollTo(target) {
        return new Promise((resolve) => {
          const targetDistanceFromTop = this.getOffsetTop(target);
          const startingY = window.pageYOffset;
          const difference = targetDistanceFromTop - startingY;
          const easing = this.bezierEasing(...this.cubicBezierArray);
          let start = null;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            let progress = timestamp - start;
            let progressPercentage = progress / this.duration;
            if (progress >= this.duration) progress = this.duration;
            if (progressPercentage >= 1) progressPercentage = 1;
            const perTick = startingY + (easing(progressPercentage) * (difference - this.offset));
            window.scrollTo(0, perTick);
            if (progress < this.duration) {
              this.scrollAnimationFrame = window.requestAnimationFrame(step);
            } else {
              window.addEventListener('scroll', this.onScroll);
              resolve();
            }
          };
          window.requestAnimationFrame(step);
        });
      },

      getOffsetTop(element) {
        let yPosition = 0;
        let nextElement = element;
        while (nextElement) {
          yPosition += (nextElement.offsetTop);
          nextElement = nextElement.offsetParent;
        }
        return yPosition;
      },

      removeActiveClass() {
        [].forEach.call(this.items, (item) => {
          item.classList.remove(this.activeClass);
          item.style.cssText='width:'+this.activeObj.otherWidth
        });
      },
    },
  };
</script>
<style lang="less">
.scrollactive-nav{
  width:100%;overflow:hidden;box-sizing: border-box;
}

</style>
