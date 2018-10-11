/**
 * 2018/5/16
 * Created by kevin
 */
// 线上
let pro=[{
  text:"页面楼层",
  icon: 'icon-yemianlouceng',
  attrId:1,
  list:[{
    name: '楼层容器',
    icon: 'icon-loucengrongqi',
    model_id: 2,
    w:'floor',
    placeholder: {
      type: 'the-section',
      children: []
    }
  }]
},{
  text:"布局容器",
  icon:'icon-bujurongqi',
  attrId:1,
  list:[{
    name: "文字title",
    icon: 'icon-dingbugudingdaohang',
    model_id: 3,
    placeholder: {
      type: 'text-title'
    }
  },{
    name: "图片title",
    icon: 'icon-dingbugudingdaohang',
    model_id: 4,
    placeholder: {
      type: 'img-title'
    }
  }]
},{
  text:"导航类",
  icon:'icon-daohang',
  attrId:1,
  list:[{
    name: "header组件",
    icon: 'icon-dingbugudingdaohang',
    model_id: 5,
    placeholder: {
      type: 'header-component'
    }
  }]
},{
  text:"图文广告",
  icon:'icon-tuwen',
  attrId:1,
  list:[{
    name: '通栏广告',
    icon: 'icon-tonglanguanggao',
    model_id: 8,
    placeholder: {
      type: 'pass-banner',
    }
  },{
    name: '品牌列表',
    icon: 'icon-pinpailiebiao',
    isClose:false,
    model_id: 14,
    placeholder: {
      type: 'brand-list',
    }
  }]
},{
  text:"商品类",
  icon:'icon-shangpin',
  attrId:1,
  list:[{
    name: '普通商品',
    icon: 'icon-shangpin',
    model_id: 6,
    placeholder: {
      type: 'ordinary-product'
    }
  }]
},{
  text:"活动类",
  icon:'icon-huodong',
  attrId:1,
  list:[]
},{
  text:"基本类",
  icon:'icon-tongyonglei',
  attrId:1,
  list:[{
    name: '图片热区',
    icon: 'icon-tupianrequ',
    model_id: 7,
    placeholder: {
      type: 'hot-image',
    }
  },{
    name: '轮播图',
    icon: 'icon-lunboyangshi',
    model_id: 9,
    placeholder: {
      type: 'swipe-banner',
    }
  },{
    name: "楼层锚点",
    icon: 'icon-loucengmaodian',
    model_id: 10,
    w:'floor',
    placeholder: {
      type: 'scroll-active',
      saveConfig:[]
    }
  }]
},{
  text:"其他类",
  icon: 'icon-qita',
  attrId:1,
  list:[{
    name: "文字链",
    icon: 'icon-wenzilian',
    model_id: 12,
    isClose: false,//提示暂未开发
    placeholder: {
      type: 'text-link',
      saveConfig:[]
    }
  },{
    name: "启动动效",
    icon: 'icon-qidongdongxiao',
    model_id: 13,
    isClose:false,// 提示暂未开发
    w: 'floor', // 配置floor后可拖拽至楼层级别
    placeholder: {
      type: 'start-effect',
      saveConfig:[]
    }
  }]
},{
  text:"楼层导航",
  icon: 'icon-qita',
  attrId:2
}]
let tabTree;
console.log(process.env.NODE_ENV)
/*if(process.env.NODE_ENV=="development"){
  tabTree=dev
}else if(process.env.NODE_ENV=="prefat"){
  tabTree=pre
}else{
  tabTree=pro
}*/
//直接生产cmsx建模型
export default pro
