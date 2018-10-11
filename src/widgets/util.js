let NODE_ENV=process.env.NODE_ENV;
// 获取cookie
export function getCookie(name) {
  var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if ( arr = document.cookie.match(reg))
    return (arr[2])
  else
    return null
}

// 设置cookie,增加到vue实例方便全局调用
export function setCookie (c_name, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = c_name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
};

//删除cookie
export function delCookie (name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval != null)
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
};
// 获取url 参数
export function getQueryUrl (variable) {
  var query = window.location.search.substring(1)
  var vars = query.split('&');
  for (var i = 0;i < vars.length;i++) {
    var pair = vars[i].split('=')
    if (pair[0] === variable) { return pair[1] }
  }
  return false
}

export function getHtmlDocName() {
  var str = window.location.href;
  str = str.substring(str.lastIndexOf('/') + 1);
  str = str.substring(0, str.lastIndexOf('.'));
  return str
}

export function link () {
  let url
  if (NODE_ENV === 'development'){
    url = {
      domain: '//kevin.com',
      mItem: '//kevin.com'// 普通商品详情
    }
  } else {
    url = {
      domain: '',
      mItem: '//kevin.com'// 普通商品详情
    }
  }
  return url
}
