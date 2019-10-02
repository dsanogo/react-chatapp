import React, { Component } from 'react'
import ReactDOM from "react-dom";
import Message from "./Message";
import { Confirm } from './Modal';
class MessageList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showConfirm: false
        }
    }
    

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

    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm,
        })
    }

    render() {
        const {messages, selectedRoom} = this.props;
        const displayMessages = selectedRoom.name === undefined ? (
            <div className="emptyRoom">
                <p>Welcome to <span className="brandName">SMARTI'M</span></p>
                <p>Select a room to start chatting</p>
                <p>Join a room <span className="arrow">&rarr;	</span></p>
                <div className="copyrights">
                    <p style={{fontSize: '15px'}}>Copyright &copy; 2019 | SmartI'M | All Rights Reserved</p>
                    <p style={{fontSize: '13px', fontStyle: "italic"}}>Developed By: <a href="https://www.facebook.com/ctdsanogo" className="authors" target="_blank">Eng. Daouda Sanogo</a></p>
                    <p style={{fontSize: '13px', fontStyle: "italic"}}>Designed by: <a href="https://www.facebook.com/waild.uosama" className="authors" target="_blank">Eng. Walid Osama</a></p>
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
                        <div>
                            <h3 className="roomName">
                                {"# " + selectedRoom.name}
                                <button className="btn btn-danger pull-right leaveRoomBtn"
                                        onClick={this.toggleConfirm}>
                                    Leave group
                                </button>
                            </h3>
                            
                        </div>
                        
                        <div className="roomUsers">
                            <h4>Users</h4>
                            {selectedRoom.users && selectedRoom.users.map(user => {
                                return (<p key={user.id}>
                                    <i className="fa fa-user-circle" aria-hidden="true"></i>
                                        {user.name} 
                                        <span style={{fontStyle: 'italic'}}>{selectedRoom.createdByUserId === user.id ? " - Admin" : ''}</span>
                                </p>)
                            })}
                        </div>
                        
                    </div>
                    
                )}

                {selectedRoom.name !== undefined && messages.length == 0 ? (
                    <div className="noMsg">
                        <h3>Welcome to #<span style={{fontWeight: "bold"}}>{selectedRoom.name}</span> channel</h3>
                        <p>Start chat now...</p>
                        <p className="arrow">&darr;</p>
                    </div>
                ) : ''}
                <Confirm 
                    selectedRoom={selectedRoom} 
                    confirm={this.state.showConfirm} 
                    toggleConfirm={this.toggleConfirm}
                    leaveRoom={this.props.leaveRoom}
                    />
                {displayMessages}
            </div>
        )
    }
}

export default MessageList
