import { getFetch, postFetch } from "./apiConfig";
/**
 *  针对每个页面的接口进行 请求 api 的配置
 *  cancel 参数用来配置改接口是否支持 取消请求操作(其实不是真的取消了接口的请求，而是将then转为了cache操作)
 * */
export default {
  // 获取用户信息
  userInfo: {
    getUserInfo: params => {
      return getFetch({
        url: "/v1/user",
        params,
        interfaceKey: "getUserInfo"
      });
    }
  },
  // 首页信息
  citys: {
    // 获取当前城市
    gucessCity: params => {
      return getFetch({
        url: "/v1/cities",
        params,
        interfaceKey: "getUserInfo"
      });
    },
    // 获取热门城市
    hotCity: params => {
      return getFetch({
        url: "/v1/cities",
        params,
        interfaceKey: "hotCity"
      });
    },
    // 获取所有城市
    groupCity: params => {
      return getFetch({
        url: "/v1/cities",
        params,
        interfaceKey: "groupCity"
      });
    },
  },
  // 任务中心模块
  taskCenter: {
    // 获取任务列表  /android-task/list
    taskList: params => {
      return getFetch({
        url: "/v1/user",
        params,
        interfaceKey: "taskList"
      });
    },
    // 领取奖励 /android-task/receivePrize
    getReword: (params, wps_sid) => {
      return postFetch({
        url: `/receivePrize?wps_sid=${wps_sid}`,
        params: params,
        interfaceKey: "getReword"
      });
    }
  }
};
