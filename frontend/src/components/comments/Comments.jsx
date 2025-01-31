import './comments.css'
import { IoIosMore } from "react-icons/io";
import insta from '../../assets/insta-front-page.jpeg'
import { useSelector } from 'react-redux';
import { FaRegHeart } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import { createPostComment } from '../../features/PostSlice';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../features/PostSlice';
import { useState } from 'react';

const Comments = ({ item }) => {

    const { loggedInUserId } = useSelector(store => store.auth)
    const { comments } = useSelector(store => store.postInfo)
    const dispatch = useDispatch()
    const [createComment, setCreateComment] = useState('')
    const [moreModal, setMoreModal] = useState(false)
    const [postLikes, setPostLikes] = useState(item.likes.length)
    const [liked, setLiked] = useState(item.likes.includes(loggedInUserId) || false);

    const handleCommentForm = (e) => {
        e.preventDefault()
        dispatch(createPostComment({ postId: item._id, comment: createComment }))
    }

    const handlePostLike =async () => {
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
                const updatedLikes = liked ? postLikes - 1 : postLikes + 1;
                setPostLikes(updatedLikes)
                setLiked(!liked);
            }
        } catch (error) {
            console.log(`Error in Like Post Slice \n ${error.message}`)
        }

    }



    return (
        <div className='comments'>
            <div className="comments__top">
                <div className="comments__top_info">
                    <img src={item.author.profileImg} alt="" />
                    <h3>{item.author.userName}</h3>
                </div>

                <div className="top__info_right">
                    <IoIosMore className='comments__topinfo_moreicon' onClick={() => setMoreModal(!moreModal)} />

                    <div className="top__info_delete" style={{ display: moreModal ? "block" : "none" }} >
                        <button onClick={() => dispatch(deletePost(item._id))}>Delete Post</button>
                    </div>

                </div>
            </div>

            <div className="comments__middle">
                {comments.map((item, index) => {
                    const { author: { profileImg } } = item
                    // console.log(profileImg)
                    return (
                        <div key={index} className="comments__postcomment">
                            <img src={profileImg} alt="" />
                            <span style={{ fontWeight: 700, color: "red" }}>{item.author.userName}</span>
                            <p>{item.comment}</p>
                        </div>
                    )
                })}
            </div>

            <div className="comments__botom">
                {/* iteraction, like,comment */}
                <div className="comment__iteraction">
                    <FaRegHeart className='comment__iteraction_icon' onClick={handlePostLike} style={{color: liked ? "red" : "none"}} />
                    <LuMessageCircle className='comment__iteraction_icon' />

                    <p>{postLikes} likes</p>
                    <p>{item.createdAt}</p>
                </div>

                <form className='post__comment' onSubmit={handleCommentForm}>
                    <textarea placeholder='Add Comment' value={createComment} onChange={(e) => setCreateComment(e.target.value)}></textarea>
                    <button type='submit'>post</button>
                </form>
            </div>
        </div>
    )
}

export default Comments