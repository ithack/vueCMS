// 导入JSON 树中所涉及的所有节点
import Page from './../components/Page.vue'  //组件模版用
// import TheSection from './../components/TheSection.vue' //楼层模版
import Paragraph from './../components/Paragraph.vue'
import Floor from './footerComponent.vue'
import TheSection from './TheSection'
import footerComponent from './../components/footerComponent.vue'
import Banner from './../components/banner'
export default {
  Paragraph,
  TheSection,
  Floor,
  HeaderComponent:() => import('./HeaderComponent'),
  footerComponent,
  textTitle:()=>import('./textTitle'),
  imgTitle:()=>import('./imgTitle'),
  Banner,
  hotImage:()=>import('./hotImage')
}
