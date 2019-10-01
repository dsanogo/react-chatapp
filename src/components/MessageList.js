import React, { Component } from 'react'
import ReactDOM from "react-dom";
import Message from "./Message";
class MessageList extends Component {

    componentDidUpdate = () => {
        if(this.shouldScrollToBottom) {
            const node = ReactDOM.findDOMNode(this);
            node.scrollTop = node.scrollHeight
        }
        
    }

    componentWillUpdate = () => {
        const node = ReactDOM.findDOMNode(this);
        this.shouldScrollToBottom = node.clientHeight + node.scrollTop >= node.scrollHeight
    }

    render() {
        const {messages, selectedRoom} = this.props;
        const displayMessages = selectedRoom === undefined ? (
            <div className="emptyRoom">
                <p>No room selected</p>
                <p>Select a room to start chatting</p>
                <p> <span className="arrow">&larr;	</span> Join a room</p>
            </div>
        ) : (
            messages.map(message => {
                return (
                    <Message message={message} key={message.id}/>
                )
            })
        )
        return (
            <div className="message-list">
                {selectedRoom === "" ? '' : (
                    <h3 className="roomName">{selectedRoom}</h3>
                )}

                {selectedRoom !== undefined && messages.length == 0 ? (
                    <div className="noMsg">
                        <h3>No Message found for this room</h3>
                        <p>Start chat now...</p>
                    </div>
                ) : ''}

                {displayMessages}
            </div>
        )
    }
}

export default MessageList
