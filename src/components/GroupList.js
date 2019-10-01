import React from 'react'

const GroupList = ({groupList, subscribeToRoom, currentRoom}) =>  {

    return (
        <div className="group-list">
            <ul>
                <h3>Your groups</h3>
                {
                    groupList.map(group => {
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
