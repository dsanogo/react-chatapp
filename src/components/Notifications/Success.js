import React, { Component } from 'react'

class Success extends Component {
    render() {
        const message = this.props.message;
        let className = '';
        if(message.includes('Username') || message.includes('taken')){
            className = this.props.success ? 
                            'success-msg alert alert-danger block' 
                            :
                            'success-msg alert alert-danger hidden';
        }else {
            className = this.props.success ? 
                            'success-msg alert alert-success block' 
                            :
                            'success-msg alert alert-success hidden';
        }

        return (
            <div className={ className }>
                {this.props.message}
            </div>
        )
    }
}

export default Success
