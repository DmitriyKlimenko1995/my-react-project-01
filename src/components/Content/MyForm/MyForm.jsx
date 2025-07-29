import React from 'react';
import { useForm } from 'react-hook-form';

const MyForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('/api/form-submit', {
                method: 'POST',
                headers: {
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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('name', { required: 'Имя обязательно' })} placeholder="Имя" />
            {errors.name && <p>{errors.name.message}</p>}

            <input {...register('email', {
                required: 'Email обязателен',
                pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Неверный формат email'
                }
            })} placeholder="Email" />
            {errors.email && <p>{errors.email.message}</p>}

            <button type="submit">Отправить</button>
        </form>
    );
};

export default MyForm;