import React from 'react'

const GroupList = ({groupList, subscribeToRoom, currentRoom, newGroupClick, currentUser}) =>  {
    const orderedList = [...groupList].sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)
    return (
        <div className="group-list">
            <ul>
                {
                    currentUser && 
                    (<h3>Welcome {currentUser.name}</h3>)
                }
                
                <h3>Your groups <button className="addNewGroupBtn" title="Add new group"
                    onClick={() => newGroupClick(true)}
                    >+</button></h3>
                {
                    orderedList.map(group => {
                        const active = currentRoom === group.id ? ' active' : '';
                        return (
                            <li className={"group " + active} key={group.id}>
                                <a 
                                    onClick={() => subscribeToRoom(group)} 
                                    href="#"
                                >
                                    # {group.name}</a>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default GroupList
