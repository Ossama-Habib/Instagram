import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'

const ProtectedRoutes = () => {
    const {isUserLoggedIn} = useSelector(store => store.auth)

    const navigate = useNavigate();
    useEffect(() => {
        if (!isUserLoggedIn) {
            navigate("/login");
        }
    }, [isUserLoggedIn, navigate]);
   
    return isUserLoggedIn ? <Outlet /> : null;
}

export default ProtectedRoutes