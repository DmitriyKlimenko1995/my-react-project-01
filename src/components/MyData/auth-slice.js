// features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
    return response.data.token;
});

export const registerUser = createAsyncThunk('auth/registerUser', async (credentials) => {
    await axios.post('http://localhost:5000/api/auth/register', credentials);
    return true;
});

const authToken = localStorage.getItem('authToken');
const authStatus = localStorage.getItem('authStatus');

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: authToken || null,
        status: authStatus || null,
        error: null,
    },
    reducers: {
        logout(state) {
            state.token = null;
            state.status = null;
            localStorage.removeItem('authToken');
            localStorage.removeItem('authStatus');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload;
                localStorage.setItem('authToken', action.payload);
                state.status = 'succeeded';
                localStorage.setItem('authStatus', 'succeeded');
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.status = 'registered';
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

/* // authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
    return response.data.token;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null, status: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload;
                debugger;
                state.status = 'success';
                
            });
    }
});

export default authSlice.reducer; */