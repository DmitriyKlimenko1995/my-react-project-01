import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import http from 'http';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { WebSocketServer } from 'ws';
import { ObjectId } from 'mongodb';
import { MessagesCollection } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const PORT = process.env.PORT || 4000;


// MongoClient.connect(MONGO_URI).then(client => {
//     db = client.db('chat');
//     users = db.collection('users');
//     rooms = db.collection('rooms');
//     messages = db.collection('messages');
//     console.log('MongoDB connected');
// });

const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

const sockets = new Map(); // ws -> { userId, rooms: Set }

server.on('upgrade', async (req, socket, head) => {
    // const url = new URL(req.url, 'http://localhost');
    // const token = url.searchParams.get('token');

    const url = new URL(req.url, 'http://localhost');
    const token = url.searchParams.get('token');
    // const recipientId = url.searchParams.get('recipientId');

    if (!token) return socket.destroy();

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.userId = payload.userId;
        wss.handleUpgrade(req, socket, head, ws => {
            wss.emit('connection', ws, req);
        });
    } catch {
        socket.destroy();
    }
});

wss.on('connection', (ws, req) => {
    const userId = req.userId;
    sockets.set(ws, { userId, rooms: new Set() });

    ws.on('message', async msg => {
        let data;
        try {
            data = JSON.parse(msg);
        } catch {
            return;
        }

        const messagesCollection = MessagesCollection;

        const meta = sockets.get(ws);
        if (!meta) return;

        switch (data.type) {
            case 'JOIN': {
                const recipientId = data.roomId;
                // const meta = sockets.get(ws); // вот это важно
                // if (!meta) return;

                // console.log(recipientId);
                if (!ObjectId.isValid(recipientId)) {
                    ws.send(JSON.stringify({ type: 'ERROR', message: 'Invalid roomId format' }));
                    return;
                }
                // const room = await rooms.findOne({ _id: new ObjectId(roomId), members: userId });
                // const room = await rooms.findOneAndUpdate(
                //     { _id: new ObjectId(roomId) },
                //     { $addToSet: { members: new ObjectId(userId) } },
                //     { returnDocument: 'after' } // вернёт обновлённый документ
                // );
                // console.log(room);
                // if (!room) return;

                meta.rooms.add(recipientId);
                // const recent = await messages.find({ roomId }).sort({ createdAt: -1 }).limit(50).toArray();

                // console.log(userId);
                // console.log(recipientId);


                const messages = await messagesCollection
                    .find({
                        $or: [
                            { sender: userId, recipient: recipientId },
                            { sender: recipientId, recipient: userId }
                        ]
                    })
                    .sort({ timestamp: 1 })
                    .toArray();

                ws.send(JSON.stringify({ type: 'BACKFILL', messages: messages }));
                break;
            }
            case 'MESSAGE': {
                const { text } = data;
                const recipientId = data.roomId;
                // console.log(meta.rooms.has(roomId));
                // if (!meta.rooms.has(roomId)) return;

                // const message = {
                //     roomId,
                //     senderId: userId,
                //     text,
                //     createdAt: new Date()
                // };

                const message = {
                    sender: userId,            // ObjectId как строка
                    recipient: recipientId,
                    text,
                    timestamp: new Date()
                };

                // console.log(message);

                const result = await messagesCollection.insertOne(message);
                message._id = result.insertedId;

                console.log(result);

                for (const [peer, pMeta] of sockets.entries()) {
                    if (
                        pMeta.userId === userId ||
                        pMeta.userId === recipientId
                    ) {
                        peer.send(JSON.stringify({ type: 'MESSAGE', message }));
                    }
                }


                // ws.send(JSON.stringify({ type: 'MESSAGE', message }));

                break;
            }
        }
    });

    ws.on('close', () => {
        sockets.delete(ws);
    });
});

server.listen(PORT, () => console.log(`Server running on ${PORT}`));