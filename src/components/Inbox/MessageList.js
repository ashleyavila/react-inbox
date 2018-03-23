import React, { Component } from 'react'
import Message from './MessageList/Message'


class MessageList extends Component {
    constructor (props) {
        super(props)
    }

    generateMessageArray = () => {
        let wasteOfSpace = [...this.props.mail]
        wasteOfSpace.sort((a,b) => b.id - a.id)
        return wasteOfSpace.map(message => <Message key = {message.id} message = {message} messageListFun = {this.props.messageListFun} />)
    }

    render () {
        return (
            <div className="container-fluid">
                {this.generateMessageArray()}
            </div>
        )
    }
}


export default MessageList