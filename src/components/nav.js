import React, { Component } from "react";
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div style={{widht: "100%", height: 60, backgroundColor: 'red'}}>
       {this.props.name}
      </div>
    );
  }
}