import './homeswitch.css'
import frontPage from '../../assets/insta-front-page.jpeg'
import Login from '../login/Login'


const HomeSwitch = () => {
 
  

  return (
    <div className='homeSwitch'>
        {/* Image */}
        <div className="homeSwitch__image">
            <img src={frontPage} alt="" />
        </div>

        {/* Login Page */}
        <Login />
    </div>
  )
}

export default HomeSwitch