import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../MyData/auth-slice';
import { useNavigate } from 'react-router-dom';
import SignupForm from './SignupForm';
import Turnstile from 'react-turnstile';

function LoginForm(props) {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [captchaToken, setCaptchaToken] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!captchaToken) {
            alert('Подтвердите, что вы не робот');
            return;
        }

        const result = await dispatch(loginUser({ ...formData, token: captchaToken }));

        if (result.meta.requestStatus === 'fulfilled') {
            const userId = result.payload?.user?.id;
            navigate(`/content/${(userId - 1)}`);
            props.handleSubscribe(prev => !prev); // Перенаправляем на страницу входа
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} /> Login
            <div></div>
            <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} /> Password
            <div></div>
            <Turnstile
                sitekey="0x4AAAAAABrCazomW9bE6V71"
                onSuccess={(token) => setCaptchaToken(token)}
                onError={() => console.error('Captcha error')}
                onExpire={() => setCaptchaToken('')} // токен устарел

            />

            <button type="submit">Войти</button>
        </form>
    );
}

export default LoginForm;