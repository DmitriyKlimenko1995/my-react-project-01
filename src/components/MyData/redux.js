import { configureStore } from '@reduxjs/toolkit';
import contentSlice from "./content-slice";
import dialogsSlice from "./dialogs-slice";
import sitebarSlice from "./sitebar-slice";
import usersSlice from "./users-slice";
import authSlice from "./auth-slice";
import messagesSlice from "./messagesSlice";

const store = configureStore({
    reducer: {
        content: contentSlice,
        dialogs: dialogsSlice,
        sitebar: sitebarSlice,
        users: usersSlice,
        auth: authSlice,
        messages: messagesSlice,
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
