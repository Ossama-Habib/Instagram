import { Link } from 'react-router-dom'
import './register.css'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../features/AuthSlice'
import { useState } from 'react'

const Register = () => {
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')

  const registerFormHandler = (e) => {
    e.preventDefault()
    dispatch(registerUser({userName, email, password}))
    setUserName("")
    setEmail('')
    setPassword('')
  }

  return (
    <section className='register'>
        <div className="register__wrapper">
            <form className='register__form' onSubmit={registerFormHandler}>
                <h1>Register</h1>
                <label htmlFor="userName">User Name :</label>
                <input type="text" name="userName" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)}/>

                <label htmlFor="email">Email :</label>
                <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="password">Password :</label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              <button className='register__form_button' type='submit'>Register</button>
            </form>

            <p className='register__haveacount'>Already have account? <Link to={'/login'}>login</Link></p>
        </div>
    </section>
  )
}

export default Register