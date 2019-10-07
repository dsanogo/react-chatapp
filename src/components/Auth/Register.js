import React, { Component } from 'react'
import Success from '../Notifications/Success';
import axios from 'axios'
import { Link } from "react-router-dom";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            username: "",
            usernameError: false,
            validationError: false
        }
    }

    handleChange = (e) => {

        if (e.target.id === "userId" && /\s/.test(e.target.value)) {
            this.setState({
                usernameError: true
            })
        }
        this.setState({[e.target.id]: e.target.value}, () =>{
            if (/\s/.test(this.state.userId)) {
                this.setState({
                    usernameError: true
                })
            }else {
                this.setState({
                    usernameError: false
                })
            }
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        if(/\s/.test(this.state.userId)){
            this.setState({
                usernameError: true
            })
        }else {
            if(this.state.userId !== '' && this.state.username !== ''){
                this.setState({
                    validationError: false
                })
                const url = "http://localhost:3001/auth/register";
                this.props.toggleLoading();
                axios.post(url, {userId: this.state.userId, name: this.state.username})
                .then( res=> {
                    this.props.toggleLoading();
                    if (res.data.status === 'Success') {
                        this.props.registerUser(res.data.data);
                        this.setState({
                            userId: '',
                            username: ''
                        })
                        this.props.history.push({
                            pathname: '/'
                          })
                          
                    }else {
                        this.props.setSuccess();
                    }
                })
                .catch(err => {
                    this.props.toggleLoading();
                    console.log('Error in registering you: ', err);
                })
            }else {
                this.setState({
                    validationError: true
                })
            }
        }
    }
    render() {
        return (
            <div className="login-page">
                <p className="brandName brandLogin"><span >SMARTI'M</span></p>
                <Link to="/login" className="authBtn">Login</Link>
                <div className="card-login registration-form">
                    
                    <label htmlFor="">Registration <i className="fa fa-sign-in" aria-hidden="true"></i></label>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Username" 
                            className="form-control" 
                            value={this.state.userId}
                            id="userId"
                            autoComplete="off"
                            onChange={this.handleChange}/>
                            {this.state.usernameError ? (
                                <p style={{color: 'red'}}>Username should not include white space</p>
                            ) : ''}
                            
                        <br/>
                        <input type="text" placeholder="Full name" 
                            className="form-control" 
                            value={this.state.username}
                            id="username"
                            autoComplete="off"
                            onChange={this.handleChange}/>
                            {this.state.validationError ? (
                                <p style={{color: 'red'}}>Please fill all the inputs</p>
                            ) : ''}
                        <button className="btn btn-primary registerBtn">Register</button>
                    </form>
                </div>
                <div className="copyrights loginCopy">
                    <p style={{fontSize: '15px'}}>Copyright &copy; 2019 | SmartI'M | All Rights Reserved</p>
                </div>
                <Success success={this.props.success} message="Username already taken"/>
            </div>
        )
    }
}

export default Register
