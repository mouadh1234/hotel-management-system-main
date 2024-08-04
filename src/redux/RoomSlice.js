import { createSlice } from "@reduxjs/toolkit";

const RoomReducer = createSlice({
    name:'rooms',
    initialState:{value:{}},
    reducers:{getRooms:(state,action)=>{
        state.value = action.payload
        console.log('rooms',state.value);
    }}
})

export const {getRooms} = RoomReducer.actions;
export default RoomReducer.reducer