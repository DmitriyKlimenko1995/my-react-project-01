// ChatRoom.jsx
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectWS, sendMessage, resetScroll, setHasUnreadMessages } from './../../MyData/chatSlice';
import { useParams } from "react-router-dom";
import chatmodule from './ChatBox.module.css';
import { FloatButton } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export const ChatRoom = () => {
    const { id } = useParams();
    const roomId = id;
    const token = localStorage.getItem('authToken');
    const authUserId = localStorage.getItem('userId');

    const dispatch = useDispatch();
    const messages = useSelector(state => state.chat.messages);
    const shouldScroll = useSelector(state => state.chat.shouldScroll);
    const hasUnreadMessages = useSelector(state => state.chat.hasUnreadMessages);
    const recipientName = useSelector(state => state.users.users);

    const [text, setText] = useState('');
    const messagesEndRef = useRef(null);
    const containerRef = useRef(null);
    const isAutoScrollEnabledRef = useRef(true);
    const socketRef = useRef(null);
    const isInitialLoadRef = useRef(true);

    // Подключение WS один раз при монтировании
    useEffect(() => {
        const thunk = connectWS({ token, roomId, containerRef, authUserId});
        dispatch(thunk).then((res) => {
            if (res?.payload?.socket) {
                socketRef.current = res.payload.socket;
            }
        });

        return () => {
            socketRef.current?.close();
        };
    }, [token, roomId, dispatch]);

    // Скролл при первой загрузке сообщений
    useLayoutEffect(() => {
        if (isInitialLoadRef.current && messages.length > 0) {
            requestAnimationFrame(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
                isInitialLoadRef.current = false;
            });
        }
    }, [messages]);

    // Автоскролл при shouldScroll
    useEffect(() => {
        if (shouldScroll) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            dispatch(resetScroll());
        }
    }, [shouldScroll, dispatch]);

    // Обработчик скролла
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleScroll = () => {
            const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
            const isNearBottom = distanceFromBottom < 100;
            isAutoScrollEnabledRef.current = isNearBottom;

            if (isNearBottom) {
                dispatch(setHasUnreadMessages(false));
            }

            // Подгрузка старых сообщений
            if (el.scrollTop <= 1 && messages.length > 0) {
                if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
                    console.warn('Socket not ready, skip LOAD_OLDER');
                    return;
                }

                const oldest = messages[0];
                const prevScrollHeight = el.scrollHeight;

                socketRef.current.send(JSON.stringify({
                    type: 'LOAD_OLDER',
                    roomId,
                    before: oldest.timestamp
                }));

                setTimeout(() => {
                    const newScrollHeight = el.scrollHeight;
                    el.scrollTop = newScrollHeight - prevScrollHeight;
                }, 0);
            }
        };

        el.addEventListener('scroll', handleScroll);
        return () => el.removeEventListener('scroll', handleScroll);
    }, [messages, roomId, dispatch]);

    const handleSend = () => {
        if (text.trim()) {
            dispatch(sendMessage({ roomId, text }));
            setText('');
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        dispatch(setHasUnreadMessages(false));
    };

    return (
        <div style={{ position: 'relative' }}>
            <div
                style={{ height: '400px', overflowY: 'auto', margin: '0 0 30px 0' }}
                ref={containerRef}
            >
                {Array.isArray(messages) && messages.length > 0 ? (
                    <>
                        {messages.map((msg) => {
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
                        })}
                        <div ref={messagesEndRef} />
                    </>
                ) : (
                    <p style={{ opacity: 0.5 }}>Нет сообщений или ошибка загрузки</p>
                )}
            </div>

            <input value={text} onChange={e => setText(e.target.value)} />
            <button onClick={handleSend}>Send</button>

            {hasUnreadMessages && (
                <FloatButton
                    icon={<DownOutlined />}
                    type="primary"
                    style={{ right: 140, bottom: 400 }}
                    onClick={scrollToBottom}
                    tooltip="Показать новые сообщения"
                />
            )}
        </div>
    );
};

// // ChatRoom.jsx
// import React, { useEffect, useState, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { connectWS, sendMessage, resetScroll, setHasUnreadMessages, prependMessages } from './../../MyData/chatSlice';
// import { useParams } from "react-router-dom";
// import chatmodule from './ChatBox.module.css';
// import { FloatButton } from 'antd';
// import { DownOutlined } from '@ant-design/icons';

// export const ChatRoom = () => {

//     const { id } = useParams();
//     const roomId = id;
//     const token = localStorage.getItem('authToken');
//     let { dialog } = useSelector(state => state.messages);
//     const authUserId = localStorage.getItem('userId');
//     let recipientName = useSelector(state => state.users.users);

