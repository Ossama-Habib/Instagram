import Sidebar from '../../components/sidebar/Sidebar'
import UserInfo from '../../components/userInfo/UserInfo'
import './profile.css'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userInfo } from '../../features/UserInfoSlice';
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const dispatch = useDispatch()
  const {user} = useParams()
  const {loggedInUserId} = useSelector(store => store.auth)

  
  const sameUser = user === loggedInUserId

  useEffect(() => {
    if(user){
      dispatch(userInfo(user))
    }
  },[user])
  
  return (
    <section className='profile'>
       <Sidebar />
       <UserInfo sameUser = {sameUser} user= {user}/>
    </section>
  )
}

export default Profile