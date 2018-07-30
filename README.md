vue_cms-x
====
可视化拖拽系统

TODOS:

1.埋点

2.组件拆分优化

拖拽项目文件

config  配置打包版本，打包后js地址等公用信息文件

src/assets.     less，img，iconfont文件

src/layout.  layout文件

Src/components.  组件文件，index配置对外输出组件，添加组件 必需配置

src/mock。 axios通用配置

src/tpl。  可视化html模版

src/widgets。 JSON Tree的JS维护和其他JS文件

Page.vue  为新建拖拽组件的模版，复制后使用

api.js.   所有接口配置文件，区分测试和线上环境请求不同接口

执行项目：

```
npm i
//安装依赖包
npm run dev
//默认dev的接口链接的是后端测试机，所以需要如下hsots配置
//如果不想配置 可直接跑预发后端预发环境接口仿照pre自行配置
//本地开发
npm run build
//打包生成dist文件，copy到cdn上
```

util.js 公用js插件文件包括：

2. 发布保存等操作给后端入参的JS列表方法：jsList(p),p=需要给后端的入参对象


组件开发步骤：

1。Src/components里创建vue文件，同时在index.js里创建异步组件方法例`ordinaryProduct:()=>import('./ordinaryProduct')`

2。widgets-->widgets.js配置相关组件信息



