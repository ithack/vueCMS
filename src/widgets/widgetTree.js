/**
 * 2018/5/16
 * Created by yangkai9
 */
/*let Tree = [{
  name: '楼层',
  icon: 'icon-loucengrongqi',
  temId: 1,
  placeholder: {
    type: 'the-section',
    temId: 1,
    children: []
  }
}, {
  name: '布局容器',
  icon: 'icon-bujurongqi',
  temId: 3,
  placeholder: {
    type: 'paragraph'
  }
}, {
  name: '导航',
  icon: 'icon-daohang',
  temId: 4,
  placeholder: {
    type: 'floor'
  }
}]*/
let tabTree=[{
  text:"页面楼层",
  icon: 'icon-yemianlouceng',
  attrId:1,
  list:[{
    name: '楼层容器',
    icon: 'icon-loucengrongqi',
    model_id: 2,
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
    model_id: 17,
    placeholder: {
      type: 'text-title'
    }
  },{
    name: "图片title",
    icon: 'icon-dingbugudingdaohang',
    model_id: 18,
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
    model_id: 13,
    placeholder: {
      type: 'header-component'
    }
  }/*, {
    name: 'footer导航',
    icon: 'icon-dingbugudingdaohang',
    model_id: 2,
    placeholder: {
      type: 'footer-component'
    }
  }*/]
},{
  text:"图文广告",
  icon:'icon-tuwen',
  attrId:1,
  list:[/*{
    name: 'banner',
    icon: 'icon-tuwen',
    model_id: 14,
    placeholder: {
      type: 'banner'
    }
  }*/]
},{
  text:"商品类",
  icon:'icon-shangpin',
  attrId:1,
  list:[{
    name: '普通商品',
    icon: 'icon-shangpin',
    model_id: 15,
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
  list:[]
},{
  text:"其他类",
  icon: 'icon-qita',
  attrId:1,
  list:[]
}]
export default tabTree
