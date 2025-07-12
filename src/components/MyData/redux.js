import { configureStore } from '@reduxjs/toolkit';
import contentSlice from "./content-slice";
import dialogsSlice from "./dialogs-slice";
import sitebarSlice from "./sitebar-slice";
import usersSlice from "./users-slice";

const store = configureStore({
    reducer: {
        content: contentSlice,
        dialogs: dialogsSlice,
        sitebar: sitebarSlice,
        users: usersSlice
    },
});

/* let reducers = combineReducers({
    contentReducer: contentReducer,
    dialogsReducer: dialogsReducer,
    sitebarReducer: sitebarReducer
});

let store = createStore(reducers); */

export default store;
