import React, { Component } from 'react'

class Success extends Component {
    render() {
        const display = this.props.success ? 'block' : 'hidden';
        return (
            <div className={"success-msg alert alert-success " + display }>
                Your request has successfully been processed
            </div>
        )
    }
}

export default Success
