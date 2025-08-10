import express from 'express';
const router = express.Router();
import multer from "multer";
const path = require("path");

const upload = multer({ dest: "uploads/" });

import { UsersCollection } from '../db.js'; // импорт своей коллекции

// GET статус пользователя
router.get("/:id", async (req, res) => {
    try {
        const userId = Number(req.params.id);
        console.log(userId);
        const user = await UsersCollection.findOne({ id: userId });
        res.json({ photoUrl: user?.photoUrl ?? "Не задан" });
    } catch (err) {
        console.error("Ошибка получения фото:", err);
        res.status(500).json({ error: "Не удалось получить фото" });
    }
});

// POST: обновить статус
/* router.post("/", async (req, res) => {
    const { photoUrl, userId } = req.body;
    if (!photoUrl || photoUrl.trim() === '') {
        return res.status(400).json({ error: 'Фото не должно быть пустым' });
    }
    try {
        const result = await UsersCollection.updateOne(
            { id: userId },
            { $set: { photoUrl: photoUrl } }
        );
        res.status(201).json({ updated: result.modifiedCount });
    } catch (err) {
        console.error("Ошибка обновления фото:", err);
        res.status(500).json({ error: "Не удалось обновить фото" });
    }
}); */

router.post("/", upload.single("photo"), async (req, res) => {
    const { userId } = req.body;
    const photoUrl = `/uploads/${req.file.filename}`;
    // Можно сохранить в БД, если нужно
    try {
        const result = await UsersCollection.updateOne(
            { id: userId },
            { $set: { photoUrl: photoUrl } }
        );
        res.json({ photoUrl });
        res.status(201).json({ updated: result.modifiedCount });
    } catch (err) {
        console.error("Ошибка обновления фото:", err);
        res.status(500).json({ error: "Не удалось обновить фото" });
    }
    res.json({ photoUrl });
});


export default router;