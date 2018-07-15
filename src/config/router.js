import React from 'react'
import {Route, Redirect} from 'react-router-dom'

import TopicIndex from '../pages/topic'
import TopicDetail from '../pages/topic/topicDetail'
import TopicList from '../pages/topic/topicList'

export default () => {
  return [
    <Route path='/'
           render={() => <Redirect to='/TopicList'/>}
           exact={true} key={'index'}/>,
    <Route path='/TopicIndex' component={TopicIndex} key={'topic_index'}/>,
    <Route path='/TopicList' component={TopicList} key={'topic_list'}/>,
    <Route path='/TopicDetail' component={TopicDetail} key={'topic_detail'}/>,
  ]
}
