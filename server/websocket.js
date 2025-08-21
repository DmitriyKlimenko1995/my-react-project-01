import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import http from 'http';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { WebSocketServer } from 'ws';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const PORT = process.env.PORT || 4000;

let db, users, rooms, messages;

MongoClient.connect(MONGO_URI).then(client => {
    db = client.db('chat');
    users = db.collection('users');
    rooms = db.collection('rooms');
    messages = db.collection('messages');
    console.log('MongoDB connected');
});

const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

const sockets = new Map(); // ws -> { userId, rooms: Set }

server.on('upgrade', async (req, socket, head) => {
    const url = new URL(req.url, 'http://localhost');
    const token = url.searchParams.get('token');
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

        const meta = sockets.get(ws);
        if (!meta) return;

        switch (data.type) {
            case 'JOIN': {
                const roomId = data.roomId;
                if (!ObjectId.isValid(roomId)) {
                    ws.send(JSON.stringify({ type: 'ERROR', message: 'Invalid roomId format' }));
                    return;
                }
                const room = await rooms.findOne({ _id: new ObjectId(roomId), members: userId });
                console.log(room);
                if (!room) return;

                meta.rooms.add(roomId);
                const recent = await messages.find({ roomId }).sort({ createdAt: -1 }).limit(50).toArray();
                ws.send(JSON.stringify({ type: 'BACKFILL', roomId, messages: recent.reverse() }));
                break;
            }
            case 'MESSAGE': {
                const { roomId, text } = data;
                // console.log(meta.rooms.has(roomId));
                if (!meta.rooms.has(roomId)) return;

                const message = {
                    roomId,
                    senderId: userId,
                    text,
                    createdAt: new Date()
                };
                await messages.insertOne(message);

                for (const [peer, pMeta] of sockets.entries()) {
                    if (pMeta.rooms.has(roomId)) {
                        peer.send(JSON.stringify({ type: 'MESSAGE', roomId, message }));
                    }
                }
                break;
            }
        }
    });

    ws.on('close', () => {
        sockets.delete(ws);
    });
});

server.listen(PORT, () => console.log(`Server running on ${PORT}`));