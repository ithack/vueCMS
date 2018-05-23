import Mock from 'mockjs'
Mock.mock('http://config.json', 'get', [
  {
    style: 'width',
    value: '800px',
    text: '宽',
    type: 'css'
  },
  {
    style: 'backgroundColor',
    value: '#fff',
    text: '背景色',
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
