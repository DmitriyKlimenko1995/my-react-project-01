import React from "react";
import dialogsmodule from './../Dialogs.module.css';

const Message = (props) => {
    return (
        <div className={dialogsmodule.message}>
            {props.message}
        </div>
    );
}

export default Message;