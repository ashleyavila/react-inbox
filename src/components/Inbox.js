import React, { Component } from 'react'
import Toolbar from './Inbox/Toolbar'
import MessageList from './Inbox/MessageList'
import ComposeForm from './Inbox/ComposeForm'
import {_getMessages, _postMessage, _updateMessages} from '../apiFun'


class Inbox extends Component{
    constructor () {
        super()
        this.state = { mail: [],
            selected: [],
            selectionDisplay: false,
            labelArr: ['dev', 'personal', 'gschool'],
            composing: false
        }
        this.toolbarFun = {
            markRead: this.markRead.bind(this),
            markUnread: this.markUnread.bind(this),
            markAllChecked: this.markAllChecked.bind(this),
            markAllUnchecked: this.markAllUnchecked.bind(this),
            deleteMessages: this.deleteMessages.bind(this),
            allSelected: this.allSelected.bind(this),
            someSelected: this.someSelected.bind(this),
            noneSelected: this.noneSelected.bind(this),
            selectedIds: this.selectedIds.bind(this),
            countUnread: this.countUnread.bind(this),
            applyLabel: this.applyLabel.bind(this),
            removeLabel: this.removeLabel.bind(this),
            toggleCompose: this.toggleCompose.bind(this)
        }
        this.messageListFun = {
            toggleStarred: this.toggleStarred.bind(this),
            toggleChecked: this.toggleChecked.bind(this),
        }
        this.composeFormFun = {
            sendEventHandler: this.sendEventHandler.bind(this)
        }
    }

    async componentDidMount () {
        await this.refreshMessages()
    }

    componentWillUpdate (nextProps, nextState) {
        nextState.selected = this.selectedIds(nextState)
    }

    async refreshMessages () {
        let messages = await _getMessages()
        this.setState(prev => {
            messages = messages.map(message => {
                if (prev.selected.includes(message.id)) message.selected = true
                return message
            })
            return { ...prev, mail: messages }
        })
    }

    async sendEventHandler (event) {
        event.preventDefault()
        let message = {subject: event.target.subject.value, body: event.target.body.value}
        await _postMessage(message)
        await this.refreshMessages()
        this.toggleCompose()
    }

    countUnread () {
        return this.state.mail.filter(message => !message.read).length
    }

    allSelected () {
        return this.state.mail.every(message => message.selected)
    }

    someSelected () {
        return this.state.mail.some(message => message.selected)
    }

    noneSelected () {
        return this.state.mail.every(message => !message.selected)
    }

    selectedIds (state = this.state) {
        return state.mail.reduce((selArr, message) => {
            return (message.selected) ? [...selArr, message.id] : selArr
        }, [])
    }

    async markRead () {
        let selected = this.selectedIds()
        await _updateMessages(selected, 'read', true)
        await this.refreshMessages()
    }

    async markUnread () {
        let selected = this.selectedIds()
        await _updateMessages(selected, 'read', false)
        await this.refreshMessages()
    }

    markAllChecked () {
        this.setState(prev => {
            let mail = prev.mail.map(message => {
                return {...message, selected: true}
            })
            return {...prev, mail}
        })
    }

    markAllUnchecked () {
        this.setState(prev => {
            let mail = prev.mail.map(message => {
                return {...message, selected: false}
            })
            return {...prev, mail}
        })
    }

    async applyLabel (label) {
        let selected = this.selectedIds()
        await _updateMessages(selected, 'addLabel', label)
        await this.refreshMessages()
    }

    async removeLabel (label) {
        let selected = this.selectedIds()
        await _updateMessages(selected, 'removeLabel', label)
        await this.refreshMessages()
    }

    async deleteMessages () {
        let selected = this.selectedIds()
        await _updateMessages(selected, 'delete')
        await this.refreshMessages()
    }

    async toggleStarred (messageId) {
        let newVal = !this.state.mail.filter(message => message.id === messageId)[0].starred
        await _updateMessages([messageId], 'star', newVal)
        await this.refreshMessages()
    }

    toggleChecked (messageId) {
        this.setState(prev => {
            let mail = prev.mail.map(message => message.id === messageId ? {...message, selected: !message.selected} : message)
            return {...prev, mail}
        })
    }

    toggleCompose () {
        this.setState(prev => {
            let composing = !prev.composing
            return {...prev, composing}
        })
    }

    render () {
        return (
            <div className = "container-fluid">
                <Toolbar mail = {this.state.mail} toolbarFun = {this.toolbarFun} labelArr = {this.state.labelArr} />
                {this.state.composing ? <ComposeForm composeFormFun={this.composeFormFun}/> : ''}
                <MessageList mail = {this.state.mail} messageListFun = {this.messageListFun} labelArr = {this.state.labelArr} />
            </div>
        )
    }
}

export default Inbox