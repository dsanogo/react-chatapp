import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "universal-cookie";
import './App.css';
import Login from "./components/Auth/Login";
import Chatboard from './components/Chatboard';
import Loading from './components/Notifications/Loading';
import Register from './components/Auth/Register';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      success: false,
      isUserLogged: false,
      loading: false
    }
  }
  
  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    })
  }

  success = () => {
    this.setState({
      success: true,
      loading: !this.state.loading
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

  registerUser = (user) => {
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
              {this.state.loading ? (<Loading />) : ''}
              <Switch>
                <Route path='/login' 
                      render={(props) => 
                      <Login {...props} 
                        isLogged={this.state.isUserLogged} 
                        loginUser={this.loginUser} 
                        success={this.state.success} 
                        setSuccess={this.success}
                        toggleLoading={this.toggleLoading}
                        />
                      }
                      />
                <Route exact path='/register' 
                      render={(props) => 
                      <Register {...props} 
                        isLogged={this.state.isUserLogged} 
                        success={this.state.success} 
                        setSuccess={this.success}
                        toggleLoading={this.toggleLoading}
                        registerUser={this.registerUser}
                        />
                      }
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
