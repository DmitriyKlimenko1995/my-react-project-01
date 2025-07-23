import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../MyData/auth-slice';
import { useNavigate } from 'react-router-dom';

function LoginForm(props) {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const result = await dispatch(loginUser(formData));
        if (result.meta.requestStatus === 'fulfilled') {
            navigate(`/content/${0}`);
            props.handleSubscribe(prev => !prev); // Перенаправляем на страницу входа
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} /> Login
            <div></div>
            <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} /> Password
            <div></div>
            <button type="submit">Войти</button>
        </form>
    );
}

export default LoginForm;