import React from "react";
import friend_module from './Friend.module.css'

const Friend = (props) => {
    return (
        <div className={friend_module.item}>
            <img src={props.url} alt="avatar" />
            <div>
                {props.name}
            </div>
        </div>
    );
}

export default Friend;