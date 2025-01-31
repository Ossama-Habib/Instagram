import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createPostComment = createAsyncThunk('/post/comment', async (name, thunkAPI) => {
    const CREATE_COMMENT_URI = `${import.meta.env.VITE_CREATE_COMMENT_URI}/${name.postId}/comment`
    try {
        const response = await fetch(CREATE_COMMENT_URI, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({comment: name.comment}),
            credentials: 'include'
        })
        const data = await response.json()
    } catch (error) {
        console.log(`Error in create post comment\n${error.message}`)        
    }
})

export const createPost = createAsyncThunk('/post', async (name, thunkAPI) => {
    const POST_URI = VITE_CREATE_POST_URI
    const formData = new FormData()
    formData.append('image', name)
    try {
        const response = await fetch(POST_URI,{
            method: "POST",
            body: formData,
            credentials: "include"
        })
        const data = await response.json()
       
    } catch (error) {
        console.log(`Error in Create post \n ${error.message}`)
    }
})

export const deletePost = createAsyncThunk('/post/delete', async (name, thunkAPI) => {
    const DELETE_POST_URI = `${VITE_DELETE_POST_URI}/${name}`
    try {
        const response = await fetch(DELETE_POST_URI,{
            method:"DELETE",
            credentials: "include"
        })
        const data  = await response.json()
 
    } catch (error) {
        console.log(`Error in Delete Post \n ${error.message}`)
    }
})
const initialState= {
    isLoading: true,
    comments: [],
    isPostModalOpen: false,
    postLikes : [],
   
}

const PostSlice = createSlice({
    name: 'PostSlice',
    initialState,
    reducers:{
        openPostModal: (state, {payload}) =>{
            state.isPostModalOpen = true
        },
        closePostModal: (state) => {
            state.isPostModalOpen = false
        },
        postsComment: (state, {payload}) => {
            state.comments = payload
        },
        newPostComment: (state, {payload}) => {
            state.comments = [...state.comments, payload]
        }

    },
    extraReducers: (builder) => {
    
    }
})

export const {openPostModal, closePostModal, postsComment, newPostComment} = PostSlice.actions
export default PostSlice.reducer
