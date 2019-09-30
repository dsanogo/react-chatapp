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
        
        this.setState({
            message: ''
        })
        alert(this.state.message);
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="send-message-form">
                <input 
                    type="text"
                    placeholder="Enter your message and hit ENTER"
                    onChange={this.handleChange}
                    value={this.state.message}
                    />
            </form>
        )
    }
}

export default SendMessageForm
