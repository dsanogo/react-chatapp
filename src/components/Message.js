import React from 'react'

 const Message = (props) => {
    
        const {message} = props;
        return (
            <div className="message">
                <div className="message-username">{message.sender.name}</div>
                <div className="message-text">{message.text}</div>
            </div>
        )
}

export default Message
