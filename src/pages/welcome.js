import React, {Component} from "react";
// import {Loading} from '../config/router';
// import WebAPI from "../config/axios";
import {LoadingInfo} from '../config/mobx';
import {observer} from 'mobx-react';

@observer
export default class welcome extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.timer = setInterval(() => {
      LoadingInfo.add()
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <div>
        <h3>{"welcome"}</h3>
        <br/>
        <p>{LoadingInfo.data.count}</p>
      </div>
    );
  }
}
