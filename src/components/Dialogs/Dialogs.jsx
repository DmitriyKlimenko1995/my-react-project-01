import React from "react";
import dialogsmodule from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogItem from "./Dialogitem/Dialogitem";
import { addMessageActionCreator, updateNewMessageTextActionCreator } from "../MyData/myState";

const Dialogs = (props) => {

    let newPostElement = React.createRef();
    
    let addPost = () => {
        props.dispatch(addMessageActionCreator());
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.dispatch(updateNewMessageTextActionCreator(text));
    }

    let messageElements = props.state.messagesPage.messages.map(m => <Message message={m.message} id={m.id} />);

    let dialogElements = props.state.messagesPage.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);

    return (
        <div className={dialogsmodule.dialogs}>
            <div className={dialogsmodule.dialogsItems}>
                { dialogElements }
            </div>
            <div className={dialogsmodule.messages}>
                { messageElements }
                <div>
                    <div>
                        <textarea ref={newPostElement} onChange={onPostChange} value={props.state.messagesPage.newMessageText}></textarea>
                    </div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
        </div>
        
    );
}

export default Dialogs;