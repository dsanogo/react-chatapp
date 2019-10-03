import React, { Component } from 'react'
import axios from 'axios'
import Success from '../Notifications/Success';
import Cookies from 'universal-cookie';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state= {
            username: '',
        }
    }

    componentDidMount = () => {
        const cookie = new Cookies();
        const user = cookie.get('user');
        if(user){
            this.props.history.push('/');
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
            if (res.data.status === 'Success') {
                this.props.loginUser(res.data.data);
                this.setState({
                    username: ''
                })
                this.props.history.push({
                    pathname: '/'
                  })
                  
            }else {
                this.props.setSuccess();
            }
        }).catch(err => {
            console.log("error is authenticating you: ", err)
        })
        
    }
    
    render() {
        return (
            <div className="login-page">
                <p className="brandName brandLogin"><span >SMARTI'M</span></p>
                <div className="card-login">
                    <label htmlFor="username">Login <i className="fa fa-sign-in" aria-hidden="true"></i></label>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Enter username" 
                            className="form-control" 
                            value={this.state.username}
                            id="username"
                            autoComplete="off"
                            onChange={this.handleChange}/>
                    </form>
                </div>
                <div className="copyrights loginCopy">
                    <p style={{fontSize: '15px'}}>Copyright &copy; 2019 | SmartI'M | All Rights Reserved</p>
                </div>
                <Success success={this.props.success} message="Login failed - Please try again"/>
            </div>
        )
    }
}

export default Login
