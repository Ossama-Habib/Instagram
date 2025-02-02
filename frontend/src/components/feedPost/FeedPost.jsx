import './feedpost.css'
import { IoIosMore } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const FeedPost = ({ item}) => {
  const navigate = useNavigate()
  const { loggedInUserId } = useSelector(store => store.auth)
  const [like, setLike] = useState(item.likes.includes(loggedInUserId) || false)
  const [postLikes, setPostLikes] = useState(item.likes.length)
  
  const handleClick = async () => {

    try {
      const POSTLIKE_URI = `${import.meta.env.VITE_POSTLIKE_URI }/${item._id}/like`
      const response = await fetch(POSTLIKE_URI,{
          method: 'POST',
          headers:{
              'Content-Type' : "application/json"
          },
         credentials: 'include'
      })
      const data = await response.json()

      if(response.status === 200){
        const updatedLikes = like ? postLikes - 1 : postLikes + 1;
        setPostLikes(updatedLikes)
        setLike(!like);
      }
  
  } catch (error) {
      console.log(`Error in Like Post Slice \n ${error.message}`)
  }
  }

  return (
    <section className='feedPost'>
          <div className="feedPost__wrapper">
            <div className="feedPost__top">
              <div className="feedPost__top_left" onClick={() => navigate(`/${item.author._id}`)}>
                <img src={item.author.profileImg} alt="" />
                <p>{item.author.userName}</p>
              </div>
              <IoIosMore className='feedPost__top_rightIcon' />
            </div>

            <div className="feedPost__middle">
              <img src={`http://localhost:7000/${item.image}`} alt="" />
              
            </div>

            <div className="feedPost__bottom">
              <div className="feedPost__bottom_iteraction">
                <FaHeart className='bottom__iteraction_icon' onClick={() => handleClick(item)} style={{color: like ? "red" : "none"}} />
                <LuMessageCircle className='bottom__iteraction_icon' />
              </div>
              <p>{postLikes} likes</p>
              <div className="feedPost__bottom_caption">
                <p className='bottom__caption_user'>{item.author.userName}</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, expedita?</p>
              </div>

              <button className='feedPost__bottom_viewcomment' onClick={() => navigate(`/p/${item._id}`)}>view all comments</button>

              <form className='feedPost__comment_form'>
                <textarea placeholder='Add Comment'></textarea>
                <button>Post</button>
              </form>
            </div>
          </div>
        
    </section>
  )
}

export default FeedPost