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
        const displayMessages = selectedRoom.name === undefined ? (
            <div className="emptyRoom">
                <p>Welcome to <span style={{fontWeight: "900", textDecoration: "underline"}}>SMARTI'M</span></p>
                <p>Select a room to start chatting</p>
                <p>Join a room <span className="arrow">&rarr;	</span></p>
                <div className="copyrights">
                    <p style={{fontSize: '15px'}}>Copyright &copy; SmartI'M - All Rights Reserved</p>
                    <p style={{fontSize: '13px', fontStyle: "italic"}}>By: Daouda Sanogo</p>
                </div>
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
                {selectedRoom.name === undefined ? '' : (
                    <div>
                        <h3 className="roomName">{"# " + selectedRoom.name}</h3>
                        <div className="roomUsers">
                            <h4>Users</h4>
                            {selectedRoom.users && selectedRoom.users.map(user => {
                                return (<p key={user.id}>
                                    <img src="https://image.flaticon.com/icons/png/512/64/64572.png" />
                                        @ {user.name} 
                                        <span style={{fontStyle: 'italic'}}>{selectedRoom.createdByUserId === user.id ? " - Admin" : ''}</span>
                                </p>)
                            })}
                        </div>
                        
                    </div>
                    
                )}

                {selectedRoom.name !== undefined && messages.length == 0 ? (
                    <div className="noMsg">
                        <h3>No Message found for # <span style={{fontWeight: "bold"}}>{selectedRoom.name}</span></h3>
                        <p>Start chat now...</p>
                        <p className="arrow">&darr;</p>
                    </div>
                ) : ''}

                {displayMessages}
            </div>
        )
    }
}

export default MessageList
