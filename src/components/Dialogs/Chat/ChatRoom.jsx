// ChatRoom.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectWS, sendMessage } from './../../MyData/chatSlice';
import { useParams } from "react-router-dom";
import chatmodule from './ChatBox.module.css'

export const ChatRoom = () => {

    const { id } = useParams();
    const roomId = id;
    const token = localStorage.getItem('authToken');
    let { dialog } = useSelector(state => state.messages);
    const authUserId = localStorage.getItem('userId');
    let recipientName = useSelector(state => state.users.users);
    // const roomId = '68a80a7e5026ad284dceb74c';

    const dispatch = useDispatch();
    const messages = useSelector(state => state.chat.messages);
    console.log(messages.length);
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
            {/* <div style={{ height: 300, overflowY: 'auto' }}>
                {messages.map((msg, i) => (
                    <div key={i}><strong>{msg.senderId}</strong>: {msg.text}</div>
                ))}
            </div> */}
            <div style={{ height: '400px', overflowY: 'auto', margin: '0 0 30px 0' }}>
                {Array.isArray(messages) && messages.length > 0 ? (
                    messages.map((msg, index) => {
                        const senderUser = recipientName.find(user => user._id === msg.sender);
                        const isOwnMessage = msg.sender === authUserId;

                        return (
                            <p key={msg._id}>
                                <img
                                    className={chatmodule.avatar}
                                    src={`http://localhost:5000${senderUser?.photoUrl || ''}`}
                                    alt="avatarPhoto"
                                />
                                <b>
                                    {isOwnMessage
                                        ? 'Вы'
                                        : senderUser?.fullname || 'Неизвестный пользователь'}
                                </b>
                                {' --> '}
                                {msg.text}
                            </p>
                        );
                    })
                ) : (
                    <p style={{ opacity: 0.5 }}>Нет сообщений или ошибка загрузки</p>
                )}
            </div>
            <input value={text} onChange={e => setText(e.target.value)} />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};