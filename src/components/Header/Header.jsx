import React from "react";
import logo from "./../../logo.svg"
import headermodule from './Header.module.css'
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../MyData/auth-slice";

const Header = (props) => {

    const dispatch = useDispatch();

    const status = useSelector((state) => state.auth.status);
    const token = useSelector((state) => state.auth.token);
    debugger;

    const logOut = (e) => {
        e.preventDefault();
        dispatch(logout());
        props.handleSubscribe((prev => !prev));
    };

    return (
        <header className={headermodule.header}>
            <img src={logo} className="App-logo" alt="logo" />

            <div className={headermodule.loginBlock}>
                {status === 'succeeded' ? <div className={headermodule.logout} onClick={logOut}>LogOut</div> : <div>
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