import React from "react";
import dialogsmodule from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogItem from "./Dialogitem/Dialogitem";

const Dialogs = (props) => {

    let newPostElement = React.createRef();
    
    let addPost = () => {
        let text = newPostElement.current.value;
        alert(text);
    }

    let messageElements = props.state.messagesPage.messages.map(m => <Message message={m.message} />);

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
                        <textarea ref={newPostElement}></textarea>
                    </div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
        </div>
        
    );
}

export default Dialogs;