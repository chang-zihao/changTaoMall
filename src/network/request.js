import axios from 'axios'

export function request(config) {//给这个实力命名为request，之后如果还需要有其他实力，可以在下面再创建
  // 1. 创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000,
  })

  // 2. axios拦截器
  //全局拦截
  //axios.interceptors  
  //拦截请求，use里面有两个参数，都是函数,一个成功，一个失败
  instance.interceptors.request.use(config => {
    //请求成功来到这里
    // console.log(config);
    // 要拦截的情况：
    //1.比如config的一些信息不符合服务器要求，要对信息进行转化
    //2. 比如每次发送网络请求时，都希望在界面中显示一个请求的图标
    // 3. 某些网络请求（比如登录，token）是必须携带一些特殊的信息，如果没有携带，需要拦截，跳转到特定的地方，让用户登录
    return config
  }, err => {
    //请求失败来到这里
    // console.log(err);
  });

  //拦截响应
  instance.interceptors.response.use(res => {//服务器响应过了，所以拿到的是结果
    // console.log(res);
    return res.data //只需要返回data就可以了
  }, err => {
    console.log(err);
  })

  //3. 发送真正的网络请求
  //把config传入实例里才能进行网络请求
  // instance的返回值就是promise，直接返回
  return instance(config)
}