import React, {Component} from "react";
import WebAPI from '../config/axios';
import {Loading} from '../config/router';

export default class Inbox extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
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
      </div>
    );
  }
}
