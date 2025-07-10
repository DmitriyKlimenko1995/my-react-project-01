
import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  friends: [
    {name: "Dimon", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNbkECXtEG_6-RV7CSNgNoYUGZE-JCliYm9g&s"},
    {name: "Sava", imageUrl: "https://images.unsplash.com/photo-1628563694622-5a76957fd09c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"},
    {name: "Vasia", imageUrl: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"}
  ]
};

const sitebarSlice = createSlice({
  name: 'sitebar',
  initialState,
  reducers: {},
});

// export const {  } = sitebarSlice.actions;
export default sitebarSlice.reducer;