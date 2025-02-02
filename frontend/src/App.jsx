import { Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import LoginPage from "./pages/loginpage/LoginPage"
import Register from "./pages/register/Register"
import HomeSwitch from "./components/homeSwitch/HomeSwitch"
import { useSelector } from "react-redux"
import Profile from "./pages/profile/Profile"
import { useEffect, useState } from "react"
import UserSpecificPost from "./components/userSpecificPost/UserSpecificPost"
import CreatePost from "./components/createPost/CreatePost"
import Message from "./pages/message/Message"
import ProtectedRoutes from "./components/protectedRoutes/ProtectedRoutes"
import CreateStory from "./components/createStory/CreateStory"
import { useContext } from 'react';
import { ModelContext } from "./context/modelContext"
import Story from "./components/Story/Story"
import Toast from "./components/toast/Toast"

function App() {
  const {isPostModalOpen} = useSelector(store => store.postInfo)
  const {storyModalOpen, setStoryModalOpen} = useContext(ModelContext)
  
  return (
    <>
     <Toast />
      {isPostModalOpen &&
        <CreatePost/>
      }
      {storyModalOpen && 
        <CreateStory storyModalOpen = {setStoryModalOpen} setStoryModalOpen = {setStoryModalOpen}/>
      }
    <main>
      <Routes>
        <Route path="/" element ={<ProtectedRoutes />}>
          <Route path="" element={<Home />  }/>
          <Route path="p/:postId" element={<UserSpecificPost />}/>
          <Route path=":user" element={<Profile />}/>
          <Route path="story/:storyId" element={<Story/>}/>
          <Route path="message" element={<Message />}/>

        </Route>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<Register />}/>

      </Routes>
      
    </main>
    </>
  )
}

export default App
