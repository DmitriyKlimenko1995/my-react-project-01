import React from "react";
import contentmodule from './Content.module.css'
import MyPosts from './MyPosts/MyPosts'

const Content = () => {
    return (
        <div className={contentmodule.content}>
            <div>
                <img src='https://www.wearegecko.co.uk/media/50316/mountain-3.jpg' alt='mounts' />
            </div>
            <div>
                ava + description
            </div>
            <MyPosts />
        </div>
    );
}

export default Content;