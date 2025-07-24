import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    messages: [
        {id: 1, message: 'sbdbzb'},
        {id: 2, message: 'fngmchg'},
        {id: 3, message: 'trjymbh nbv'},
        {id: 4, message: 'srtjtat'},
        {id: 5, message: 'uihpoifgb'},
        {id: 6, message: 'w3esergrh'}
    ],
    dialogs: [
        {id: 1, name: 'Dmitriy'},
        {id: 2, name: 'Taras'},
        {id: 3, name: 'Oleg'},
        {id: 4, name: 'Roman'},
        {id: 5, name: 'Volodumur'},
        {id: 6, name: 'Vadim'}
    ],
    newMessageText: "input text!"
};

const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    addMessage(state, action) {
        let newMessage = {
            id: state.messages.length + 1,
            message: state.newMessageText
        };

        state.messages.push(newMessage);
        state.newMessageText="";
    },
    updateNewMessageText(state, action) {
        debugger;
      state.newMessageText = action.payload;
    },
  },
});

export const { addMessage, updateNewMessageText } = dialogsSlice.actions;
export default dialogsSlice.reducer;


/* 
const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
    messages: [
        {id: 1, message: 'sbdbzb'},
        {id: 2, message: 'fngmchg'},
        {id: 3, message: 'trjymbh nbv'},
        {id: 4, message: 'srtjtat'},
        {id: 5, message: 'uihpoifgb'},
        {id: 6, message: 'w3esergrh'}
    ],
    newMessageText: "input text!"
};

const dialogsReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: state.messages.length + 1,
                message: state.newMessageText,
            };

            state.messages.push(newMessage);
            state.newMessageText="";
            break;
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newText;
            break;
        default:
            break;
    }
    return state;
}

export const addMessageActionCreator = () => ({type: ADD_MESSAGE})

export const updateNewMessageTextActionCreator = (text) => ({type: UPDATE_NEW_MESSAGE_TEXT, newText: text})

export default dialogsReducer; */