import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../redux/features/authSlice";

import React from 'react'

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()

    return (
        // basic implementation - can check token here and/or roles
        token 
            ? <Outlet />
            : <Navigate to='/loginPage' state={{ from: location }} replace />
    )
}

export default RequireAuth;