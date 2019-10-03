import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "universal-cookie";
import './App.css';
import Login from "./components/Auth/Login";
import Chatboard from './components/Chatboard';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      success: false,
      isUserLogged: false
    }
  }
  

  success = () => {
    this.setState({
      success: true
    })

    setTimeout(() => {
      this.setState({success: false})
    }, 3000);
  }

  loginUser = (user) => {
    const cookies = new Cookies();
    cookies.set('user', user, { path: '/' });
    this.setState({
      isUserLogged: !this.state.isUserLogged
    })
  }

  logoutUser = () => {
    const cookies = new Cookies();
    cookies.remove('user', { path: '/' });
    this.setState({
      isUserLogged: !this.state.isUserLogged
    })
  }
    render() {
        return (
            <Router>
              <Switch>
                <Route path='/login' 
                      render={(props) => 
                      <Login {...props} 
                        isLogged={this.state.isUserLogged} 
                        loginUser={this.loginUser} 
                        success={this.state.success} 
                        setSuccess={this.success}/>}
                      />
                <Route  exact path='/' 
                      render={(props) => 
                      <Chatboard 
                        {...props} 
                        isLogged={this.state.isUserLogged}
                        logoutUser={this.logoutUser} 
                        success={this.state.success} 
                        setSuccess={this.success}/>}
                      />
              </Switch>
            </Router>
        );
    }
}

export default App;
