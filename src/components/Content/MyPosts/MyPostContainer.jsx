import React from "react";
import MyPost from "./MyPosts";
import Post from "./Post/Post";
import { connect } from "react-redux";
import { addPost, updateNewPostText, setPosts } from "../../MyData/content-slice";

class MyPostContainer extends React.Component {
    constructor(props) {
        super(props);
        this.newPostElement = React.createRef();
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/posts')
            .then(res => res.json())
            .then(data => this.props.setPosts(data[1].posts));
    }

    addPosts = () => {
        this.props.addPost();
    };

    onPostChange = () => {
        const text = this.newPostElement.current.value;
        this.props.updateNewPostText(text);
    };


    render() {

        console.log(this.props.content.posts);

        const postsElements = this.props.content.posts.map(p => (
            <Post key={p.id} message={p.message} likesCount={p.likesCount} />
        ));

        return (
            <MyPost
                content={this.props.content}
                postsElements={postsElements}
                newPostElement={this.newPostElement}
                addPost={this.addPosts}
                onPostChange={this.onPostChange}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    content: state.content,
});

const mapDispatchToProps = {
    addPost,
    updateNewPostText,
    setPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPostContainer);