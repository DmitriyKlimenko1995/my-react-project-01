import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  users: [],
  newPostText: "input text!"
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    follow(state, action) {
      let user = state.users.find(el => el.id === action.payload);
      if(user) {
        user.followed = true;
      }
    },
    unFollow(state, action) {
      let user = state.users.find(el => el.id === action.payload);
      if(user) {
        user.followed = false;
      }
    },
    setUsers(state, action) {
      state.users = action.payload;
    }
  },
});

export const { follow, unFollow, setUsers } = usersSlice.actions;
export default usersSlice.reducer;

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