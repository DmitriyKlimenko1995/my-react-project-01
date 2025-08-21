// ChatRoom.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectWS, sendMessage } from './../../MyData/chatSlice';
import { useParams } from "react-router-dom";

export const ChatRoom = () => {

    // const { id } = useParams();
    // const roomId = id;
    const token = localStorage.getItem('authToken');
    const roomId = localStorage.getItem('userId');

    const dispatch = useDispatch();
    const messages = useSelector(state => state.chat.messages);
    const [text, setText] = useState('');

    useEffect(() => {
        dispatch(connectWS({ token, roomId }));
    }, [token, roomId, dispatch]);

    const handleSend = () => {
        if (text.trim()) {
            dispatch(sendMessage({ roomId, text }));
            setText('');
        }
    };

    return (
        <div>
            <div style={{ height: 300, overflowY: 'auto' }}>
                {messages.map((msg, i) => (
                    <div key={i}><strong>{msg.senderId}</strong>: {msg.text}</div>
                ))}
            </div>
            <input value={text} onChange={e => setText(e.target.value)} />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};