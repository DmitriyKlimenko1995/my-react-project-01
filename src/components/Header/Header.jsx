import React from "react";
import logo from "./../../logo.svg"
import headermodule from './Header.module.css'

const Header = () => {
    return (
        <header className={headermodule.header}>
            <img src={logo} className="App-logo" alt="logo" />
        </header>
    );
}

export default Header;