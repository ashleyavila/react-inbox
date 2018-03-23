import React, { Component } from 'react'
import Unread from './Toolbar/Unread'
import Button from './Toolbar/Button'
import Dropdown from './Toolbar/Dropdown'


class Toolbar extends Component {
  constructor (props) {
    super(props)
    this.selectedLabels = this.selectedLabels.bind(this)
    this.checkButtonCallback = this.checkButtonCallback.bind(this)
  }

  composeButton = () => {
    return <Button innerFunc={() => <i className="fa fa-plus"></i>} callback={this.props.toolbarFun.toggleCompose} colorClass='btn-danger'/>
  }

  unreadButton = () => {
    return <Button innerFunc={() => 'Mark As Unread'} callback={this.props.toolbarFun.markUnread} disabled = {this.props.toolbarFun.noneSelected() ? 'disabled' : ''}/>
  }

  readButton = () => {
    return <Button innerFunc={() => 'Mark As Read'} callback={this.props.toolbarFun.markRead} disabled = {this.props.toolbarFun.noneSelected() ? 'disabled' : ''}/>
  }

  trashButton = () => {
    return <Button innerFunc={() => <i className="fa fa-trash-o"></i>} callback={this.props.toolbarFun.deleteMessages} disabled = {this.props.toolbarFun.noneSelected() ? 'disabled' : ''}/>
  }

  checkButtonText = () => {
    if (this.props.toolbarFun.allSelected()) return <i className="fa fa-check-square-o"></i>
    if (this.props.toolbarFun.someSelected()) return <i className="fa fa-minus-square-o"></i>
    if (this.props.toolbarFun.noneSelected()) return <i className="fa fa-square-o"></i>
    return ''
  }

  checkButtonCallback () {
    if (this.props.toolbarFun.allSelected()) {
      return this.props.toolbarFun.markAllUnchecked
    } else {
      return this.props.toolbarFun.markAllChecked
    }
  }

  checkButton = () => {
    return <Button innerFunc = {() => this.checkButtonText()} callback = {this.checkButtonCallback()} />
  }

  applyLabelCallback = (e) => {
    this.props.toolbarFun.applyLabel(e.target.value)
    e.target.selectedIndex = 0
  }

  removeLabelCallback = (e) => {
    this.props.toolbarFun.removeLabel(e.target.value)
    e.target.selectedIndex = 0
  }

  selectedLabels () {
        let usedLabels = {}
        for (let i = 0; i < this.props.mail.length; i++) {
            if (this.props.mail[i].labels.length && this.props.mail[i].selected) {
                this.props.mail[i].labels.forEach(label => {
                  if (label) usedLabels[label] = ''
                })
            }
        }
        usedLabels = Object.keys(usedLabels)
        usedLabels.sort()
        return usedLabels
    }

  render () {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <Unread numUnread = {this.props.toolbarFun.countUnread()} />

          {this.composeButton()}

          {this.checkButton()}

          {this.readButton()}

          {this.unreadButton()}

          <Dropdown optionArr = {this.props.labelArr} nullText = {'Apply Label'} changeCallback = {this.applyLabelCallback} disabled = {this.props.toolbarFun.noneSelected() ? 'disabled' : ''}/>

          <Dropdown optionArr = {this.selectedLabels()} nullText = {'Remove Label'} changeCallback = {this.removeLabelCallback} disabled = {this.props.toolbarFun.noneSelected() ? 'disabled' : ''}/>

          {this.trashButton()}
        </div>
      </div>
    )
  }
}


export default Toolbar