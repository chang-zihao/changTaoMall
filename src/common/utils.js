export function debounce(func, delay) {
  // 传入要防抖的函数，和延迟时间
  // 用timer来记录有没有定时器
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer); // 第一次没有timer，直接执行下面。第二次timer就不是空的，会把之前timer清空然后进行下面的代码
    timer = setTimeout(() => {
      // 把timer赋值一个计时器
      func.apply(this, args); // func是传入的函数，传入函数时不能加()，不然就直接调用，传入的就成了函数的返回值
    }, delay); //先延迟，再执行
  };
}

export function formatDate(date, fmt) {     //时间展示样式
  // 获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}
function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};