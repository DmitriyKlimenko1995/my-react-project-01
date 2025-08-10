import contentmodule from './Content.module.css'
import MyPostContainer from './MyPosts/MyPostContainer';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { useDispatch, useSelector } from "react-redux";
import usersmodule from './../Users/Users.module.css';
import userPhoto from './../../assets/images/avatar.png';
import UserStatus from "./ProfileStatus/UserStatus";
import { NavLink } from "react-router-dom";
import React, { useEffect } from "react";
import { updateProfilePhoto } from './../MyData/users-slice';



const Content = (props) => {
    /*  const users = useSelector((state) => state.users); */

    const dispatch = useDispatch();

    const profilePhoto = useSelector((state) => state.users.profilePhoto);
    const userId = props.userId;

    let onPhotoChange = (e) => {
        let text = e.target.value;
        dispatch(updateProfilePhoto(text));
    }

    useEffect(() => {
        fetch(`http://localhost:5000/api/save-photo/${userId}`)
            .then(res => res.json())
            .then(data => dispatch(updateProfilePhoto(data.photoUrl)))
            .catch(err => console.error("Ошибка загрузки статуса:", err));
    }, [userId]);

    /*     const handleUpdate = () => {
            fetch("http://localhost:5000/api/save-photo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, photoUrl: profilePhoto })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.updated) dispatch(updateProfilePhoto(profilePhoto));
                    dispatch(updateProfilePhoto(userPhoto));
                });
        }; */

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("photo", file);
        formData.append("userId", userId); // если нужно передать ID

        try {
            const response = await fetch("http://localhost:5000/api/save-photo", {
                method: "POST",
                headers: { "Content-Type": "multipart/form-data" },
                body: formData
            });

            const data = await response.json();
            if (data.photoUrl) {
                dispatch(updateProfilePhoto(data.photoUrl)); // или другой экшен
            }
        } catch (error) {
            console.error("Ошибка загрузки фото:", error);
        }
    };

    return (
        <div className={contentmodule.content}>
            {props.profile ? <div>
                <div>
                    <div>
                        <UserStatus userId={props.userId} />
                    </div>
                    <div>
                        <div>
                            <div className={usersmodule.item}>
                                {/* <img src={typeof props.profile.photoUrl === 'string' && props.profile.photoUrl.trim() !== "" ? props.profile.photoUrl : userPhoto} alt="avatarPhoto" /> */}
                                <img src={typeof profilePhoto === 'string' && profilePhoto.trim() !== "" ? profilePhoto : userPhoto} alt="avatarPhoto" />
                                {/* {props.userProfile && <input type={"file"} onChange={onPhotoChange} />} */}
                                {/* <button>Отправить</button> */}
                                <input type="file" accept="image/*" onChange={handlePhotoUpload} />
                            </div>
                        </div>
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
                </div>
                <ProfileInfo profile={props.profile} />
            </div> : <div>Profile not found</div>}
            <div><NavLink to={`/profile/${props.userId}`}><button >Редактировать профиль</button></NavLink></div>
            <MyPostContainer props={props} />
        </div>
    );
}

export default Content;