import './messagesContainer.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getAllUsers, messageWithUser, sendmessage} from '../../features/MessagesSlice'
import {selectedUser} from '../../features/MessagesSlice'

const MessagesContainer = () => {
    const dispatch = useDispatch()
    const {allUsers,allMessages, selectedUserInfo} = useSelector(store => store.messages)
    const {loggedInUserId} = useSelector(store => store.auth)
    const [message, setMessage] = useState('')

    useEffect(() => {
        dispatch(getAllUsers())
    },[])
    
    
    const selectUser = (id, item) => {
        dispatch(messageWithUser(id))
        dispatch(selectedUser(item))
    }
    
    const messageFormController = (e) => {
        e.preventDefault()
        dispatch(sendmessage({userId: selectedUserInfo._id , message}))
        setMessage('')
    }

    return (
        <div className='messagesContainer'>
            <div className="messagesContainer__wrapper">
                <div className="messagesContainer__users">
                  
                    {allUsers.map((item, index) => {
                        // console.log(item)
                        const {profileImg, userName} = item
                        return(
                            <div className="messagesContainer__users_user" key={item._id} onClick={() => selectUser(item._id, item)}>
                            <img src={profileImg} alt="" className='image' />
                            <p>{userName}</p>
    
                        </div>
                        )
                    })}
                </div>

                    {Object.keys(selectedUserInfo).length === 0 ? 
                        <div className="messageContaienr__selectUser">
                            <h1>Your Messages</h1>
                        </div>
                : 
                <div className="messagesContainer__conversation">
                    <div className="messagesContainer__conversation_top">
                        <img src={selectedUserInfo.profileImg} alt="" className='image' />
                        <p>{selectedUserInfo.userName}</p>

                    </div>

                    <div className="messagesContainer__conversation_middle">
                        {allMessages.map((msg, index) => {
                            const {message, senderId} = msg
                            return(
                                <p key={index} style={{alignSelf: loggedInUserId === senderId ? "end" : "start"}}>{message}</p>
                            )
                        })}
                    </div>

                    <div className="messagesContainer__conversation_bottom">
                        <form onSubmit={messageFormController}>
                            <input type="text" placeholder='Message' value={message} onChange={(e) => setMessage(e.target.value)}/>
                            {/* <button type='submit'> send</button> */}
                        </form>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default MessagesContainer