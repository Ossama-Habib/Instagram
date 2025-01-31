import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllUsers = createAsyncThunk('/users', async (name, thunkAPI) => {
    const USERS_MESSAGES_URI = import.meta.env.VITE_USERS_MESSAGES_URI 
    try {
        const response = await fetch(USERS_MESSAGES_URI,{
            credentials: "include"
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(`Error in Get All User \n ${error.message}`)
    }
})

export const messageWithUser = createAsyncThunk('/user/message', async (name, thunkAPI) => {
  
    const GET_MESSAGES_URI = `${import.meta.env.VITE_MESSAGES_URI}/${name}`
    try {
        const response = await fetch(GET_MESSAGES_URI, {
            credentials: "include"
        })        
        const data = await response.json()
       
        return data
    } catch (error) {
        console.log(`Error in messageWithUser \n ${error.message}`)
    }
})

export const sendmessage = createAsyncThunk('/send/message', async (name, thunkAPI) => {

   const SEND_MESSAGE_URI = `${import.meta.env.VITE_SEND_MESSAGES_URI}/${name.userId}`
   try {
        const response = await fetch(SEND_MESSAGE_URI,{
            method: "POST",
            headers:{
                'Content-Type': "application/json"
            },
            body: JSON.stringify({message: name.message}),
            credentials: "include"
        })
        const data = await response.json()
        return data
   } catch (error) {
    console.log(`Error in send message \n ${error.message}`)
   }
})
const initialState = {
    isLoading: true,
    allUsers: [],
    selectedUserInfo:{},
    allMessages: []
}

const MessagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers:{
        selectedUser: (state, {payload}) => {
            state.selectedUserInfo = payload
        },
        newMessage: (state, {payload}) => {
            state.allMessages = [...state.allMessages, payload]
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllUsers.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getAllUsers.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.allUsers = payload
        })
        .addCase(messageWithUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(messageWithUser.fulfilled, (state, {payload}) => {
            state.isLoading = false
            if(payload.messages){
                state.allMessages = payload.messages            

            }
        })
        .addCase(sendmessage.fulfilled, (state, {payload}) => {
            state.allMessages = [...state.allMessages,payload]
        })
    }
})

export const {selectedUser, newMessage}  = MessagesSlice.actions
export default MessagesSlice.reducer