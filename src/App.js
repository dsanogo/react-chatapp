import React, { Component } from 'react';
import './App.css';
import GroupList from "./components/GroupList";
import MessageList from "./components/MessageList";
import SendMessageForm from "./components/SendMessageForm";
import NewGroupForm from './components/NewGroupForm';

import Chatkit from "@pusher/chatkit-client";
import { instanceLocator, tokenUrl } from "./config";
import Login from './components/Login';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      joinableRooms: [],
      joinedRooms: [],
      selectedRoom: {},
      newGroupBtnClicked: false,
      success: false
    }
  }
  

    componentDidMount(){
      const tokenProvider = new Chatkit.TokenProvider({
        url: tokenUrl
      });

      const users = ['d_sanogo', 'walid', 'aya'];
      const user = users[Math.floor(Math.random() * users.length)];

        const chatManager = new Chatkit.ChatManager({
          instanceLocator,
          userId: user,
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
      this.setState({messages: []});
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
        this.setState({selectedRoom: room});
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
      if(this.state.selectedRoom.id !== undefined) {
        this.currentUser.sendMessage({
          text: text,
          roomId: this.state.selectedRoom.id
        });
      }else {
        alert('Hey, did you forget to choose a room?');
      }
    }

    createRoom = (roomName) => {
      this.currentUser.createRoom({
        name: roomName
      }).then(room => {
        this.subscribeToRoom(room);
        this.success();
      }).catch(err => {
        console.log('Error creating new room: ', err);
      });
    }

    leaveRoom = (room) => {
      this.currentUser.leaveRoom({
        roomId: room.id
      }).then(res => {
        this.getRooms();
        this.setState({messages: [], selectedRoom: {}});
        this.success();
      }).catch(err => {
        console.log("Error in leaving room: ", err.info.error_descriptionr)
      })
    }

    newGroupClick = () => {
      this.setState({
        newGroupBtnClicked: true
      })
    }

    deleteRoom = (room) => {
      this.currentUser.deleteRoom({roomId: room.id}).then(response => {
        this.getRooms();
        this.setState({messages: [], selectedRoom: {}});
        this.success();
      }).catch(err => {
        console.log('Error in deleting room: ', err.info.error_description);
      })
    }

    resetRoom = () => {
      this.setState({messages: [], selectedRoom: {}});
    }

    success = () => {
      this.setState({
        success: true
      })

      setTimeout(() => {
        this.setState({success: false})
      }, 3000);
    }

    render() {
        return (
          <div className="app">
            <GroupList 
                  groupList={[...this.state.joinableRooms,...this.state.joinedRooms]} 
                  subscribeToRoom={this.subscribeToRoom}
                  currentRoom={this.state.selectedRoom.id}
                  currentUser={this.currentUser}
                  newGroupClick={this.newGroupClick}
                  deleteRoom={this.deleteRoom}
                  resetRoom={this.resetRoom}
                  success={this.state.success}
                />
            <MessageList 
                  messages={this.state.messages} 
                  selectedRoom={this.state.selectedRoom}
                  leaveRoom={this.leaveRoom}
                  />
            <SendMessageForm 
                  sendMessage={this.sendMessage} 
                  currentRoom={this.state.selectedRoom.id}
                  />
            <NewGroupForm 
                  createRoom={this.createRoom} 
                  isClicked={this.state.newGroupBtnClicked}
                  />
            <Login />
          </div>
        );

    }
}

export default App;
