import { Link, useNavigate , useLocation} from 'react-router-dom'
import './userPosts.css'
import UserSpecificPost from '../userSpecificPost/UserSpecificPost'
import { useSelector } from 'react-redux'

const UserPosts = () => {
    const navigate = useNavigate()
    const { posts } = useSelector(store => store.userInfo)

    const viewPost = (item) => {
        navigate(`/p/${item._id}`)
    }
    return (

        <div className='userPosts'>
            <div className="userPosts__wrapper">
                {/* Links */}
                <div className="userPosts__links">
                    <Link to={'/posts'} >Posts</Link>
                    
                </div>

                {/* all Post */}
                <div className="userPosts__post">
                    {posts.map((item, index) => {
                        const {image, caption, likes, comments} = item
                        return (
                            <div key={index} className="userPosts__post_singlepost" onClick={() => viewPost(item)} state={{ background: location }}  >
                                <img className='userPosts__post_img' src={`http://localhost:7000${image}`} alt="" />
                                <div className="hover-overlay">
                                    <div className="hover-info">
                                        <span>❤️ {likes.length}</span>
                                        <span>💬 {comments.length}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>

        </div>
    )
}


export default UserPosts