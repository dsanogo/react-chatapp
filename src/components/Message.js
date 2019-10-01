import React from 'react'

 const Message = ({message}) => {
        return (
            <div className="message">
                <div className="message-username">
                    {message.sender.name} 
                    <small className="messageTime">@{message.createdAt}</small>
                </div>
                <div className="message-text">{message.text}</div>
                
            </div>
        )
}

export default Message
