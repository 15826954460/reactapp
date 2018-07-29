import {observable, action, computed} from 'mobx';

export const LoadingInfo = observable({
  // 加载动画的变量控制
  @observable data: {
    count: 0,
  },

  // 实时极计算
  @computed get msg() {
    console.log(this.data.count)
  },

  // 修改用户信息
  @action updateData(data) {
    this.data = {
      ...this.data,
      ...data
    };
  },

  @action add() {
    this.data.count += 1
  },

  // 重置用户信息
  @action resetData() {
    this.data = {};
  },
});
