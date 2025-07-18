import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, unFollow, setUsers, setUsersCount, setUsersCurrentPage, setUsersTotalPages, toggleIsFetching } from "../MyData/users-slice";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";


let UsersContainer = () => {

    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();

    /* const loadUsers = () => {
        fetch('http://localhost:5000/api/users')
            .then(res => res.json())
            .then(data => {
                const mockUsers = data;
                dispatch(setUsers(mockUsers.users));
            })
            .catch(err => console.error('Ошибка при загрузке пользователей:', err));
    };

    loadUsers(); */

    useEffect(() => {
        const fetchUsers = async () => {
            dispatch(toggleIsFetching(true));

            try {
                const res = await fetch(`http://localhost:5000/api/users?page=${users.currentPage}&limit=${users.pageSize}`);
                const data = await res.json();

                dispatch(setUsers(data.users));
                dispatch(setUsersCount(data.pageInfo.totalUsers));
                dispatch(setUsersTotalPages(data.pageInfo.totalPages));
            } catch (error) {
                console.error("Ошибка при загрузке пользователей:", error);
            } finally {
                debugger;
                dispatch(toggleIsFetching(false));
            }
        };

        fetchUsers();
    }, [dispatch, users.currentPage, users.pageSize]);



    /*  useEffect(() => {
         dispatch(toggleIsFetching());
         fetch(`http://localhost:5000/api/users?page=${users.currentPage}&limit=${users.pageSize}`)
             .then(res => res.json())
             .then(data => {
                 const mockUsers = data;
                 dispatch(setUsers(mockUsers.users));
                 dispatch(setUsersCount(mockUsers.pageInfo.totalUsers));
                 dispatch(setUsersTotalPages(mockUsers.pageInfo.totalPages));
                 dispatch(toggleIsFetching());
             });
     }, [dispatch, users.currentPage, users.pageSize]); */

    /* useEffect(() => {
        dispatch(toggleIsFetching());
    }, []) */

    /* axios.get("https://social-network.samuraijs.com/users").then(response => {
        useEffect(() => {
            const mockUsers = response.data.items;

            dispatch(setUsers(mockUsers));
        }, [dispatch]);
    }); */

    /* useEffect(() => {
        const mockUsers = [
            {id: 1, photoUrl: 'https://imgv3.fotor.com/images/blog-cover-image/a-shadow-of-a-boy-carrying-the-camera-with-red-sky-behind.jpg', followed: true, fullname: 'Dmitriy', status: 'I can suck myself', location: {city: 'Rovno', country: 'Ukraine'}},
            {id: 2, photoUrl: {}, followed: true, fullname: 'Dmitriy', status: 'I can suck myself', location: {city: 'Rovno', country: 'Ukraine'}},
            {id: 3, photoUrl: {}, followed: true, fullname: 'Dmitriy', status: 'I can suck myself', location: {city: 'Rovno', country: 'Ukraine'}},
            {id: 4, photoUrl: {}, followed: true, fullname: 'Dmitriy', status: 'I can suck myself', location: {city: 'Rovno', country: 'Ukraine'}},
            {id: 6, photoUrl: {}, followed: true, fullname: 'Dmitriy', status: 'I can suck myself', location: {city: 'Rovno', country: 'Ukraine'}},
            {id: 5, photoUrl: {}, followed: true, fullname: 'Dmitriy', status: 'I can suck myself', location: {city: 'Rovno', country: 'Ukraine'}},
            {id: 7, photoUrl: {}, followed: true, fullname: 'Dmitriy', status: 'I can suck myself', location: {city: 'Rovno', country: 'Ukraine'}},
            {id: 8, photoUrl: {}, followed: true, fullname: 'Dmitriy', status: 'I can suck myself', location: {city: 'Rovno', country: 'Ukraine'}},
            {id: 9, photoUrl: {}, followed: true, fullname: 'Dmitriy', status: 'I can suck myself', location: {city: 'Rovno', country: 'Ukraine'}},
            {id: 10, photoUrl: {}, followed: true, fullname: 'Dmitriy', status: 'I can suck myself', location: {city: 'Rovno', country: 'Ukraine'}}
        ];

        dispatch(setUsers(mockUsers));
        }, [dispatch]); */


    let followUp = (id) => {
        dispatch(follow(id));
    }

    let unFollowUp = (id) => {
        dispatch(unFollow(id));
    }

    let setUsersCurrentPageUp = (currentPage) => {
        dispatch(setUsersCurrentPage(currentPage));
    }

    return <>
        <Preloader userState={users} />
        {/* <button onClick={() => {dispatch(toggleIsFetching())}}>fetching</button> */}
        <Users userState={users} followUp={followUp} unFollowUp={unFollowUp} setUsersCurrentPageUp={setUsersCurrentPageUp} />
    </>
}

export default UsersContainer;