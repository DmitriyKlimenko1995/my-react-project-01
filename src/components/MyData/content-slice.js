
import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    posts: [
        {id: 1, message: 'Hi how are you?', likesCount: 45},
        {id: 2, message: "I'm fine thank you", likesCount: 49}
    ],
        newPostText: "input text!"
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    addPost(state, action) {
      let newPost = {
        id: state.posts.length + 1,
        message: state.newPostText,
        likesCount: state.posts.length
      };

      state.posts.push(newPost);
      state.newPostText="";
    },
    updateNewPostText(state, action) {
      state.newPostText = action.newText;
    },
  },
});

export const { addPost, updateNewPostText } = contentSlice.actions;
export default contentSlice.reducer;

/* 
const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

let initialState = {
    posts: [
        {id: 1, message: 'Hi how are you?', likesCount: 45},
        {id: 2, message: "I'm fine thank you", likesCount: 49}
    ],
        newPostText: "input text!"
};

const contentReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_POST:
            let newPost = {
                id: state.posts.length + 1,
                message: state.newPostText,
                likesCount: state.posts.length
            };

            state.posts.push(newPost);
            state.newPostText="";
            break;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            break;
        default: break;
    }
    return state;
}

export const addPostActionCreator = () => ({type: ADD_POST})

export const updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text})

export default contentReducer; */