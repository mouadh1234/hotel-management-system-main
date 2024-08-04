import { createSlice } from "@reduxjs/toolkit";

const UserReducer = createSlice({
  name: "user",
  initialState: {value:{}},
  reducers: {
    addUser: (state, action) => {
      state.value = action.payload;
      console.log(state.value,'user logged in');
    },
  },
});

export const { addUser } = UserReducer.actions;
export default UserReducer.reducer
