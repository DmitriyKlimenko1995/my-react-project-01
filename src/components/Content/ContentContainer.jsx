import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Content from "./Content";
import { fetchUsers, setProfileData } from './../MyData/users-slice'

const ContentContainer = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const users = useSelector((state) => state.users.users);
    const profile = useSelector((state) => state.users.ProfileData);
    const loading = useSelector((state) => state.users.loading);
    const error = useSelector((state) => state.users.error);
    debugger;
    // const userProfile = users.find((u) => u.id === Number(id));

    useEffect(() => {
        debugger;
        dispatch(fetchUsers(Number(id)));
    }, [dispatch, id]);



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

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;
    if (!profile) return <div>Профиль не найден</div>;

    return <Content profile={profile} />;
};

export default ContentContainer;