import axios from "axios";

let customAxios = axios.create({
  /**
   * 开发环境：/android-task/ 本地代理到测试环境
   * 正式环境：https://micro.api.wps.com/android-task/
   */
  baseURL: 'https://elm.cangdu.org',
  timeout: 60000, // 默认请求超时时间
  // 设置请求头格式：用自定义的覆盖 axios 自带的 'Content-Type': 'application/x-www-form-urlencoded'
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: "" // 权限鉴别字段默认为空
  },
  withCredentials: true, // 请求凭证
  // 使用自定义的验签头
  auth: {
    username: "",
    password: ""
  },
  responseType: "json" // 默认的相应数据格式
});

const webApiConfig = {
  startToLoading: 600, // 600ms内网络请求无响应，则展现loading动画
  loadingTimeout: 30000, // loading 动画超时时间
  requestInstanceStack: new Map(), // 请球拦截
  responseInstanceStack: new Map(), // 响应拦截
  /**  自定义一个 axios 实例 */
  instance: customAxios,
  /**  post 传参序列化  (添加请求拦截器) */
  setRequestInterceptors: interfaceKey => {
    let _requestInstance = webApiConfig.instance.interceptors.request.use(
      config => {
        /** 根据实际业务写逻辑 */
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    /** 将请求拦截放到拦截栈中 */
    webApiConfig.requestInstanceStack.set(interfaceKey, _requestInstance);
  },
  /**  移除请求拦截器 */
  removeRequestInterceptors: interfaceKey => {
    webApiConfig.instance.interceptors.request.eject(
      webApiConfig.requestInstanceStack.get(interfaceKey)
    );
  },
  // 设置响应拦截
  setResponseInterceptors: interfaceKey => {
    /** 返回状态判断  (添加响应拦截器) */
    let _responseInstance = webApiConfig.instance.interceptors.response.use(
      res => {
        /** 根据实际业务写逻辑 */
        return res;
      },
      error => {
        return Promise.reject(error);
      }
    );
    /** 将响应拦截放到拦截栈中 */
    webApiConfig.responseInstanceStack.set(interfaceKey, _responseInstance);
  },
  /**  移除响应拦截器 */
  removeResponseInterceptors: interfaceKey => {
    webApiConfig.instance.interceptors.response.eject(
      webApiConfig.responseInstanceStack.get(interfaceKey)
    );
  }
};

/** 开始请求接口 */
// function startLoading() {
  // let _loadInstance = null;
  // let _startTimer = setTimeout(() => {
  //   _loadInstance = bouncedUtils.loading.show;
  //   _loadInstance();
  //   _startTimer = null;
  // }, webApiConfig.startToLoading);
  // let _overTimer = setTimeout(() => {
  //   bouncedUtils.toast.show({ content: "请求超时\n请检查网络" });
  //   _overTimer = null;
  // }, webApiConfig.loadingTimeout);
  // return [_startTimer, _overTimer, _loadInstance];
// }

/** 请求接口结束 */
// function endLoading() {
  // clearTimeout(startLoading()[0]);
  // clearTimeout(startLoading()[1]);
  // startLoading()[2] instanceof Function && bouncedUtils.loading.hide();
// }

/** 启用拦截 */
function startInterceptors(interfaceKey) {
  webApiConfig.setRequestInterceptors(interfaceKey);
  webApiConfig.setResponseInterceptors(interfaceKey);
}

/** 删除拦截和改拦截实例 */
function deleteInterceptors(interfaceKey) {
  webApiConfig.requestInstanceStack.delete(interfaceKey);
  webApiConfig.removeRequestInterceptors(interfaceKey);
  webApiConfig.removeResponseInterceptors(interfaceKey);
}

/** 关于取消请求的相关方法 */
function cancelFetch(cancel, interfaceKey) {
  /** 保存取消请求的实例对象 */
  let _cancelObj = {};
  if (!_cancelObj.cancel) {
    _cancelObj = {
      key: interfaceKey,
      cancel: null
    };
  } else if (_cancelObj.cancel) {
    /** 取消请求,并重置数据 */
    _cancelObj.cancel();
    _cancelObj = {};
  }
  return _cancelObj;
}

// 对 get 请求简易封装
export function getFetch({
  url = "",
  params = {},
  interfaceKey = "",
  cancel = false
} = {}) {
  !cancel && startInterceptors(interfaceKey); // 开启请求拦截
  if (cancelFetch(cancel, interfaceKey).cancel) return;
  /** 这里使用 promise 进行就建议包装是为了更友好的将数据的处理暴露在业务层 */
  return new Promise((resolve, reject) => {
    // startLoading();
    webApiConfig
      .instance({
        method: "get",
        url: url,
        params: params,
        cancelToken:
          (cancel &&
            webApiConfig.instance.CancelToken(function executor(c) {
              // executor 函数接收一个 cancel 函数作为参数
              cancelFetch(cancel, interfaceKey).cancel = c;
            })) ||
          ""
      })
      .then(response => {
        // endLoading();
        deleteInterceptors(interfaceKey); // 删除拦截器以及其实例
        if (response.status === 200) {
          /** 这里也可以通过制定的成功的毁掉函数来返回数据 */
          return resolve(response.data);
        } else {
          /**
           * 这里的数据处理请根据实际业务来操作
           * 比如指定跳转到某页面
           */
        }
      })
      .catch(error => {
        console.log(`请求当前的接口为 ${url} 错误信息为 ${error}`);
        /**
         *  这里可以配置一些关于操作失败的提示信息：比如获取数据失败等等
         *  或者失败的毁掉函数
         */
        reject(error);
      });
  });
}

// 对 post 请求简易封装
export function postFetch({
  url = "",
  params = {},
  interfaceKey = "",
  cancel = false
} = {}) {
  !cancel && startInterceptors(interfaceKey); // 开启请求拦截
  /** 针对可以取消请求的操作做一些响应的处理 */
  if (cancelFetch(cancel, interfaceKey).cancel) return;
  /** 这里使用 promise 进行就建议包装是为了更友好的将数据的处理暴露在业务层 */
  return new Promise((resolve, reject) => {
    /** 配置请求是否加载动画 */
    webApiConfig
      .instance({
        method: "post",
        url: url,
        data: params,
        cancelToken:
          (cancel &&
            webApiConfig.instance.CancelToken(function executor(c) {
              // executor 函数接收一个 cancel 函数作为参数
              cancelFetch(cancel, interfaceKey).cancel = c;
            })) ||
          ""
      })
      .then(response => {
        // endLoading();
        deleteInterceptors(interfaceKey); // 删除拦截器以及其实例
        if (response.status === 200) {
          return resolve(response.data);
        } else {
          /**
           * 这里的数据处理请根据实际业务来操作
           * 比如指定跳转到某页面
           */
        }
      })
      .catch(error => {
        /**
         * 这里可以配置一些关于操作失败的提示信息：比如获取数据失败等等
         * reject 方法的参数会传到外部的catch方法，建议关于提示信息统一封装在这里处理，不要放到业务层
         */
        console.log(`请求当前的接口为 ${url} 错误信息为 ${error}`);
        reject(error);
      });
  });
}
