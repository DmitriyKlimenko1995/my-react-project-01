import React from "react";
import contentmodule from './Content.module.css'
import MyPostContainer from './MyPosts/MyPostContainer';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { useDispatch, useSelector } from "react-redux";
import usersmodule from './../Users/Users.module.css';
import userPhoto from './../../assets/images/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png';


const Content = (props) => {
   /*  const users = useSelector((state) => state.users); */
    debugger;

    return (
        <div className={contentmodule.content}>
            <div key={props.profile.id}>
                <div>
                    <div className={usersmodule.item}>
                        <img src={typeof props.profile.photoUrl === 'string' && props.profile.photoUrl.trim() !== "" ? props.profile.photoUrl : userPhoto} alt="avatarPhoto" />
                    </div>
                </div>
                {/* <img src={userPhoto} alt="avatarPhoto" /> */}
                <div>
                    <div>
                        <div>{props.profile.fullname}</div>
                        <div>{props.profile.status}</div>
                    </div>
                    <div>
                        <div>{props.profile.location.city}</div>
                        <div>{props.profile.location.country}</div>
                    </div>
                </div>

            </div>
            <ProfileInfo profile={props.profile} />
            <MyPostContainer />
        </div>
    );
}

export default Content;