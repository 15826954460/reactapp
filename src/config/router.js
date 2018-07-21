import React from 'react';
import {Route} from 'react-router-dom';
import Loadable from 'react-loadable';
const Loading = () => <div>Loading...</div>;
const Welcome = Loadable({
  loader: () => import('../pages/welcome'),
  loading: Loading,
});
const About = Loadable({
  loader: () => import('../pages/about'),
  loading: Loading,
});
const Inbox = Loadable({
  loader: () => import('../pages/inbox'),
  loading: Loading,
});
const Message = Loadable({
  loader: () => import('../pages/message'),
  loading: Loading,
});
export default () => {
  return [
    <Route path='/' component={Welcome} exact={true} key={'welcome'}/>,
    <Route path='/About' component={About} key={'About'}/>,
    <Route path='/Inbox' component={Inbox} key={'Inbox'}/>,
    <Route path='/Message' component={Message} key={'Message'}/>,
  ]
}
