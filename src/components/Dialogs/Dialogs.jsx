import React from "react";
import dialogsmodule from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogItem from "./Dialogitem/Dialogitem";
import { useSelector, useDispatch } from "react-redux";
import { addMessage, updateNewMessageText } from "./../MyData/dialogs-slice";

const Dialogs = () => {

    const dialogss = useSelector((state) => state.dialogs);
    const dispatch = useDispatch();

    let newPostElement = React.createRef();
    
    let addPost = () => {
        dispatch(addMessage());
    }

    let onPostChange = (e) => {
        let text = e.target.value;
        dispatch(updateNewMessageText(text));
    }

    let messageElements = dialogss.messages.map(m => <Message message={m.message} id={m.id} />);

    let dialogElements = dialogss.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);

    return (
        <div className={dialogsmodule.dialogs}>
            <div className={dialogsmodule.dialogsItems}>
                { dialogElements }
            </div>
            <div className={dialogsmodule.messages}>
                { messageElements }
                <div>
                    <div>
                        <textarea ref={newPostElement} onChange={onPostChange} value={dialogss.newMessageText}></textarea>
                    </div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
        </div>
        
    );
}

export default Dialogs;