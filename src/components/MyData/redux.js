import { configureStore } from '@reduxjs/toolkit';
import contentSlice from "./content-slice";
import dialogsSlice from "./dialogs-slice";
import sitebarSlice from "./sitebar-slice";
import usersSlice from "./users-slice";
import authSlice from "./auth-slice";
import messagesSlice from "./messagesSlice";
import searchSlice from "./searchSlice";
import chatReducer from './chatSlice';

const store = configureStore({
    reducer: {
        content: contentSlice,
        dialogs: dialogsSlice,
        sitebar: sitebarSlice,
        users: usersSlice,
        auth: authSlice,
        messages: messagesSlice,
        search: searchSlice,
        chat: chatReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
});

/* let reducers = combineReducers({
    contentReducer: contentReducer,
    dialogsReducer: dialogsReducer,
    sitebarReducer: sitebarReducer
});

let store = createStore(reducers); */

export default store;
