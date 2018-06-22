vue_cms-x
====
可视化拖拽系统

TODOS:

1.埋点

2.组件拆分优化

3.过去商品实时价格



###### 项目备注

基本拖拽功能实现实时预览功能基本实现，由于原版本项目中的配置和数据从公司接口拉取，所以把api.js文件中的结构全部替换了，有需要查看完整功能的请直接修改store和widgets修改一下；关于配置项获取可用easymock编写格式如下：

```
{
	"code": 0,
	"msg": "succ",
	"data": {
		"id": 2,
		"name": "楼层模型",
		"type_id": 1,
		"props": [{
			"id": 10,
			"title": "楼层ID",
			"name": "pool_id",
			"remark": "",
			"val_type": 1,
			"ui_type": 1,
			"is_must": 1,
			"options": [],
			"default_val": "2"
		}, {
			"id": 8,
			"title": "外边距",
			"name": "margin",
			"remark": "css",
			"val_type": 1,
			"ui_type": 1,
			"is_must": 1,
			"options": [],
			"default_val": "0 0 10px 0"
		}, {
			"id": 103,
			"title": "内间距",
			"name": "padding",
			"remark": "css",
			"val_type": 1,
			"ui_type": 1,
			"is_must": 0,
			"options": [],
			"default_val": "0 0 0 0"
		}, {
			"id": 9,
			"title": "背景色",
			"name": "backgroundColor",
			"remark": "css",
			"val_type": 1,
			"ui_type": 6,
			"is_must": 1,
			"options": [],
			"default_val": "#ccc"
		}, {
			"id": 59,
			"title": "背景图",
			"name": "backgroundImage",
			"remark": "css",
			"val_type": 1,
			"ui_type": 7,
			"is_must": 0,
			"options": [],
			"default_val": ""
		}]
	}
}
```

