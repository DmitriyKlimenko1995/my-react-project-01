// ChatBox.jsx
import { useSelector, useDispatch } from "react-redux";
import { fetchDialog, sendMessage } from "./../../MyData/messagesSlice";
import { useEffect, useState } from 'react';


function ChatBox({ userId, handleSubscribe }) {
    const dispatch = useDispatch();
    let { dialog } = useSelector(state => state.messages);
    console.log("dialog must be here");
    console.log(dialog);
    const userName = useSelector(state => state.users);
    const [text, setText] = useState("");
    const token = localStorage.getItem('authToken');
    // console.log(token);
    debugger;

    useEffect(() => {
        debugger;
        // console.log(token);
        dispatch(fetchDialog({ userId, token }));
        debugger
    }, [dispatch, token, userId, handleSubscribe]);
    debugger;

    const handleSend = () => {
        if (text.trim()) {
            dispatch(sendMessage({ recipientId: userId, text, token }));
            setText("");
            handleSubscribe(prev => !prev);
            debugger;
        }
    };
    debugger;


    return (
        <div>
            {Array.isArray(dialog) ? (
                dialog.map(msg => (
                    <p><b>{msg.sender?.name || "Вы"}:</b> {msg.text}</p>
                ))
            ) : (
                <p style={{ opacity: 0.5 }}>Нет сообщений или ошибка загрузки</p>
            )}
            <input value={text} onChange={e => setText(e.target.value)} />
            <button onClick={handleSend}>Send</button>
        </div>
    );
}

export default ChatBox;