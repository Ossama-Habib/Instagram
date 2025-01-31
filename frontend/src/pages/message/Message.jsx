import './message.css'
import Sidebar from '../../components/sidebar/Sidebar'
import MessagesContainer from '../../components/messagesContainer/MessagesContainer'

const Message = () => {
  return (
    <section className='message'>
        <Sidebar />
        <MessagesContainer />
    </section>
  )
}

export default Message