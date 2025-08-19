import express from "express";
import authMiddleware from "../middleware/auth.js";
import { MessagesCollection } from "./../db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// 📩 Отправка сообщения
router.post("/", authMiddleware, async (req, res) => {
    const { recipientId, text } = req.body;

    try {
        // console.log(req.user._id.toString());
        // console.log(recipientId);
        const messagesCollection = MessagesCollection;
        const message = {
            sender: req.user._id.toString(),            // ObjectId как строка
            recipient: recipientId,
            text,
            timestamp: new Date()
        };

        const result = await messagesCollection.insertOne(message);
        res.status(201).json({ _id: result.insertedId, ...message });
    } catch (err) {
        res.status(500).json({ error: "Failed to send message" });
    }
});

// 📥 Получить диалог
router.get("/:userId", authMiddleware, async (req, res) => {
    try {
        const messagesCollection = MessagesCollection;
        // console.log(messagesCollection.find());
        const userId = req.params.userId;
        // console.log(userId);
        // console.log(req.user._id.toString());


        const messages = await messagesCollection
            .find({
                $or: [
                    { sender: req.user._id.toString(), recipient: userId },
                    { sender: userId, recipient: req.user._id.toString() }
                ]
            })
            .sort({ timestamp: 1 })
            .toArray();
        // console.log("messages must be here");
        // console.log(messages);

        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch dialog" });
    }
});

export default router;