// chatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let socket;

export const connectWS = createAsyncThunk(
    'chat/connectWS',
    async ({ token, roomId }, { dispatch }) => {
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
                dispatch(addMessage(data.message));
            } else if (data.type === 'BACKFILL') {
                dispatch(setMessages(data.messages));
            }
            console.log('📩 Message from server:', data);
        };
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
        connected: false
    },
    reducers: {
        setConnected: (state, action) => {
            state.connected = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        }
    }
});

export const { setConnected, addMessage, setMessages } = chatSlice.actions;
export default chatSlice.reducer;