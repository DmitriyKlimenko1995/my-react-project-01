// routes/search.js
import express from "express";
import authMiddleware from "../middleware/auth.js";
import { UsersCollection } from "./../db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get('/', async (req, res) => {
    // const query = req.query.query?.trim();
    const { query, role } = req.query;
    if (!query) return res.status(400).json([]);

    try {
        const collection = UsersCollection;
        const users = await collection
            .find({ fullname: { $regex: query, $options: 'i' } })
            .limit(10)
            .toArray();

        res.json(users);
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json([]);
    }
});

export default router;