import React from "react";
import friend_module from './Friend.module.css'
import userPhoto from './../../../assets/images/avatar.png';

const Friend = (props) => {
    return (
        <div className={friend_module.item}>
            <img src={typeof props.url === 'string' && props.url.trim() !== "" ? `http://localhost:5000${props.url}` : userPhoto} alt="avatar" />
            <div>
                {props.name}
            </div>
        </div>
    );
}

export default Friend;