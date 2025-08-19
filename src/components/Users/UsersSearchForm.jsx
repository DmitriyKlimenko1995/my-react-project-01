import React from "react";
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { searchUsersThunk } from '../MyData/searchSlice';

const UsersSearchForm = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        dispatch(searchUsersThunk(data.query));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('query')} placeholder="Search users..." />
            <button type="submit">Search</button>
        </form>
    );
}


export default UsersSearchForm;