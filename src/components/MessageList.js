import React, { Component } from 'react'
import Message from "./Message";
class MessageList extends Component {

    render() {
        const {messages} = this.props;
        return (
            <div className="message-list">
                {messages.map(message => {
                    return (
                        <Message message={message} key={message.id}/>
                    )
                })}
            </div>
        )
    }
}

export default MessageList
