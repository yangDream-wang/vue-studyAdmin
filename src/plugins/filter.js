// 封装过滤器

// 使用方法
// 例: forDate(参数1, 参数2)
// 目的: 我要使用这个方法 forDate(参数1,参数2)
// 调用:  {{scope.row.create_time | forDate(0)}}
// 说明: 
// scope.row.create_time: 参数1 
// forDate(0): 调用此过滤方法, 0:参数2
 

// 根据身份证号码判断男女
let sexIdcardFilter = value => {
  if (!value) {
    return ''
  } else {
    let data = value.substr(16, 1) % 2 === 1 ? '男' : '女'
    return data
  }
}

// 身份证号脱敏('331082199708094687' 转换成 '33108219********87') 第8位开始替换8个
let IDcardHide = num => {
  let data = num.replace(/(\d{8})\d{8}(\d*)/, '$1********$2')
  return data
}

// 手机号脱敏('13912345678' 转换成 '139****5678') 第3位开始替换4个
let telHide = num => {
  let data = num.replace(/(\d{3})\d{4}(\d*)/, '$1****$2')
  return data
}

// 姓名脱敏(小明 转换成 *明   李小明 转换成 李*明   欧阳小明 转换成 欧**明)
let nameHide = name => {
  if (name.length === 2) {
    return new Array(name.length).join('*') + name.substr(-1)
  } else {
    return (
      name.substr(0, 1) + new Array(name.length - 1).join('*') + name.substr(-1)
    )
  }
}
/**
 * 时间戳转日期和时间
 * @param {时间戳} timestamp 
 * @param {0:日期 1:日期时间} num 
 */
let forDate = (timestamp,num=1) => {
    timestamp = timestamp + '';
    timestamp = timestamp.length == 10 ? timestamp * 1000 : timestamp;
    var date = new Date(timestamp);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    if (num == 0) {
      return y + '-' + m + '-' + d;
    } else {
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    }
}

export default {
  sexIdcardFilter,IDcardHide,telHide,nameHide,
  forDate
}