import { useEffect } from 'react'
import './toast.css'
import { useSelector } from 'react-redux'
import { clearErrorMessage } from '../../features/AuthSlice'
import { useDispatch } from 'react-redux'

const Toast = () => {
    const dispatch = useDispatch()
    let {errorMessage} = useSelector(store => store.auth)
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(clearErrorMessage())
        }, 3000)

        return () => clearTimeout(timeout)
    }, [errorMessage])
    
  return (
    <>
    {errorMessage &&
        <div className='toast'>
            {errorMessage}
        </div>}
    </>
  )
}

export default Toast