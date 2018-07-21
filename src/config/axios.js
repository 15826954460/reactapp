import axios from 'axios';
import qs from 'qs'; // 用来序列化请求参数
const initConfig = {
  develop: true,// 开发环境 or 正式环境
  development: 'https://cnodejs.org/api/v1/',// 开发环境主域名
  test: '',// 测试环境主域名
}

export function getDomain() {
  const {develop, development, test} = initConfig
  let _domain = develop ? development : test
  return _domain
}

const webApiConfig = {
  /**
   * 2018-46-21
   * 自定义一个 axios 实例
   */
  instance: axios.create({
    baseURL: getDomain(), // 配置基础路径
    timeout: 1000, // 默认请求超时时间
    // 设置请求头格式：用自定义的覆盖 axios 自带的 'Content-Type': 'application/json; charset=UTF-8'
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': '' // 权限鉴别字段默认为空
    }
  }),
  /**
   * 2018-01-21
   * post 传参序列化  (添加请求拦截器)
   */
  setRequestInterceptors: () => {
    webApiConfig.instance.interceptors.request.use((config) => {
      // 针对部分特殊的请求进行参数 序列化
      if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
        if (config.data) {
          // 参数序列化
          config.data = qs.stringify(config.data)
        }
      }
      // 如果有权限鉴别，就加上请求头的taken字段 token 初始话获取本地生成的，实际项目中建议使用 第三方库生成
      if (window.localStorage.token) {
        config.headers.Authorization = localStorage.token
      }
      return config
    }, (error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 移除请求拦截器
   */
  removeRequestInterceptors: () => {
    webApiConfig.instance.interceptors.request.eject(webApiConfig.setRequestInterceptors);
  },
  setResponseInterceptors: () => {
    /**
     * 2018-07-21
     * 返回状态判断  (添加响应拦截器)
     */
    webApiConfig.instance.interceptors.response.use((res) => {
      // 针对响应返回的数据进行操作
      if (res.status === 404) return
      if (res.status === 200 || res.status === 304 || res.status === 400) {
        let data = res.data
        /**
         * 2018-10-21
         * 这里可以进行一些数据渲染前的处理，比如后台的超时重定向 具体的 code(返回码) 根据实际开发后台定义的接口来定
         * 案列为 510
         */
        if (data.success && data.success === 510) {
          /*这里可以进行页面的超时重定向*/
        } else {
          return res
        }
      }
    }, (error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 移除响应拦截器
   */
  removeResponseInterceptors: () => {
    webApiConfig.instance.interceptors.response.eject(webApiConfig.setResponseInterceptors);
  },
}

// 对 get 请求简易封装
export function getFetch(url, params) {
  webApiConfig.setRequestInterceptors()
  webApiConfig.setResponseInterceptors()
  return new Promise((resolve, reject) => {
    webApiConfig.instance({
      method: 'get',
      url: url,
      params: params,
    }).then(response => {
      return resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
}

// 对 post 请求简易封装
export function postFetch(url, params) {
  webApiConfig.setRequestInterceptors()
  webApiConfig.setResponseInterceptors()
  return new Promise((resolve, reject) => {
    webApiConfig.instance({
      method: 'post',
      url: url,
      data: params,
    }).then(response => {
      if (response.data.success) {
        return resolve(response.data)
      } else {
        throw new Error("自定义提示信息")
      }
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 2018-51-21
 * baiyunsong 进行 请求 api 的配置
 */
const WebAPI = {
  // 主题页面
  topics: {
    topic: getFetch('topics').then((res) => {
      console.log(res)
      if (res.success) {
        return res.data
      }
    }).cache(err => {
      throw new Error(err)
    })
  }
}


export default WebAPI
