// db.js
import { MongoClient } from 'mongodb';

export const client = new MongoClient("mongodb://127.0.0.1:27017/");

try {
    if (!client.topology?.isConnected()) {
        await client.connect();
    }
    console.log("MongoDB connected");
} catch (error) {
    console.error("MongoDB connection error:", error);
    // Можно пробросить ошибку вверх или завершить процесс
}

export const db = client.db("usersdb");
export const UsersCollection = db.collection("users");
export const MessagesCollection = db.collection("messages");
export const postsCollection = db.collection("posts");