//     const dispatch = useDispatch();
//     const messages = useSelector(state => state.chat.messages);
//     const [text, setText] = useState('');
//     const messagesEndRef = useRef(null);
//     const shouldScroll = useSelector((state) => state.chat.shouldScroll);
//     const containerRef = useRef(null);
//     const isAutoScrollEnabledRef = useRef(true);
//     const hasUnreadMessages = useSelector((state) => state.chat.hasUnreadMessages);
//     const socketRef = useRef(null);

//     const isInitialLoadRef = useRef(true);

//     useEffect(() => {
//         // Скроллим вниз только при первой загрузке сообщений
//         if (isInitialLoadRef.current && messages.length > 0) {
//             messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
//             isInitialLoadRef.current = false;
//         }
//     }, [messages]);

//     useEffect(() => {
//         // Подключаем WS и сохраняем ссылку на socket
//         const thunk = connectWS({ token, roomId });
//         dispatch(thunk).then((res) => {
//             // В connectWS можно вернуть socket, чтобы сохранить его
//             if (res?.payload?.socket) {
//                 socketRef.current = res.payload.socket;
//             }
//         });

//         const scroll = () => {
//             if (isAutoScrollEnabledRef.current && messagesEndRef.current) {
//                 messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//             }
//         };

//         if (shouldScroll) {
//             scroll();
//             dispatch(resetScroll());
//         } else {
//             const timeout = setTimeout(scroll, 50);
//             return () => clearTimeout(timeout);
//         }

//     }, [token, roomId, shouldScroll, dispatch]);

//     useEffect(() => {
//         const el = containerRef.current;
//         if (el) el.addEventListener('scroll', handleScroll);

//         return () => {
//             if (el) el.removeEventListener('scroll', handleScroll);
//         };
//     }, [messages]);

//     const handleSend = () => {
//         if (text.trim()) {
//             dispatch(sendMessage({ roomId, text }));
//             setText('');
//         }
//     };

//     const handleScroll = () => {
//         const el = containerRef.current;
//         if (!el) return;

//         // console.log('scrollTop:', el.scrollTop, 'scrollHeight:', el.scrollHeight, 'clientHeight:', el.clientHeight);

//         const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
//         const isNearBottom = distanceFromBottom < 100;

//         // Если пользователь близко к низу — включаем автоскролл
//         isAutoScrollEnabledRef.current = isNearBottom;

//         if (isNearBottom) {
//             dispatch(setHasUnreadMessages(false));
//         }

//         // 👇 Подгрузка старых сообщений при скролле в самый верх
//         if (el.scrollTop <= 1 && messages.length > 0) {
//             if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
//                 console.warn('Socket not ready, skip LOAD_OLDER');
//                 return;
//             }

//             const oldest = messages[0];
//             console.log('oldest');

//             const prevScrollHeight = el.scrollHeight;

//             socketRef.current.send(JSON.stringify({
//                 type: 'LOAD_OLDER',
//                 roomId,
//                 before: oldest.timestamp // или oldest._id
//             }));

//             // После обновления сообщений восстанавливаем позицию
//             setTimeout(() => {
//                 const newScrollHeight = el.scrollHeight;
//                 el.scrollTop = newScrollHeight - prevScrollHeight;
//             }, 0);

//         }
//     };

//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//         dispatch(setHasUnreadMessages(false));
//     };

//     return (
//         <div style={{ position: 'relative' }}>
//             <div style={{ height: '400px', overflowY: 'auto', margin: '0 0 30px 0' }} ref={containerRef}>
//                 {Array.isArray(messages) && messages.length > 0 ? (
//                     <>
//                         {messages.map((msg) => {
//                             const senderUser = recipientName.find(user => user._id === msg.sender);
//                             const isOwnMessage = msg.sender === authUserId;

//                             return (
//                                 <p key={msg._id}>
//                                     <img
//                                         className={chatmodule.avatar}
//                                         src={`http://localhost:5000${senderUser?.photoUrl || ''}`}
//                                         alt="avatarPhoto"
//                                     />
//                                     <b>
//                                         {isOwnMessage
//                                             ? 'Вы'
//                                             : senderUser?.fullname || 'Неизвестный пользователь'}
//                                     </b>
//                                     {' --> '}
//                                     {msg.text}
//                                 </p>
//                             );
//                         })}
//                         {/* 👇 Прокрутка к этому элементу */}
//                         <div ref={messagesEndRef} />
//                     </>
//                 ) : (
//                     <p style={{ opacity: 0.5 }}>Нет сообщений или ошибка загрузки</p>
//                 )}
//             </div>
//             <input value={text} onChange={e => setText(e.target.value)} />
//             <button onClick={handleSend}>Send</button>

//             {hasUnreadMessages && (
//                 <FloatButton
//                     icon={<DownOutlined />}
//                     type="primary"
//                     style={{ right: 140, bottom: 400 }}
//                     onClick={scrollToBottom}
//                     tooltip="Показать новые сообщения"
//                 />
//             )}
//         </div>
//     );
// };