import React from "react";
import mypostsmodule from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div>
            My posts
            <div>
                <textarea></textarea>
                <button>Add post</button>
            </div>
            <div className={mypostsmodule.posts}>
                <Post message="Hi how are you?" />
                <Post message="I'm finw thank you" />
            </div>
        </div>
    );
}

export default MyPosts;