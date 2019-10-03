import React, { Component } from 'react'

export class Modal extends Component {
    
    render() {
        const groupId = this.props.group.id;
        const tobeDeleted = this.props.tobeDeleted;
        const showModal = this.props.modalShow && tobeDeleted.id === groupId ? "block" : "hidden";
        return (
            <div className={showModal + " modal bd-example-modal-sm"} id={"model-"+groupId} role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="card" style={{width: "20rem"}}>
                                <div className="card-header">
                                    <h3 style={{textAlign: 'center'}}>Are you sure you want to delete 
                                        #{this.props.group.name}?
                                    </h3>
                                </div>
                                <ul className="list-group list-group-flush">
                                   <li style={{margin: '15px'}}>
                                       <button className="btn btn-danger confBtn"
                                        onClick={() => {
                                            this.props.deleteRoom(tobeDeleted)
                                            this.props.toggleModal()
                                        }}
                                       >Yes, sure</button>
                                       <button type="button" 
                                                className="btn btn-secondary confBtn pull-right" 
                                                onClick={() => {
                                                    this.props.toggleModal()
                                                }}
                                                >Close</button>
                                   </li>
                                </ul>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

export const Confirm = (props) => {
    const show = props.confirm ? "block" : '';
    return (
        <div className={show + " modal bd-example-modal-sm"} role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="card" style={{width: "20rem"}}>
                            <div className="card-header">
                                <h3 style={{textAlign: 'center'}}>Are you sure you want to leave 
                                    #{props.selectedRoom.name}?
                                </h3>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li style={{margin: '15px'}}>
                                    <button className="btn btn-danger confBtn"
                                    onClick={() => {
                                        props.leaveRoom(props.selectedRoom);
                                        props.toggleConfirm();
                                    }}
                                    >Yes, sure</button>
                                    <button type="button" 
                                            className="btn btn-secondary confBtn pull-right" 
                                            onClick={props.toggleConfirm}
                                            >Close</button>
                                </li>
                            </ul>
                        </div>
                </div>
            </div>
        </div>
    )
}
