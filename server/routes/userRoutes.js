const express = require('express');
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://127.0.0.1:27017/";
const mongoClient = new MongoClient(url);

// Read
router.get('/users', async (req, res) => {
    try {
        await mongoClient.connect();
        const db = mongoClient("usersdb");
        const collection = db.collection("users");
        const results = await collection.find().toArray();
        res.send(results);
    } catch(err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    }
});