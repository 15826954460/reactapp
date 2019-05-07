import React, { Component } from "react";
import WebAPI from '../../config/webAPI';
import { observer } from 'mobx-react';
import Nav from '../../components/nav'

@observer
export default class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      guessCity: '',   //当前城市
      guessCityid: '', //当前城市id
      hotcity: [],     //热门城市列表
      groupcity: {},   //所有城市列表
      data: null,
      isLoading: true,
      isError: false,
    };
  }

  componentDidMount() {
    WebAPI.citys.gucessCity({ type: 'guess' }).then((res) => {
      console.log(`获取当前城市结果为：${JSON.stringify(res)}`)
      this.setState({
        guessCity: res.name,
        guessCityid: res.id
      })
    })

    WebAPI.citys.hotCity({ type: 'hot' }).then((res) => {
      console.log(`获取热门城市结果为：${JSON.stringify(res)}`)
      this.setState({
        hotcity: res
      })

    })

    WebAPI.citys.hotCity({ type: 'group' }).then((res) => {
      console.log(`获取所有城市结果为：${JSON.stringify(res)}`)
      this.setState({
        groupcity: res
      })
    })
  }

  componentWillMount() {
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <Nav name='99999'/>
        <p style={{ fontSize: 30, backgroundColor: 'blue' }} >homehome</p>
        <div style={{ height: 100, backgroundColor: '#434343' }}>
          Hello World!
        </div>

      </div>
    );
  }
}
