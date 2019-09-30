import React, { Component } from 'react';
import './App.css';
import GroupList from "./components/GroupList";
import MessageList from "./components/MessageList";
import SendMessageForm from "./components/SendMessageForm";
import NewGroupForm from './components/NewGroupForm';

import Chatkit from "@pusher/chatkit-client";
import { instanceLocator, tokenUrl, userId } from "./config";

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }
  

    componentDidMount(){
      const tokenProvider = new Chatkit.TokenProvider({
        url: tokenUrl
      });

        const chatManager = new Chatkit.ChatManager({
          instanceLocator,
          userId,
          tokenProvider
        });

        chatManager.connect()
          .then(currentUser => {
              currentUser.subscribeToRoom({
                roomId: currentUser.rooms[0].id,
                hooks: {
                  onMessage: message => {
                    this.setState({
                      messages: [...this.state.messages, message]
                    })
                  }
                }
              })

          }).catch(err => {
            console.log("error: ", err)
          })
    }
    render() {
        return (
          <div className="app">
            <GroupList />
            <MessageList messages={this.state.messages}/>
            <SendMessageForm />
            <NewGroupForm />
          </div>
        );

    }
}

export default App;
