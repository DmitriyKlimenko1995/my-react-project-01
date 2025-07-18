import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (pID, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      const data = await response.json();
      return [data.users, pID]; // будет в action.payload при успешной загрузке
    } catch (err) {
      return rejectWithValue("Ошибка загрузки пользователей");
    }
  }
);

let initialState = {
  users: [],
  newPostText: "input text!",
  pageSize: 3,
  totalUsersCount: 20,
  currentPage: 2,
  totalPages: 1,
  ProfileData: {},
  loading: true,
  error: null,
  isFetching: true
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
    },
    setUsersCount(state, action) {
      state.totalUsersCount = action.payload;
    },
    setUsersCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setUsersTotalPages(state, action) {
      state.totalPages = action.payload;
    },
    toggleIsFetching(state, action) {
      state.isFetching = action.payload;
    },
    setProfileData(state, action) {
      state.ProfileData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = [...action.payload[0]];
        state.ProfileData = state.users[action.payload[1]];
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { follow, unFollow, setUsers, setUsersCount, setUsersCurrentPage, setUsersTotalPages, toggleIsFetching, setProfileData } = usersSlice.actions;
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