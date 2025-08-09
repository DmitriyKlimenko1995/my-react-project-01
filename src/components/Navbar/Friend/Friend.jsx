import React from "react";
import friend_module from './Friend.module.css'
import userPhoto from './../../../assets/images/avatar.png';

const Friend = (props) => {
    return (
        <div className={friend_module.item}>
            <img src={typeof props.photoUrl === 'string' && props.photoUrl.trim() !== "" ? props.photoUrl : userPhoto} alt="avatar" />
            <div>
                {props.name}
            </div>
        </div>
    );
}

export default Friend;