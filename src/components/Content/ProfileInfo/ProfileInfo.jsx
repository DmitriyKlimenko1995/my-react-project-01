import React from "react";
import profileinfomodule from './ProfileInfo.module.css'

const ProfileInfo = (props) => {
    return (
        <div className={profileinfomodule.profile}>
            <div>
                <img src='https://www.wearegecko.co.uk/media/50316/mountain-3.jpg' alt='mounts' />
            </div>
            <div className={profileinfomodule.description}>
                ava + description
            </div>
        </div>
    );
}

export default ProfileInfo;