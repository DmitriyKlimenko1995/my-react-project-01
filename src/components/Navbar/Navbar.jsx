import React from "react";
import navmodule from './Navbar.module.css'
import { NavLink } from "react-router-dom";
import Friend from "./Friend/Friend";
import { useSelector } from "react-redux";

const Nav = (props) => {

    const friends = useSelector((state) => state.sitebar);

    let friendElements = friends.friends.map(p => <Friend name={p.name} url={p.imageUrl} />);

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

            <div className={navmodule.friend}>
                Friends
                {friendElements}
            </div>
        </nav>
    );
}

export default Nav;