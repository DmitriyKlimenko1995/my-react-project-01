import React from "react";
import mypostsmodule from './MyPosts.module.css'


const MyPosts = (props) => {

    /* const content = useSelector((state) => state.content);
    const dispatch = useDispatch();

    let postsElements = content.posts.map(p => <Post message={p.message} likesCount={p.likesCount} />);

    let newPostElement = React.createRef();

    let addPosts = () => {
        dispatch(addPost());
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        dispatch(updateNewPostText(text));
    } */


    return (
        <div className={mypostsmodule.postsBlock}>
            My posts
            <div>
                <div>
                    <textarea onChange={props.onPostChange} ref={props.newPostElement} value={props.content.newPostText}></textarea>
                </div>
                <button onClick={props.addPost}>Add post</button>
            </div>
            <div className={mypostsmodule.posts}>
                { props.postsElements }
            </div>
        </div>
    );
}

export default MyPosts;