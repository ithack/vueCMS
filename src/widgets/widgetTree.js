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
  icon: 'icon-loucengrongqi',
  attrId:1,
  list:[{
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
  }]
},{
  text:"布局容器",
  icon:'icon-bujurongqi',
  attrId:1,
  list:[{
    name: '布局1',
    icon: 'icon-loucengrongqi',
    temId: 1,
    placeholder: {
      type: 'the-section',
      temId: 1,
      children: []
    }
  }, {
    name: '布局2',
    icon: 'icon-bujurongqi',
    temId: 3,
    placeholder: {
      type: 'paragraph'
    }
  }, {
    name: '布局3',
    icon: 'icon-daohang',
    temId: 4,
    placeholder: {
      type: 'floor'
    }
  }]
},{
  text:"导航类",
  icon:'icon-daohang',
  attrId:1,
  list:[{
    name: '导航1',
    icon: 'icon-bujurongqi',
    temId: 3,
    placeholder: {
      type: 'paragraph'
    }
  }, {
    name: '导航2',
    icon: 'icon-daohang',
    temId: 4,
    placeholder: {
      type: 'floor'
    }
  }]
},{
  text:"图文广告",
  icon:'icon-tuwen',
  attrId:1,
  list:[{
    name: '图文1',
    icon: 'icon-bujurongqi',
    temId: 3,
    placeholder: {
      type: 'paragraph'
    }
  }, {
    name: '图文2',
    icon: 'icon-daohang',
    temId: 4,
    placeholder: {
      type: 'floor'
    }
  }]
},{
  text:"商品类",
  icon:'icon-shangpin',
  attrId:1,
  list:[{
    name: '商品1',
    icon: 'icon-bujurongqi',
    temId: 3,
    placeholder: {
      type: 'paragraph'
    }
  }, {
    name: '商品2',
    icon: 'icon-daohang',
    temId: 4,
    placeholder: {
      type: 'floor'
    }
  }]
},{
  text:"活动类",
  icon:'icon-huodong',
  attrId:1,
  list:[{
    name: '活动1',
    icon: 'icon-bujurongqi',
    temId: 3,
    placeholder: {
      type: 'paragraph'
    }
  }, {
    name: '活动2',
    icon: 'icon-daohang',
    temId: 4,
    placeholder: {
      type: 'floor'
    }
  }]
},{
  text:"基本类",
  icon:'icon-shezhi',
  attrId:1,
  list:[{
    name: '基本1',
    icon: 'icon-bujurongqi',
    temId: 3,
    placeholder: {
      type: 'paragraph'
    }
  }, {
    name: '基本2',
    icon: 'icon-daohang',
    temId: 4,
    placeholder: {
      type: 'floor'
    }
  }]
},{
  text:"其他类",
  icon: 'icon-qita',
  attrId:1,
  list:[{
    name: '其他1',
    icon: 'icon-bujurongqi',
    temId: 3,
    placeholder: {
      type: 'paragraph'
    }
  }, {
    name: '其他2',
    icon: 'icon-daohang',
    temId: 4,
    placeholder: {
      type: 'floor'
    }
  }]
}]
export default tabTree
