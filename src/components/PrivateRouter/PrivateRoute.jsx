import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const token = useSelector(state => state.auth.token);

    return token ? children : <Navigate to="/loginform" />;
}

export default PrivateRoute;