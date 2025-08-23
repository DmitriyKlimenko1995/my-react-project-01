import React, { useEffect } from "react";
import logo from "./../../logo.svg"
import headermodule from './Header.module.css'
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../MyData/auth-slice";
import { fetchUsers } from './../MyData/users-slice';
import { Col, Row } from 'antd';

const Header1 = (props) => {

    const dispatch = useDispatch();

    const status = useSelector((state) => state.auth.status);
    // const token = useSelector((state) => state.auth.token);
    const userId = localStorage.getItem('userId');
    const users = useSelector((state) => state.users.users);
    const user = users.find((u) => u._id === userId);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [status, dispatch]);

    const logOut = (e) => {
        e.preventDefault();
        dispatch(logout());
        props.handleSubscribe((prev => !prev));
    };

    return (
        <div className={headermodule.loginBlock}>
            {status === 'succeeded' ? (
                <div className={headermodule.logout}>
                    {user?.fullname ? user.fullname : 'Unknown User'}{' | '}
                    <a onClick={logOut}>logOut</a>
                </div>
            ) : (
                <div className={headermodule.authLinks}>
                    <NavLink to="/loginform">Login</NavLink> | <NavLink to="/registerform">Registration</NavLink>
                </div>
            )}
        </div>
    );
}

export default Header1;