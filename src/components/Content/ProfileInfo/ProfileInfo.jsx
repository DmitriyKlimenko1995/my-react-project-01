import React from "react";
import profileinfomodule from './ProfileInfo.module.css'
import logo from './../../../feature-pic.webp'

const ProfileInfo = (props) => {
    return (
        <div className={profileinfomodule.profile}>
            <div>
                <img src={logo} alt='mounts' />
            </div>
            <div className={profileinfomodule.description}>
                ava + description
            </div>
        </div>
    );
}

export default ProfileInfo;