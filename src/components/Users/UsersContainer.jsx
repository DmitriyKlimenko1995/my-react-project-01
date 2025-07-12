import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, unFollow, setUsers } from "../MyData/users-slice";
import Users from "./Users";


let UsersContainer = () => {

    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
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
        }, [dispatch]);


    let followUp = (id) => {
        dispatch(follow(id));
    }

    let unFollowUp = (id) => {
        dispatch(unFollow(id));
    }

    

    return <Users userState={users} followUp={followUp} unFollowUp={unFollowUp} />;
}

export default UsersContainer;