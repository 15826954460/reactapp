import React, {Component} from "react";
import Routes from '../../config/router';
import {Link} from 'react-router-dom'

export default class TopicIndex extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
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
      </div>,
      <Routes key="routes"/>,
    ]
  }
}
