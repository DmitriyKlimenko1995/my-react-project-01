import React, { useEffect, useState } from 'react';

function SignupForm() {
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        // Глобальный callback, вызываемый Turnstile
        window.onTurnstileSuccess = (t) => {
            setToken(t);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, token })
        });
        const data = await res.json();
        setStatus(data.ok ? 'Успешно!' : 'Ошибка: ' + data.error);
    };

    return (
        <div>
            <div
                className="cf-turnstile"
                data-sitekey={process.env.TURNSTILE_SITE_KEY}
                data-callback="onTurnstileSuccess"
                data-theme="light"
            />
            <p>{status}</p>
        </div>
    );
}

export default SignupForm;