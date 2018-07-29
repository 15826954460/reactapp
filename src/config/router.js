import React from 'react';
import {Route} from 'react-router-dom';
import Loadable from 'react-loadable';

/**
 * 2018-56-23
 * 组件在加载时提示用户来占位显示 “Loading” 状态的组件。
 * 关于 react-loadable 的配置入门了解  https://www.jianshu.com/p/697669781276
 * 官网自行查看 npm
 */
const Loading = ({error, pastDelay}) => {
  if (error) {
    // 处理 import 组件加载失败的情况
    return <div>Error!</div>;
  } else if (pastDelay) {
    // 该配置的优化是为了当页面加载事件小于300ms时，就不显示loading动画
    return <div>Loading.........</div>;
  } else {
    return null;
  }
};
/**
 * 2018-56-23
 * 所有页面的引入 加载组件 大于200毫秒时 才会显示 loading 动画
 */
const Welcome = Loadable({
  loader: () => import('../pages/welcome'),
  loading: Loading,
  delay: 200
});
const About = Loadable({
  loader: () => import('../pages/about'),
  loading: Loading,
  delay: 200
});
const Inbox = Loadable({
  loader: () => import('../pages/inbox'),
  loading: Loading,
  delay: 200
});
const Message = Loadable({
  loader: () => import('../pages/message'),
  loading: Loading,
  delay: 200
});
/**
 * 2018-56-23
 * 路由配置
 */
const Routes = () => {
  return [
    <Route path='/' component={Welcome}
           exact={true} key={'welcome'}/>,
    <Route path='/About' component={About} key={'About'}/>,
    <Route path='/Inbox' component={Inbox} key={'Inbox'}/>,
    <Route path='/Message' component={Message} key={'Message'}/>,
  ]
}
export {Loading, Routes}
