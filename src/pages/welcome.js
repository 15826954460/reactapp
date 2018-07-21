import React, {Component} from "react";

export default class welcome extends Component {

    constructor(props) {
        super(props);
        this.state = {
          data: {},
        };
    }

    componentDidMount() {
    }

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
          <div>
            <h3>{"welcome"}</h3>
          </div>
        );
    }
}
