import './userSpecificPost.css'
import { IoMdClose } from "react-icons/io";
import Comments from '../comments/Comments';
import { useEffect, useState } from 'react'
import { useParams, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postsComment } from '../../features/PostSlice';


const UserSpecificPost = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { postId } = useParams()
  const [loading, setLoading] = useState(true)
  const [item, setItem] = useState({})

  const singlePost = async () => {
    const SINGLE_POST_URI = `${import.meta.env.VITE_SINGLE_POST_URI}/${postId}`
    try {
      const response = await fetch(SINGLE_POST_URI, {
        method: "GET",
        credentials: 'include'
      })
      const data = await response.json()
      setItem(data)
      dispatch(postsComment(data.comments))

      setLoading(false)
    } catch (error) {
      console.log(`Error in SinglePost \n ${error.message}`)
    }
  }

  useEffect(() => {
    singlePost()
  }, [])

  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <div className='userSpecificPost'>
      <IoMdClose className='userSpecificPost__closeicon' onClick={() => navigate(-1)} />
      <div className="userSpecificPost__wrapper">
        <div className="userSpecificPost__image_box">
          <img src={`http://localhost:7000${item.image}`} alt="" />
        </div>

        {/* Comments */}
        <Comments item={item} />
      </div>
    </div>
  )
}

export default UserSpecificPost