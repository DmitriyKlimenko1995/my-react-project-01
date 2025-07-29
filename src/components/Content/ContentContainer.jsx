import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Content from "./Content";
import { fetchUsers, setProfileData, fetchStatus, addStatus, updateNewStatusText, setStatus } from './../MyData/users-slice'

const ContentContainer = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    let newStatusElement = React.createRef();

    const status = useSelector((state) => state.users.ProfileStatus);
    const profile = useSelector((state) => state.users.ProfileData);
    const ProfileStatus = useSelector((state) => state.users.newStatusText);
    const loading = useSelector((state) => state.users.loading);
    const error = useSelector((state) => state.users.error);
    debugger;
    // const userProfile = users.find((u) => u.id === Number(id));

    useEffect(() => {
        debugger;
        dispatch(fetchUsers(Number(id)));
    }, [dispatch, id]);


    // const onStatusChange = (e) => {
    //     const text = e.target.value;
    //     dispatch(updateNewStatusText(text));
    // };





    /* debugger;
    if (id && users.length > 0) {
        debugger;
        const userProfile = users.find((u) => u.id === Number(id));
        debugger;
        if (userProfile) {
            debugger;
            dispatch(setProfileData(userProfile));
            debugger;
        }
        debugger;
    }
    debugger; */

    /* useEffect(() => {
        debugger;
        if (id && users.length > 0) {
            const userProfile = users.find((u) => u.id === Number(id));
            debugger;
            if (userProfile) {
                dispatch(setProfileData(userProfile));
                debugger;
            }
            debugger;
        }
        debugger;
    }, [id, users, dispatch]);
    debugger; */

    if (loading) return <div><NavLink to={`/profile/${id}`}>Загрузка...</NavLink></div>;
    if (error) return <div>Ошибка: {error}</div>;
    if (!profile) return <div>Профиль не найден</div>;

    return <Content profile={profile} userId={(Number(id) + 1)} />;
};

export default ContentContainer;