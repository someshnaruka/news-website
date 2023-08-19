import { createSlice } from "@reduxjs/toolkit";
 const initialState={
    userList:{
        name:"",
        username:"",
    },
    newsList:[],
    savedList:[],
 }

 export const Userslice=createSlice({
    name:"user",
    initialState,
    reducers:{
        loginRedux:(state,action)=>{
            console.log(action.payload,"user data");
            state.userList.name=action.payload.displayName;
            state.userList.username=action.payload.email;
        },
        newsRedux:(state,action)=>{
            console.log(action.payload,"news data");
            state.newsList=[action.payload]
        },
        logoutRedux:(state,action)=>{
            state.userList.name="";
            state.userList.username="";
        },
    //     savedRedux:(state,action)=>{
    //         console.log(action.payload); 
    //   state.savedList=[action.payload]
    //   console.log(state.savedList);
    //     }
    }
 });

 export const {loginRedux,newsRedux,logoutRedux}=Userslice.actions;
 export default Userslice.reducer;