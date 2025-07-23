import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { UsersCollection } from "./../db.js";

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const usersCollection = UsersCollection;

    try {
        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Пользователь уже существует' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await usersCollection.insertOne({ username, password: hashedPassword });

        res.status(201).json({ message: 'Пользователь зарегистрирован' });
    } catch (err) {
        console.error('Ошибка при регистрации:', err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const usersCollection = UsersCollection;

    try {
        const user = await usersCollection.findOne({username});
        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }

        // const isValid = await bcrypt.compare(password, user.password);
        // if (!isValid) {
        //     return res.status(401).json({ error: 'Неверный пароль' });
        // }

        if (user.password !== password) {
            return res.status(401).json({ error: 'Неверный пароль' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user });
    } catch (err) {
        console.error('Ошибка при входе:', err);
        res.status(500).json({ error: 'Ошибка сервера1' });
    }
});

/* // Регистрация
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = await User.create({ username, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Вход
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
}); */

export default router;