import Mock from 'mockjs'
Mock.mock('http://config.json', 'get', [
  {
    key: 'pid',
    value: '123456789',
    text: '组件id',
    type: 'text'
  },
  {
    style: 'width',
    value: 'auto',
    text: '宽',
    type: 'css'
  },

  {
    style: 'margin',
    value: ['0px','0px','0px','0px'],
    text: '内边距',
    type: 'css'
  },
  {
    style: 'padding',
    value: ['0px','0px','0px','0px'],
    text: '外边距',
    type: 'css'
  },
  {
    style: 'backgroundColor',
    value: '#fff',
    text: '背景色',
    type: 'color'
  },
  {
    style: 'backgroundImage',
    value: '',
    text: '背景图',
    key:'img',
    type: 'css'
  },
  {
    type: 'text',
    value: '测试文字',
    key: 'title',
    text: '测试'
  },
  {
    type: 'attr',
    value: '123456',
    key: 'kid',
    text: '数据ID'
  }
])/**
 * 2018/5/18
 * Created by yangkai9
 */
