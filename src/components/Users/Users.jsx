import React from "react";
import usersmodule from "./Users.module.css";



let Users = (props) => {


    /* if (props.userState.users.length < 21) {
        dispatch(setUsers([
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
    ]))
    } */

    return <div>
        {
            props.userState.users.map(u => <div key ={u.id}>
                <div>
                    <div className={usersmodule.item}>
                        <img src={u.photoUrl} alt="avatarPhoto" />
                    </div>
                    <div>
                        { u.followed ? (<button onClick={() => {props.unFollowUp(u.id)}}>UnFollow</button>) : (<button onClick={() => {props.followUp(u.id)}}>Follow</button>)}
                    </div>
                </div>
                <div>
                    <div>
                        <div>{u.fullname}</div>
                        <div>{u.status}</div>
                    </div>
                    <div>
                        <div>{u.location.city}</div>
                        <div>{u.location.country}</div>
                    </div>
                </div>
            </div>)
        }
    </div>
}

export default Users;