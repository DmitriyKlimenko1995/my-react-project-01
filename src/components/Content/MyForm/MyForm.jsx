import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import myformmodule from './MyForm.module.css';
import { updateNewFullNameText, updateNewIdText, updateNewCityText, updateNewCountryText, updateNewPhotoUrlText } from './../../MyData/users-slice';

const MyForm = () => {

    const userId = localStorage.getItem('userId');
    const token = useSelector((state) => state.auth.token);

    const dispatch = useDispatch();

    const users = useSelector((state) => state.users.users);
    const user = users.find((u) => u._id === userId);
    const userFormFields = useSelector((state) => state.users.userFormFields);

    useEffect(() => {
        if (user) {
            dispatch(updateNewFullNameText(user?.fullname));
            dispatch(updateNewIdText(user?.id));
            dispatch(updateNewCityText(user?.location?.city));
            dispatch(updateNewCountryText(user?.location?.country));
            dispatch(updateNewPhotoUrlText(user?.photoUrl));
        }
    }, [user, dispatch]);

    let onFullNameChange = (e) => {
        let text = e.target.value;
        dispatch(updateNewFullNameText(text));
    }

    let onIdChange = (e) => {
        let text = e.target.value;
        dispatch(updateNewIdText(Number(text)));
    }

    let onCityChange = (e) => {
        let text = e.target.value;
        dispatch(updateNewCityText(text));
    }

    let onCountryChange = (e) => {
        let text = e.target.value;
        dispatch(updateNewCountryText(text));
    }

    let onPhotoUrlChange = (e) => {
        let text = e.target.value;
        dispatch(updateNewPhotoUrlText(text));
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await fetch('http://localhost:5000/api/form-submit', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log('Ответ от сервера:', result);
        } catch (error) {
            console.error('Ошибка при отправке:', error);
        }
    };

    /*     return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('name', { required: 'Имя обязательно' })} placeholder="Имя" />
                {errors.name && <p>{errors.name.message}</p>}
    
                <input {...register('email', {
                    required: 'Email обязателен',
                    pattern: {
                        onChange: /^\S+@\S+$/i,
                        message: 'Неверный формат email'
                    }
                })} placeholder="Email" />
                {errors.email && <p>{errors.email.message}</p>}
    
                <button type="submit">Отправить</button>
            </form>
        ); */

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* <input {...register("username")} placeholder="Username" /> */}
            {/* <input {...register("password")} placeholder="Password" type="password" /> */}
            <input {...register("fullname")} placeholder="Fullname" onChange={onFullNameChange} value={userFormFields?.fullname} />
            <input type="number" {...register("id")} placeholder="User ID" onChange={onIdChange} value={userFormFields?.id} />
            <input {...register("location.city")} placeholder="City" onChange={onCityChange} value={userFormFields?.city} />
            <input {...register("location.country")} placeholder="Country" onChange={onCountryChange} value={userFormFields?.country} />
            <input {...register("photoUrl")} placeholder="Photo URL" onChange={onPhotoUrlChange} value={userFormFields?.photoUrl} />
            {/* <label>
                <input type="checkbox" {...register("followed")} />
                Followed
            </label> */}

            {/* <h4>Followers:</h4>
            {fields.map((field, index) => (
                <div key={field.id}>
                    <input
                        {...register(`followers.${index}.oid`)}
                        placeholder="Follower OID"
                    />
                    <button type="button" onClick={() => remove(index)}>
                        Remove
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={() => append({ oid: "" })}
            >
                Add Follower
            </button> */}

            <button type="submit">Submit</button>
        </form>
    );

};

export default MyForm;