import express from "express";
import authMiddleware from "../middleware/auth.js";
import { MessagesCollection } from "./../db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// 📩 Отправка сообщения
router.post("/", authMiddleware, async (req, res) => {
    const { recipientId, text } = req.body;

    try {
        const messagesCollection = MessagesCollection;
        const message = {
            sender: req.user._id,            // ObjectId как строка
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
        console.log(userId);
        console.log(new ObjectId(req.user._id));


        const messages = await messagesCollection
            .find({
                $or: [
                    { sender: new ObjectId(req.user._id), recipient: new ObjectId(userId) },
                    { sender: new ObjectId(userId), recipient: new ObjectId(req.user._id) }
                ]
            })
            .sort({ timestamp: 1 })
            .toArray();
        console.log("messages must be here");
        console.log(messages);

        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch dialog" });
    }
});

export default router;