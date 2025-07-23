import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ChatBox from "./ChatBox";
import { fetchUsers } from './../../MyData/users-slice';
import React, { useEffect } from "react";

const ChatPath = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    debugger;
    const userId = useSelector((state) => state.users.users[Number(id)]._id)
    debugger;

    useEffect(() => {
        debugger;
        dispatch(fetchUsers(Number(id)));
        debugger;
    }, [dispatch, id]);

    if (!userId) return <div>Loading...</div>;

    return <ChatBox userId={userId} />
}

export default ChatPath;