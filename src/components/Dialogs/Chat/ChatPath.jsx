import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ChatBox from "./ChatBox";
import { fetchUsers } from './../../MyData/users-slice';
import React, { useEffect } from "react";

const ChatPath = (props) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    debugger;
    // const userId = useSelector((state) => state.users.users[Number(id)]._id);
    const userId = useSelector((state) => {
        const user = state.users.users?.[Number(id)];
        return user ? user._id : null;
    });
    debugger;

    useEffect(() => {
        debugger;
        dispatch(fetchUsers(Number(id)));
        debugger;
    }, [dispatch, id]);

    if (!userId) return <div>Loading...</div>;

    return <ChatBox userId={userId} handleSubscribe={props.handleSubscribe} />
}

export default ChatPath;