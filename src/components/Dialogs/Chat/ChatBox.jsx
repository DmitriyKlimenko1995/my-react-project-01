// ChatBox.jsx
import { useSelector, useDispatch } from "react-redux";
import { fetchDialog, sendMessage } from "./../../MyData/messagesSlice";
import { useEffect, useState } from 'react';
import chatmodule from './ChatBox.module.css'


function ChatBox({ userId, handleSubscribe }) {
    const dispatch = useDispatch();
    let { dialog } = useSelector(state => state.messages);
    const [text, setText] = useState("");
    const token = localStorage.getItem('authToken');
    const authUserId = localStorage.getItem('userId');
    let recipientName = useSelector(state => state.users.users);

    useEffect(() => {
        // console.log(token);
        dispatch(fetchDialog({ userId, token }));
    }, [dispatch, token, userId, handleSubscribe]);

    const handleSend = () => {
        if (text.trim()) {
            dispatch(sendMessage({ recipientId: userId, text, token }));
            setText("");
            handleSubscribe(prev => !prev);
        }
    };

    return (
        <div>
            <div style={{ height: '400px', overflowY: 'auto', margin: '0 0 30px 0' }}>
                {Array.isArray(dialog) ? (
                    dialog.map(msg => (
                        <p><img className={chatmodule.avatar} src={`http://localhost:5000${recipientName.find(user => user._id === msg.sender)?.photoUrl}`} alt="avatarPhoto" /><b>{msg.sender === authUserId
                            ? "Вы"
                            : (recipientName.find(user => user._id === msg.recipient)?.fullname ?? "Неизвестный пользователь")}</b> {'-->'} {msg.text}</p>
                    ))
                ) : (
                    <p style={{ opacity: 0.5 }}>Нет сообщений или ошибка загрузки</p>
                )}
            </div>
            <input value={text} onChange={e => setText(e.target.value)} />
            <button onClick={handleSend}>Send</button>
        </div>
    );
}

export default ChatBox;