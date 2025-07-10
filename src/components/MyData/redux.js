import { configureStore } from '@reduxjs/toolkit';
import contentSlice from "./content-slice";
import dialogsSlice from "./dialogs-slice";
import sitebarSlice from "./sitebar-slice";

const store = configureStore({
    reducer: {
        content: contentSlice,
        dialogs: dialogsSlice,
        sitebar: sitebarSlice
    },
});

/* let reducers = combineReducers({
    contentReducer: contentReducer,
    dialogsReducer: dialogsReducer,
    sitebarReducer: sitebarReducer
});

let store = createStore(reducers); */

export default store;
