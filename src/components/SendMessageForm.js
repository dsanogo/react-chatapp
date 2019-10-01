import React, { Component } from 'react'

class SendMessageForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            message: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.message !== ''){
            this.props.sendMessage(this.state.message);
            this.setState({
                message: ''
            })
        }
        
    }
    
    render() {
        const shown = this.props.currentRoom === undefined ? 'disabled' : '';
        const pleaceHolder = this.props.currentRoom === undefined ? 'Join a room and start chatting' : 'Enter your message and hit ENTER';
        return (
            <form onSubmit={this.handleSubmit} className={"send-message-form " + shown} >
                <input 
                    disabled={shown}
                    type="text"
                    placeholder={pleaceHolder}
                    onChange={this.handleChange}
                    value={this.state.message}
                    />
            </form>
        )
    }
}

export default SendMessageForm
