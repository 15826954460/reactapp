import React, { Component } from "react";
import WebAPI from '../config/webAPI';
import { observer } from 'mobx-react';

@observer
export default class Inbox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
      isError: false,
    };
  }

  componentDidMount() {
    // Loading(true,false)
    WebAPI.topics.topic('topics').then((res) => {
      console.log(res.data)
      /**
       * 2018-58-23
       * cnode 返回的是 boolean: true 根据实际项目进行配置
       */
      setTimeout(() => {
        if (res.success) {
          this.setState({ data: res.data })
        } else {
          this.setState({ data: res.data })
        }
      }, 5000)
    })
  }

  componentWillMount() {
  }

  componentWillUnmount() {
    // this.setState({
    //   data: null,
    //   isLoading: true,
    //   isError: false,
    // })
  }

  render() {
    return (
      <div>
        {/*<h3>{"Inbox"}</h3>*/}
        {this.state.data ? this.state.data[0].id : null}
      </div>
    );
  }
}
