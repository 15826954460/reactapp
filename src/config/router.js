import React from 'react';
import {Route} from 'react-router-dom';
import Loadable from 'react-loadable';
// 该组件可用于全局的页面动画加载
const Loading = ({isLoading, isError}) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  else if (isError) {
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  else {
    return null;
  }
};
// 所有页面的引入
const Welcome = Loadable({
  loader: () => import('../pages/welcome'),
  loading: Loading,
});
const About = Loadable({
  loader: () => import('../pages/about'),
  loading: Loading,
  delay: 300
});
const Inbox = Loadable({
  loader: () => import('../pages/inbox'),
  loading: Loading,
  delay: 300
});
const Message = Loadable({
  loader: () => import('../pages/message'),
  loading: Loading,
  delay: 300
});
// 路由配置
const Routes = () => {
  return [
    <Route path='/' component={Welcome} exact={true} key={'welcome'}/>,
    <Route path='/About' component={About} key={'About'}/>,
    <Route path='/Inbox' component={Inbox} key={'Inbox'}/>,
    <Route path='/Message' component={Message} key={'Message'}/>,
  ]
}
export {Loading, Routes}
