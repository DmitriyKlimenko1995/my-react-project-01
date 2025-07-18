import React, { useEffect } from "react";
import logo from "./../../logo.svg"
import headermodule from './Header.module.css'
import { NavLink } from "react-router-dom";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../MyData/auth-slice";

const HeaderContainer = () => {
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token);
    debugger;

    useEffect(() => {
        debugger;
        dispatch(loginUser());
        debugger;
    }, [dispatch]);
    debugger;

    return <Header token={token} />

}

export default HeaderContainer;