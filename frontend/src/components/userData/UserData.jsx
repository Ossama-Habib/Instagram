import './userData.css'
import { Link, useNavigate } from 'react-router-dom'
import { CiSettings } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { followUser } from '../../features/UserInfoSlice';
import { useDispatch } from 'react-redux';
import { messageWithUser, selectedUser } from '../../features/MessagesSlice';

const UserData = ({sameUser, user}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {profileImg,followers,followings,bio, userName, posts, userId, alreadyFollow} = useSelector(store => store.userInfo)
    // console.log(profileImg)
    const messageHandler = () => {
        dispatch(messageWithUser(user))
        dispatch(selectedUser({_id:userId, profileImg, userName}))
        navigate('/message')
    }
    
  return (
    <div className='userData'>
        <div className="userData__wrapper">
            {/* Image Div */}
            <div className="userData__userImage">
                <img src={profileImg} alt="" />
            </div>

            {/* Data Div */}
            <div className="userData__info">
                <div className="userData__info_name">
                    <h1>{userName}</h1>
                    {sameUser ? 
                        <Link>Edit Profile</Link>
                    :
                    <div className="userData__info_iteraction">
                        <button className='interaction__btn' onClick={() => dispatch(followUser(user))}>{alreadyFollow ? "Unfollow" : "Follow"}</button>
                        <button className='interaction__btn' onClick={messageHandler}>Message</button>

                    </div>
                }
                    <CiSettings className='userData__info_settingIcon' />
                </div>

                <div className="userData__info_follows">
                
                    <li>
                        <span>{posts.length}</span>
                        <span>posts</span>
                    </li>

                    <Link>
                        <li>
                            <span>{followers.length}</span>
                            <span>followers</span>
                        </li>
                    
                    </Link>

                    <Link>
                        <li>
                            <span>{followings.length}</span>
                            <span>followings</span>
                        </li>
                    
                    </Link>

                </div>
                <div className="userData__info_bio">
                    <p>warrior spirit with a love for tradition.!!!</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserData