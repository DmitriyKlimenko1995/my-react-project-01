import React, { useEffect } from "react";
import logo from "./../../logo.svg"
import headermodule from './Header.module.css'
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../MyData/auth-slice";
import { fetchUsers } from './../MyData/users-slice';

const Header = (props) => {

    const dispatch = useDispatch();

    const status = useSelector((state) => state.auth.status);
    // const token = useSelector((state) => state.auth.token);
    const userId = localStorage.getItem('userId');
    const users = useSelector((state) => state.users.users);
    const user = users.find((u) => u._id === userId);
    debugger;

    useEffect(() => {
        debugger;
        dispatch(fetchUsers());
    }, [dispatch]);

    const logOut = (e) => {
        e.preventDefault();
        dispatch(logout());
        props.handleSubscribe((prev => !prev));
    };

    return (
        <header className={headermodule.header}>
            <img src={logo} className="App-logo" alt="logo" />

            <div className={headermodule.loginBlock}>
                {status === 'succeeded' ? <div className={headermodule.logout} onClick={logOut}>{user?.fullname ? `${user.fullname} | LogOut` : 'Unknown User | LogOut'}</div> : <div>
                    <NavLink to={'/loginform'}>Login</NavLink>
                    <div></div>
                    <NavLink to={'/registerform'}>Registration</NavLink>
                </div>}

                {/* {token} */}
            </div>
        </header>
    );
}

export default Header;