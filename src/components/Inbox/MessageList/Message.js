import React, { Component } from 'react'
import Star from './Message/Star'
import Subject from './Message/Subject'
import Checkbox from './Message/Checkbox'
import Labels from './Message/Labels'

class Message extends Component{
  constructor (props) {
    super(props)
    this.messageFun = this.props.messageListFun
    this.checkBoxCallback = this.checkBoxCallback.bind(this)
    this.starCallback = this.starCallback.bind(this)
  }

  checkBoxCallback (e) {
    this.messageFun.toggleChecked(this.props.message.id)
  }

  starCallback (e) {
    this.messageFun.toggleStarred(this.props.message.id)
  }

  render () {
    return (
      <div className={`row message ${this.props.message.read ? 'read' : 'unread'} ${this.props.message.selected ? 'selected' : ''}`}>
        <div className="col-xs-1">
          <div className="row">
            <Checkbox isChecked = {this.props.message.selected} callback = {this.checkBoxCallback} />
            <Star filled = {this.props.message.starred} callback = {this.starCallback} />
          </div>
        </div>
        <div className="col-xs-11">
          <Labels labelArr = {this.props.message.labels} />
          <Subject messageSub = {this.props.message.subject} />
        </div>
      </div>
    )
  }
}

export default Message