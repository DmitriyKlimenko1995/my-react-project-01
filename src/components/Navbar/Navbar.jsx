import React from "react";
import navmodule from './Navbar.module.css'
import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <nav className={navmodule.nav}>
            <div className={navmodule.item}>
                <NavLink to="/content" className={({ isActive }) => isActive ? navmodule.active : undefined}>Profile</NavLink>
            </div>
            <div className={navmodule.item}>
                <NavLink to="/dialogs" className={({ isActive }) => isActive ? navmodule.active : undefined}>Messages</NavLink>
            </div>
            <div className={navmodule.item}>
                <NavLink to="news">News</NavLink>
            </div>
            <div className={navmodule.item}>
                <NavLink to="/music">Music</NavLink>
            </div>
            <div className={navmodule.item}>
                <NavLink to="/settings">Settings</NavLink>
            </div>
        </nav>
    );
}

export default Nav;