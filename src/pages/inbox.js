import React, {Component} from "react";
import WebAPI from '../config/axios';
export default class Inbox extends Component {

    constructor(props) {
        super(props);
        this.state = {
          data: null
        };
    }

    componentDidMount() {
      this.setState({
        data: WebAPI.topics.topic()
      })
    }

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
          <div>
            <h3>{"Inbox"}</h3>
            {this.state.data[0].topic_id}
          </div>
        );
    }
}
