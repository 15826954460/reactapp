import {observable, action, computed} from 'mobx';

export const UserInfo = observable({
  // 用户信息
  @observable data: {
    count: 0

  },

  // 实时极计算
  @computed get msg() {
    console.log(UserInfo.data.count)
  },

  // 修改用户信息
  @action updateData(data) {
    UserInfo.data = {
      ...UserInfo.data,
      ...data
    };
  },

  // 重置用户信息
  @action resetData() {
    UserInfo.data = {};
  },
});
