import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from './features/AuthSlice'
import UserInfoSlice from './features/UserInfoSlice'
import PostSlice from './features/PostSlice'
import MessagesSlice from './features/MessagesSlice'

const store = configureStore({
    reducer:{
        auth: AuthSlice,
        userInfo: UserInfoSlice,
        postInfo: PostSlice,
        messages: MessagesSlice
    }
})

export default store