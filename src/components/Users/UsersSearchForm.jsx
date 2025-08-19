import React, { useEffect, useRef } from "react";
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { searchUsersThunk } from '../MyData/searchSlice';

const UsersSearchForm = () => {
    const { register, watch } = useForm();
    const dispatch = useDispatch();
    const debounceRef = useRef(null);

    // отслеживаем все поля
    const { query, role } = watch();

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            const filters = {
                ...(query?.trim() && { query: query.trim() }),
                ...(role?.trim() && { role: role.trim() }),
            };

            if (Object.keys(filters).length > 0) {
                dispatch(searchUsersThunk(filters));
            }
        }, 400);
    }, [query, role, dispatch]);

    // const onSubmit = (data) => {
    //     dispatch(searchUsersThunk(data.query));
    // };

    return (
        <form>
            <input {...register('query')} placeholder="Search users..." />
            <select {...register('role')}>
                <option value="follow">Друг</option>
                <option value="unfollow">Не друг</option>
            </select>
        </form>
    );
}


export default UsersSearchForm;