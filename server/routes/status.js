import express from 'express';
const router = express.Router();
import { UsersCollection } from './../db.js'; // импорт своей коллекции

// GET статус пользователя
router.get("/:id", async (req, res) => {
    try {
        const userId = Number(req.params.id);
        console.log(userId);
        const user = await UsersCollection.findOne({ id: userId });
        console.log(user);
        res.json({ status: user?.status ?? "Не задан" });
    } catch (err) {
        console.error("Ошибка получения статуса:", err);
        res.status(500).json({ error: "Не удалось получить статус" });
    }
});

// POST: обновить статус
router.post("/", async (req, res) => {
    const { statusText, userId } = req.body;
    if (!statusText || statusText.trim() === '') {
        return res.status(400).json({ error: 'Статус не должен быть пустым' });
    }
    try {
        const result = await UsersCollection.updateOne(
            { id: userId.toString() },
            { $set: { status: statusText } }
        );
        res.status(201).json({ updated: result.modifiedCount });
    } catch (err) {
        console.error("Ошибка обновления статуса:", err);
        res.status(500).json({ error: "Не удалось обновить статус" });
    }
});

export default router;