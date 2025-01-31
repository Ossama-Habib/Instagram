import UserData from '../userData/UserData'
import UserPosts from '../userPosts/UserPosts'
import './userInfo.css'

const UserInfo = ({sameUser, user}) => {

  return (
    <div className='userInfo'>
        
        {/* User Data*/}
        <UserData sameUser = {sameUser} user = {user}/>

        {/* User Post */}
        <UserPosts />
    </div>
  )
}

export default UserInfo