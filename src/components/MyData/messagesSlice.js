// features/messages/messagesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const sendMessage = createAsyncThunk("messages/send", async ({ recipientId, text, token }) => {
  const res = await fetch("http://localhost:5000/api/messages", {
    method: "POST",
    headers: { 
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json" },
    body: JSON.stringify({ recipientId, text }),
  });
  return res.json();
});

export const fetchDialog = createAsyncThunk("messages/fetchDialog", async ({userId, token}) => {
  console.log(token);
  const res = await fetch(`http://localhost:5000/api/messages/${userId}`, {
    method: "GET",
    headers: { 
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json" },
  });
  // console.log(res.json());
  return res.json();
});

const messagesSlice = createSlice({
  name: "messages",
  initialState: { dialog: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDialog.pending, (state) => { state.status = "loading"; })
      .addCase(fetchDialog.fulfilled, (state, action) => {
        state.dialog = action.payload;
        // console.log(action.payload);
        state.status = "succeeded";
      });
  },
});

export default messagesSlice.reducer;