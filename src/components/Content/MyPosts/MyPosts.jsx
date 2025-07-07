import React from "react";
import mypostsmodule from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = (props) => {

    let postsElements = props.state.profilePage.posts.map(p => <Post message={p.message} likesCount={p.likesCount} />);

    let newPostElement = React.createRef();

    let addPost = () => {
        let text = newPostElement.current.value;
        props.addPost(text);
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }

    return (
        <div className={mypostsmodule.postsBlock}>
            My posts
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.state.profilePage.newPostText}></textarea>
                </div>
                <button onClick={addPost}>Add post</button>
            </div>
            <div className={mypostsmodule.posts}>
                { postsElements }
            </div>
        </div>
    );
}

export default MyPosts;