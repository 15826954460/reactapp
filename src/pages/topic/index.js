/**
 * 2018-19-15
 * baiyunsong 第三方依赖的引用
 */
import React, {Component} from "react";
import Routes from '../../config/router';
import {observer,} from 'mobx-react';
import {Link} from 'react-router-dom';
/**
 * 2018-19-15
 * baiyunsong 组件以及配置文件的引用
 */
import {UserInfo} from '../../store/store'

@observer
export default class TopicIndex extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setInterval(() => {
      UserInfo.updateData({count: UserInfo.data.count += 1})
    }, 1000)
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return [
      <div key="banner">
        <Link to="/">列表页</Link>
        <br/>
        <Link to="/TopicDetail">详情页</Link>
        <br/>
        {UserInfo.data.count}
      </div>,
      <Routes key="routes"/>,
    ]
  }
}
