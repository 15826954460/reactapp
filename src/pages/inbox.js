import React, {Component} from "react";
import WebAPI from '../config/axios';
import {Loading} from '../config/router';

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
    Loading({
      isLoading: this.state.isLoading,
      isError: this.state.isError,
    })
    WebAPI.topics.topic('topics').then((res) => {
      console.log(res.data)
      // cnode 返回的是 boolean: true
      if (res.success) {
        this.setState({
          ...this.state,
          data: res.data,
          isLoading: false,
          isError: false,
        })
      } else {
        Loading({
          ...this.state,
          isLoading: false,
          isError: true,
        })
      }
    })
  }

  componentWillMount() {
  }

  componentWillUnmount() {
    this.setState({
      data: null,
      isLoading: true,
      isError: false,
    })
  }

  render() {
    return (
      <div>
        <h3>{"Inbox"}</h3>
        {this.state.data ? this.state.data[0].id : null}
      </div>
    );
  }
}
