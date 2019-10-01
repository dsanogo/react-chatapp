import React, { Component } from 'react'

class NewGroupForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groupName: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            groupName: e.target.value
        })
    }

    handleSumit = (e) => {
        e.preventDefault();
        if(this.state.groupName !== ''){
            this.props.createRoom(this.state.groupName);
            this.setState({
                groupName: ''
            })
        }
       
    }
    
    render() {
        return (
            <div className="new-group-form">
                <form 
                    onSubmit={this.handleSumit}>
                        <input type="text" placeholder="Create new group here..."
                            onChange={this.handleChange}
                            value={this.state.groupName}/>
                    </form>
            </div>
        )
    }
}

export default NewGroupForm
