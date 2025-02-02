import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userInfo = createAsyncThunk('/userinfo', async (userId ,thunkAPI) => {
    const state = thunkAPI.getState();
    const loggedInUserId = state.auth.loggedInUserId;

    const PROFILE_URL = `${import.meta.env.VITE_USER_PROFILE_URI}/${userId}`
    try {
        if(userId){
            const response = await fetch(PROFILE_URL, {
                method: "GET",
                credentials: 'include'
            })
            const data = await response.json()
            return {data, loggedInUserId}
            

        }
    } catch (error) {
        console.log('Error in userInfo Slice' + error.message)
    }
})

export const searchUser = createAsyncThunk('/search/user', async (user, thunkAPI) => {
    const SEARCH_URI = `${import.meta.env.VITE_SEARCH_USER_URI}?user=${user}`
    try {
        const response = await fetch(SEARCH_URI, {
            credentials: "include"
        })        
        const data = await response.json()
        return data

    } catch (error) {
        console.log(`Error in SearchUser \n ${error.message}`)
    }
})

export const followUser = createAsyncThunk('/follow/user', async (user, thunkAPI) => {
    const FOLLOW_URI = `${import.meta.env.VITE_FOLLOW_USER_URI}/${user}`
    try {
        const response = await fetch(FOLLOW_URI, {
            method: "POST",
            headers:{
                'Content-Type' : "application/json"
            },
            credentials: "include"
        })
        const data = await response.json()   
        return data
    } catch (error) {
        console.log(`Error in follow user \n ${error.message}`)
    }
})

const initialState = {
    isLoading: true,
    userId: "",
    posts: [],
    followers: '',
    followings: '',
    bio: '',
    profileImg: '',
    userName: '',
    users: [],
    alreadyFollow: false
}


const UserInfoSlice = createSlice({
    name: 'UserInfoSlice',
    initialState,
    reducers:{
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(userInfo.pending, (state) => {
            state.isLoading = true
        })
        .addCase(userInfo.fulfilled, (state, {payload}) => {
           
            if(payload){
                state.userId = payload.data.user._id
                state.posts = payload.data.posts
                state.followers = payload.data.followers
                state.followings = payload.data.followings
                state.bio = payload.data.bio
                state.profileImg = payload.data.user.profileImg
                state.userName = payload.data.user.userName
                state.alreadyFollow = payload.data.followers.includes(payload.loggedInUserId)
                state.isLoading = false;
            
            }
        })
        .addCase(searchUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(searchUser.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.users = payload
        })
        .addCase(followUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(followUser.fulfilled, (state, {payload}) => {
            state.isLoading = false
        })
    }
})

export default UserInfoSlice.reducer