import React, { useEffect, useRef } from "react";
import MyPost from "./MyPosts";
import Post from "./Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { addPost, updateNewPostText, setPosts } from "../../MyData/content-slice";

const MyPostContainer = () => {
    const dispatch = useDispatch();
    const content = useSelector(state => state.content);
    const newPostElement = useRef();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/posts');
                if (!res.ok) throw new Error('Server error');
                const data = await res.json();
                dispatch(setPosts(data[0]?.posts || []));
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        };

        fetchPosts();
    }, [dispatch]);

    const addPosts = () => {
        dispatch(addPost());
    };

    const onPostChange = () => {
        const text = newPostElement.current?.value || "";
        dispatch(updateNewPostText(text));
    };

    const postsElements = content.posts.map(p => (
        <Post key={p.id} message={p.message} likesCount={p.likesCount} />
    ));

    return (
        <MyPost
            content={content}
            postsElements={postsElements}
            newPostElement={newPostElement}
            addPost={addPosts}
            onPostChange={onPostChange}
        />
    );
};

export default MyPostContainer;