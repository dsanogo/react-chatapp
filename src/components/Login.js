import React, { Component } from 'react'
import axios from 'axios'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state= {
            username: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const url = "http://localhost:3001/auth";
        axios.post(url, {userId: this.state.username}).then(res => {
            console.log(res)
        }).catch(err => {
            console.log("error is authenticating you: ", err)
        })
        
        this.setState({
            username: ''
        })
    }
    
    render() {
        return (
            <div>
                <p>Login</p>
                <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Enter username" className="form-control" value={this.state.username}
                        onChange={this.handleChange}/>
                </form>
                
            </div>
        )
    }
}

export default Login
