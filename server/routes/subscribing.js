import express from 'express';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { UsersCollection } from "./../db.js";

const router = express.Router();

// Подписка
router.post('/follow/:id', async (req, res) => {
    const userId = req.body.userId;
    const targetId = req.params.id;
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const userId = decoded.userId;

    if (userId === targetId) return res.status(400).json({ error: 'Нельзя подписаться на себя' });

    try {
        const users = UsersCollection;

        // Добавляем подписку
        await users.updateOne(
            { _id: new ObjectId(userId) },
            { $addToSet: { following: new ObjectId(targetId) } }
        );
        await users.updateOne(
            { _id: new ObjectId(targetId) },
            { $addToSet: { followers: new ObjectId(userId) } }
        );

        res.json({ message: 'Подписка оформлена' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Отписка
router.post('/unfollow/:id', async (req, res) => {
    const userId = req.body.userId;
    const targetId = req.params.id;
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const userId = decoded.userId;

    try {
        const users = UsersCollection;

        await users.updateOne(
            { _id: new ObjectId(userId) },
            { $pull: { following: new ObjectId(targetId) } }
        );
        await users.updateOne(
            { _id: new ObjectId(targetId) },
            { $pull: { followers: new ObjectId(userId) } }
        );

        res.json({ message: 'Вы отписались' });
    } catch (err) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

router.get('/is-following/:targetId', async (req, res) => {
    const { targetId } = req.params;
    const { userId } = req.query;
    const users = UsersCollection;

    const user = await users.findOne({ _id: new ObjectId(userId) });

    const isFollowing = user.following?.some(id => id.toString() === targetId);

    res.json({ following: isFollowing });
});

// router.get('/followup/:targetId', async (req, res) => {
//     const { userId } = req.query;
//     const { targetId } = req.params;

//     // Здесь логика добавления подписки
//     try {
//         const user = false;
//         if(req.app.locals.usersCollection.find({ _id:  }))


//         res.json({ user })
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Ошибка сервера' });
//     }
// });


/* router.get('/followup/:targetId', async (req, res) => {
    const { userId } = req.query;
    const { targetId } = req.params;

    if (!userId || !targetId) {
        return res.status(400).json({ error: 'Missing userId or targetId' });
    }

    try {
        const userObjectId = new ObjectId(userId);
        const targetObjectId = new ObjectId(targetId);

        const targetUser = await req.app.locals.usersCollection.findOne({
            _id: targetObjectId
        });

        if (!targetUser) {
            return res.status(404).json({ error: 'Target user not found' });
        }

        const isFollowing = targetUser.followers?.some(f => f.equals(userObjectId)) || false;

        console.log(isFollowing);

        res.json({ following: isFollowing });
    } catch (err) {
        console.error('Error checking follow status:', err);
        res.status(500).json({ error: 'Server error' });
    }
}); */

export default router;