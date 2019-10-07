import React from 'react'
import {Modal} from '../Modals/Modal';
import Success from '../Notifications/Success';

class GroupList extends React.Component  {
    constructor(props) {
        super(props)
        this.state={
            modalShow: false,
            toBeDeleted: {}
        }
    }
    
    toggleModal = () => {
        this.setState({
            modalShow: !this.state.modalShow,
        })
    }
    render() {
        const {groupList, subscribeToRoom, currentRoom, newGroupClick, currentUser, deleteRoom} = this.props;
        const orderedList = [...groupList].sort((a, b) => a.createdAt > b.createdAt ? 1 : -1);
        return (
            <div className="group-list">
                <ul>
                    {
                        currentUser ? (<h3 className="userName">
                        <p><i className="fa fa-sign-out" 
                            title="Sign out"
                            onClick={() => {
                                this.props.logoutUser()
                            }}
                            ></i></p>
                        Welcome {currentUser.name}
                    </h3>) : <h3 className="userName">Loading...</h3>
                    }
                    
                    <h3 style={{marginBottom: "20px"}}>
                        <span className="groupTitle"
                            onClick={this.props.resetRoom}
                        >Your groups</span>
                        <button 
                                className="addNewGroupBtn" title="Add new group"
                                onClick={() => newGroupClick(true)}
                            >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                    </h3>
                    <div>
                        {
                            orderedList.length ? orderedList.map(group => {
                                const active = currentRoom === group.id ? ' active' : '';
                                return (
                                    <div key={group.id}>
                                        <li className={"group " + active} >
                                            <a 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    subscribeToRoom(group)}} 
                                                href="/"
                                            >
                                                # {group.name}</a>
                                            {
                                                currentUser.id === group.createdByUserId ? (
                                                    <button className="deleteBtn" 
                                                            title="Delete group" 
                                                            onClick={() => {
                                                                    this.toggleModal();
                                                                    this.setState({
                                                                        toBeDeleted: group
                                                                    })
                                                                }
                                                            }
                                                        >
                                                        <i className="fa fa-times" aria-hidden="true"></i>
                                                    </button>
                                                ): ''
                                            }
                                            
                                        </li>
                                        <Modal 
                                            group={group} 
                                            deleteRoom={deleteRoom} 
                                            modalShow={this.state.modalShow}
                                            toggleModal={this.toggleModal}
                                            tobeDeleted={this.state.toBeDeleted}/>
                                    </div>
                                )
                            }) : (
                                <div className="noGroup">
                                    <h3>Oops, seems you don't have any group yet.</h3>
                                        <button className="addNewGroupBtnB" 
                                                title="Add new group"
                                                onClick={() => newGroupClick(true)}
                                            >
                                                Add new group now
                                        </button>    
                                </div>
                                
                            )
                        }
                        <Success 
                            success={this.props.success} 
                            message="Your request has successfully been processed"
                        />
                    </div>
                </ul>
            </div>
        )
    }
}

export default GroupList
