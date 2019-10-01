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
      messages: [],
      joinableRooms: [],
      joinedRooms: [],
      selectedRoom: {}
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
            this.currentUser = currentUser;
            this.getRooms();
          }).catch(err => {
            console.log("error: ", err)
          })
    }

    subscribeToRoom = (room) => {
      this.setState({messages: [], selectedRoom: room});
      this.currentUser.subscribeToRoom({
        roomId: room.id,
        hooks: {
          onMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            })
          }
        }
      }).then(room => {
        this.getRooms()
      }).catch(err => {
        console.log('Subscribing to room: ', err)
      })
    }

    getRooms = () => {
      this.currentUser.getJoinableRooms()
        .then(joinableRooms => {
          this.setState({
            joinableRooms,
            joinedRooms: this.currentUser.rooms
          })
        })
        .catch(err => {
          console.log('Joinable rooms error: ', err);
        });
    }

    sendMessage = (text) => {
      this.currentUser.sendMessage({
        text: text,
        roomId: this.state.selectedRoom.id
      });
    }

    createRoom = (roomName) => {
      this.currentUser.createRoom({
        name: roomName
      }).then(room => {
        this.subscribeToRoom(room);
      }).catch(err => {
        console.log('Error creating new room: ', err);
      });
    }

    render() {
        return (
          <div className="app">
            <GroupList 
                  groupList={[...this.state.joinableRooms,...this.state.joinedRooms]} 
                  subscribeToRoom={this.subscribeToRoom}
                  currentRoom={this.state.selectedRoom.id}
                />
            <MessageList messages={this.state.messages} selectedRoom={this.state.selectedRoom.name}/>
            <SendMessageForm sendMessage={this.sendMessage} currentRoom={this.state.selectedRoom.id}/>
            <NewGroupForm createRoom={this.createRoom}/>
          </div>
        );

    }
}

export default App;
