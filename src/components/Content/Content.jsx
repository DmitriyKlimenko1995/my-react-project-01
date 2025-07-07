import React from "react";
import contentmodule from './Content.module.css'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Content = (props) => {
    return (
        <div className={contentmodule.content}>
            <ProfileInfo />
            <MyPosts state={props.state} addPost={props.addPost} updateNewPostText={props.updateNewPostText} />
        </div>
    );
}

export default Content;