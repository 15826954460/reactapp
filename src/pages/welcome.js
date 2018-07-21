import React, {Component} from "react";
import {Loading} from '../config/router';
import WebAPI from "../config/axios";
export default class welcome extends Component {

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
      this.setState({
        data: null,
        isLoading: true,
        isError: false,
      })

    }

    componentWillUnmount() {

    }

    render() {
        return (
          <div>
            <h3>{"welcome"}</h3>
            {this.state.data ? this.state.data[0].tab : null}
          </div>
        );
    }
}
