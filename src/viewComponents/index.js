// 导入JSON 树中所涉及的所有节点
import Page from './../components/Page.vue'  //组件模版用
// import Paragraph from './Paragraph'
import TheSection from './TheSection'
// import footerComponent from './footerComponent'
export default {
  // Paragraph,
  TheSection,
  HeaderComponent:() => import('./HeaderComponent'),
  scrollActive:()=>import('./scrollActive'),//锚点导航
  // footerComponent,
  textTitle:()=>import('./textTitle'),
  imgTitle:()=>import('./imgTitle'),
  swipeBanner:()=>import('./swipeBanner'),
  ordinaryProduct:()=>import('./ordinaryProduct'),//普通商品
  hotImage:()=>import('./hotImage'),//图片热区
  passBanner:()=>import('./passBanner'),//通栏广告
  textLink:()=>import('./textLink'),//文字链
  brandList:()=>import('./brandList'),//品牌列表
  startEffect:()=>import('./startEffect'),//启动动效
}
