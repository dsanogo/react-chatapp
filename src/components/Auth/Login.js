import React, { Component } from 'react'
import { Link } from "react-router-dom";
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
        const url = "http://localhost:3001/auth/login";
        this.props.toggleLoading();
        axios.post(url, {userId: this.state.username}).then(res => {
            this.props.toggleLoading();
            if (res.data.status === 'Success') {
                this.props.loginUser(res.data.data);
                this.setState({
                    username: ''
                })
                this.props.history.push({
                    pathname: '/'
                  })
                  
            }else {
                this.props.toggleLoading();
                this.props.setSuccess();
            }
        }).catch(err => {
            this.props.toggleLoading();
            console.log("error is authenticating you: ", err)
        })
        
    }
    
    render() {
        return (
            <div className="login-page">
                <p className="brandName brandLogin"><span >SMARTI'M</span></p>
                <Link to="/register" className="authBtn">Register</Link>
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
                <Success success={this.props.success} message="Username incorrect - Please try again"/>
            </div>
        )
    }
}

export default Login
