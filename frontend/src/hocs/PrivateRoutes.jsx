import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Login from '../components/pages/Login';
import { UserAuth } from './Auth';

const PrivateRoutes = () => {
    const { user } = UserAuth();

    return(
        user
        ?
        <Outlet/>
        :
        <Navigate to='/login'/>
    )
}

export default PrivateRoutes;