import { useEffect, useState } from 'react'
import './login.css'
import { logeinUser } from '../../features/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link , useNavigate} from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const {isUserLoggedIn} = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginFormHandler = (e) => {
        e.preventDefault()
        dispatch(logeinUser({email,password}))
        setEmail('')
        setPassword('')
    }

    useEffect(() => {
        if(isUserLoggedIn){
            navigate('/')
        }
    }, [isUserLoggedIn])
    
  return (
    <div className='login'>
        <div className="login__wrapper">
            <form className='login__form' onSubmit={loginFormHandler}>
                <h1>Instagram</h1>
                <label htmlFor="email">Email:</label>
                <input 
                    type="text" 
                    name="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit' className='login__form_button'>Login</button>
            </form>

            <p className='login__noaccout'>Don't have account? <Link to={'/register'}>register</Link></p>
        </div>
    </div>
  )
}

export default Login