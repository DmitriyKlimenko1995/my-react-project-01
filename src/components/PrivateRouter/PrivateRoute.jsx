import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children }) {
    const token = useSelector(state => state.auth.token);
    const location = useLocation();

    if (token) return children;

    // Если пользователь идёт на защищённый маршрут и пришёл с регистрации, отправляем обратно на регистрацию
    if (location.pathname === '/registerform') {
        return <Navigate to="/registerform" />;
    }

    return <Navigate to="/loginform" />;
    // return token ? children : <Navigate to="/loginform" />;
}

export default PrivateRoute;