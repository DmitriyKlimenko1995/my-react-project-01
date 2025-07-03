import React from "react";
import postmodule from './Post.module.css';

const Post = (props) => {
    const message = props.message;

    return (
        <div className={postmodule.item}>
            <img src="https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg" alt="ava" />;
            <div>
                {message}
            </div>
            <div>
                <span>like</span>
            </div>
        </div>
    );
}

export default Post;