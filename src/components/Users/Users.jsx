import React from "react";
import usersmodule from "./Users.module.css";
import userPhoto from './../../assets/images/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png';
import { NavLink } from "react-router-dom";


let Users = (props) => {


    let pages = [];
    for (let i = 1; i <= props.userState.totalPages; i++) {
        pages.push(i);
    }

    return <div>
        <div className={usersmodule.pageButton}>
            {pages.map(p =>
                <span className={props.userState.currentPage === p && usersmodule.selectedPage} onClick={() => { props.setUsersCurrentPageUp(p) }}>{p}</span>
            )}
        </div>
        {
            props.userState.users.map(u => <div key={u.id}>
                <div>
                    <div className={usersmodule.item}>
                        <NavLink to={'/content/' + (u.id-1)}>
                            <img src={typeof u.photoUrl === 'string' && u.photoUrl.trim() !== "" ? u.photoUrl : userPhoto} alt="avatarPhoto" />
                        </NavLink>
                    </div>
                    <div>
                        {u.followed ? (<button onClick={() => { props.unFollowUp(u.id) }}>UnFollow</button>) : (<button onClick={() => { props.followUp(u.id) }}>Follow</button>)}
                    </div>
                </div>
                {/* <img src={userPhoto} alt="avatarPhoto" /> */}
                <div>
                    <div>
                        <div>{u.fullname}</div>
                        <div>{u.status}</div>
                    </div>
                    <div>
                        <div>{u.location.city}</div>
                        <div>{u.location.country}</div>
                    </div>
                </div>

            </div>)
        }
    </div>
}

export default Users;