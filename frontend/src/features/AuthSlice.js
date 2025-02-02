import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const logeinUser = createAsyncThunk('/user/login', async (userInfo, thunkAPI) => {
    const LOGIN__URL = import.meta.env.VITE_LOGIN_URI
    try {
        const response = await fetch(LOGIN__URL,{
            method: 'POST',
            headers:{
                'Content-Type': "Application/json"
            },
            body: JSON.stringify(userInfo),
            credentials: "include"
        })
        const data = await response.json()
        if(response.status === 200){
            return data
        }
        if(response.status === 401){
            return thunkAPI.rejectWithValue(data)
        }
        
    } catch (error) {
        console.log(`Error in loggedin \n ${error.message}`)
    }
})

export const registerUser = createAsyncThunk('/user/register', async (userInfo, thunkAPI) =>{
    const REGISTER__URL = import.meta.env.VITE_REGISTER_URI 
    try {
        const response = await fetch(REGISTER__URL, {
            method: "POST",
            headers:{
                'Content-Type': "application/json"
            },
            body: JSON.stringify(userInfo),
            credentials: 'include'
        })
        const data = await response.json()
        if(response.status === 400 || response.status === 401){
            return thunkAPI.rejectWithValue(data)
        }
    } catch (error) {
        console.log(`Error in Register User \n ${error.message}`)
    }
} )
const initialState = {
    isLoading: true,
    isUserLoggedIn: JSON.parse(localStorage.getItem('userLoggedIn'))?.isUserLoggedIn || false,
    loggedInUserId: JSON.parse(localStorage.getItem('userLoggedIn'))?.loggedInUserId,
    userRegisterd:  false,
    errorMessage : ''
}

const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState,
    reducers:{
        clearErrorMessage : (state) => {
            state.errorMessage = ''
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(logeinUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(logeinUser.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.isUserLoggedIn = true;
            state.loggedInUserId = payload.id
            localStorage.setItem('userLoggedIn', JSON.stringify({isUserLoggedIn: true, loggedInUserId: payload.id}))
        })
        .addCase(logeinUser.rejected, (state, {payload}) => {
            state.errorMessage = payload.msg
        })
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(registerUser.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.userRegisterd = true
        })
        .addCase(registerUser.rejected, (state, {payload}) => {
            state.errorMessage = payload.msg
        })
    }
})

export const {clearErrorMessage} = AuthSlice.actions
export default AuthSlice.reducer