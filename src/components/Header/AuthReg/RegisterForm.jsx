import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../MyData/auth-slice';

function RegisterForm() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData));
    };
    debugger;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} /> New Login
                <div></div>
                <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} /> New Password
                <div></div>
                <button type="submit">Зарегистрироваться</button>
            </form>
            <div>{}</div>
        </div>
    );
}

export default RegisterForm;