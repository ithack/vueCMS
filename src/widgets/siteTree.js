/**
 * 2018/5/16
 * Created by yangkai9
 */
let siteTree = {
  "type": "page",
  "name": "页面",
  "index": 0,
  "config": [{
    "key": "pid",
    "value": "123456789",
    "text": "组件id",
    "type": "text"
  }, {
    "style": "padding",
    "value": ["0px", "0px", "0px", "0px"],
    "text": "外边距",
    "type": "css"
  }, {
    "style": "backgroundColor",
    "value": "#fff",
    "text": "背景色",
    "type": "color"
  }],
  "children": [{
    "type": "the-section",
    "children": [],
    "config": [{
      "id": 10,
      "title": "楼层ID",
      "name": "pool_id",
      "remark": "  ",
      "val_type": 1,
      "ui_type": 1,
      "default_val": "2",
      "is_must": 1,
      "options": []
    }, {
      "id": 8,
      "title": "外边距",
      "name": "margin",
      "remark": "css",
      "val_type": 1,
      "ui_type": 1,
      "default_val": ["10px", "0", "10px", "0"],
      "is_must": 1,
      "options": []
    }, {
      "id": 9,
      "title": "背景色",
      "name": "backgroundColor",
      "remark": "css",
      "val_type": 1,
      "ui_type": 6,
      "default_val": "red",
      "is_must": 1,
      "options": []
    }, {
      "id": 59,
      "title": "背景图",
      "name": "backgroundImage",
      "remark": "css",
      "val_type": 1,
      "ui_type": 7,
      "default_val": "dsf",
      "is_must": 0,
      "options": []
    }],
    "styl": {
      "margin": "10px 0 10px 0",
      "backgroundColor": "red",
      "backgroundImage": "url(dsa)"
    },
    "other": {
      "pool_id": "2"
    },
    "id": 1000,
    "name": "楼层容器"
  }]
}
export default siteTree
