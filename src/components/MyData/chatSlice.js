// chatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let socket;

export const connectWS = createAsyncThunk(
    'chat/connectWS',
    async ({ token, roomId, containerRef, authUserId }, { dispatch }) => {
        socket = new WebSocket(`ws://localhost:4000?token=${token}`);

        socket.onopen = () => {
            console.log('✅ WebSocket connected');

            dispatch(setConnected(true));
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ type: 'JOIN', roomId }));
            } else {
                console.warn('⏳ WebSocket not ready, delaying send...');
                socket.addEventListener('open', () => {
                    socket.send(JSON.stringify({ type: 'JOIN', roomId }));
                }, { once: true });
            }

        };

        socket.onerror = (err) => {
            console.error('❌ WebSocket error:', err);
        };

        socket.onmessage = e => {
            const data = JSON.parse(e.data);
            if (data.type === 'MESSAGE') {
                const el = containerRef.current;
                const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
                const isNearBottom = distanceFromBottom < 100;

                dispatch(addMessage({
                    ...data.message,
                    isOwn: data.message.sender === authUserId,
                    wasAtBottom: isNearBottom
                }));

            } else if (data.type === 'BACKFILL') {
                dispatch(setMessages(data.messages));
            } else if (data.type === 'OLDER_MESSAGES') {
                dispatch(prependMessages(data.messages));
            }
            console.log('📩 Message from server:', data);
        };

        // 👇 Возвращаем сокет наружу
        return { socket };

    }
);

export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async ({ roomId, text }) => {
        console.log(socket?.readyState === WebSocket.OPEN);
        if (socket?.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: 'MESSAGE', roomId, text }));
        }
    }
);

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
        connected: false,
        shouldScroll: false, // 👈 новый флаг
        hasUnreadMessages: false,
    },
    reducers: {
        setConnected: (state, action) => {
            state.connected = action.payload;
        },
        addMessage: (state, action) => {
            const exists = state.messages.some(m => m._id === action.payload._id);
            if (!exists) {
                state.messages.push(action.payload);

                // Если это чужое сообщение и пользователь был внизу — скроллим
                if (!action.payload.isOwn && action.payload.wasAtBottom) {
                    state.shouldScroll = true;
                }

                // Если это своё сообщение — скроллим только если был внизу
                if (action.payload.isOwn && action.payload.wasAtBottom) {
                    state.shouldScroll = true;
                }

                if (action.payload.isOwn && !action.payload.wasAtBottom) {
                    state.hasUnreadMessages = true;
                }

                // Если чужое сообщение и пользователь не внизу — показываем "новые сообщения"
                if (!action.payload.isOwn && !action.payload.wasAtBottom) {
                    state.hasUnreadMessages = true;
                }
            }
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        resetScroll: (state) => {
            state.shouldScroll = false;
        },
        setHasUnreadMessages: (state, action) => {
            state.hasUnreadMessages = action.payload;
        },
        prependMessages: (state, action) => {
            // Вставляем в начало, не дублируем
            const newOnes = action.payload.filter(
                m => !state.messages.some(existing => existing._id === m._id)
            );
            state.messages = [...newOnes, ...state.messages];
        }
    }
});

export const { setConnected, addMessage, setMessages, resetScroll, setHasUnreadMessages, prependMessages } = chatSlice.actions;
export default chatSlice.reducer;