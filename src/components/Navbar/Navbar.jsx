import React from "react";
import navmodule from './Navbar.module.css'
import { NavLink } from "react-router-dom";
import Friend from "./Friend/Friend";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { setUsers } from "../MyData/users-slice";
import PrivateRoute from "../PrivateRouter/PrivateRoute";



const Nav = (props) => {

    const userId = localStorage.getItem('userId');
    const [listUsers, setListUsers] = useState([]);
    debugger;

    const dispatch = useDispatch();

    useEffect(() => {
        debugger;
        const fetchUsers = async () => {
            debugger;
            try {
                debugger;
                const res = await fetch(`http://localhost:5000/api/users`);
                const data = await res.json();
                debugger;

                setListUsers(data.users);
                debugger;
            } catch (error) {
                console.error("Ошибка при загрузке пользователей:", error);
            }
        };

        fetchUsers();
    }, [props.refreshFlag]);
    debugger;

    const myFollowing = listUsers.find(u => u._id === userId);
    debugger;

    const followedUsers = listUsers.filter(user =>
        myFollowing?.following?.some(id => id === user._id)
    );


    const friendElements = followedUsers.map(p => (
        <Friend key={p._id} name={p.fullname} url={p.photoUrl} />
    ));


    return (
        <nav className={navmodule.nav}>
            <div className={navmodule.item}>
                <NavLink to="/content" className={({ isActive }) => isActive ? navmodule.active : undefined}>Profile</NavLink>
            </div>
            <div className={navmodule.item}>
                <NavLink to="/dialogs" className={({ isActive }) => isActive ? navmodule.active : undefined}>Messages</NavLink>
            </div>
            <div className={navmodule.item}>
                <NavLink to="/users" className={({ isActive }) => isActive ? navmodule.active : undefined}>Users</NavLink>
            </div>
            <div className={navmodule.item}>
                <NavLink to="/news">News</NavLink>
            </div>
            <div className={navmodule.item}>
                <NavLink to="/music">Music</NavLink>
            </div>
            <div className={navmodule.item}>
                <NavLink to="/settings">Settings</NavLink>
            </div>
            <div className={navmodule.item}>
                <NavLink to="/chat">Chat</NavLink>
            </div>
            <PrivateRoute>
                <div className={navmodule.friend}>
                    Friends
                    {friendElements}
                </div>
            </PrivateRoute>
        </nav>
    );
}

export default Nav;