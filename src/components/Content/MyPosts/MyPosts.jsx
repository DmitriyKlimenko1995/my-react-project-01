import React from "react";
import mypostsmodule from './MyPosts.module.css'
import Post from "./Post/Post";
import { useSelector, useDispatch } from "react-redux";
import { addPost, updateNewPostText } from "../../MyData/content-slice";

const MyPosts = () => {

    const content = useSelector((state) => state.content);
    const dispatch = useDispatch();

    let postsElements = content.posts.map(p => <Post message={p.message} likesCount={p.likesCount} />);

    let newPostElement = React.createRef();

    let addPosts = () => {
        dispatch(addPost());
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        dispatch(updateNewPostText(text));
    }

    return (
        <div className={mypostsmodule.postsBlock}>
            My posts
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement} value={content.newPostText}></textarea>
                </div>
                <button onClick={addPosts}>Add post</button>
            </div>
            <div className={mypostsmodule.posts}>
                { postsElements }
            </div>
        </div>
    );
}

export default MyPosts;