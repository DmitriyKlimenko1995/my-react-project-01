import React, { useState } from 'react';
import usersmodule from "./Users.module.css";
import userPhoto from './../../assets/images/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png';
import { NavLink } from "react-router-dom";
import FollowButton from "./FollowButton";
import ChatBox from "../Dialogs/Chat/ChatBox";

let Users = (props) => {

    const userId = localStorage.getItem('authToken');
    // При запросе
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const userId = decoded.userId;

    const portionSize = 1;
    const portionCount = Math.ceil(props.userState.totalPages / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    let pages = [];
    for (let i = 1; i <= props.userState.totalPages; i++) {
        pages.push(i);
    }

    return <div>
        <div className={usersmodule.paginator}>
            {portionNumber > 1 && (
                <button onClick={() => setPortionNumber(portionNumber - 1)}>Prev</button>
            )}

            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => (
                    <span
                        key={p}
                        className={props.userState.currentPage === p ? usersmodule.selectedPage : ''}
                        onClick={() => props.setUsersCurrentPageUp(p)}
                    >
                        {p}
                    </span>
                ))}
            { portionCount > portionNumber && 
            <button onClick={() => { setPortionNumber(portionNumber + 1) }}>Next</button> }
        </div>
        {/* <div className={usersmodule.pageButton}>
            {pages.map(p =>
                <span className={props.userState.currentPage === p && usersmodule.selectedPage} onClick={() => { props.setUsersCurrentPageUp(p) }}>{p}</span>
            )}
        </div> */}
        {
            props.userState?.users?.map(u => (
                <div key={u?.id}>
                    <div>
                        <div className={usersmodule.item}>
                            <NavLink to={'/content/' + ((u?.id) - 1)}>
                                <img
                                    src={
                                        typeof u?.photoUrl === 'string' && u.photoUrl.trim() !== ''
                                            ? u.photoUrl
                                            : userPhoto
                                    }
                                    alt="avatarPhoto"
                                />
                            </NavLink>
                        </div>
                        <div>
                            <FollowButton targetId={u?._id} refreshFlag={props.refreshFlag} />
                            <NavLink to={'/chat/' + ((u?.id) - 1)}>
                                <button>chat</button>
                            </NavLink>
                        </div>
                    </div>

                    <div>
                        <div>
                            <div>{u?.fullname ?? 'Имя не указано'}</div>
                            <div>{u?.status ?? 'Нет статуса'}</div>
                        </div>
                        <div>
                            <div>{u?.location?.city ?? 'Город неизвестен'}</div>
                            <div>{u?.location?.country ?? 'Страна неизвестна'}</div>
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
}

export default Users;