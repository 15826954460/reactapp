import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { Routes } from '../config/router';
import {GlobalStyle} from '../style/reset.js'
export default class App extends Component {
  render() {
    return (
      <div>
        <GlobalStyle>></GlobalStyle>
        {/* <h1>App</h1> */}
        {/* <ul>
          <li><Link to="/">welcome</Link></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/Inbox">Inbox</Link></li>
          <li><Link to="/Message">Message</Link></li>
        </ul> */}
        <Switch>
          <Routes />
        </Switch>
      </div>
    )
  }
}
