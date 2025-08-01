import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { UsersCollection } from "./../db.js";

// import dotenv from 'dotenv';

// dotenv.config();

export default async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Missing token" });
    }

    const token = authHeader.split(" ")[1];
    // console.log(token);
    // console.log("JWT_SECRET:", process.env.JWT_SECRET);

    try {
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const decoded = jwt.decode(token);
        // console.log(decoded);
        const userId = new ObjectId(decoded.userId);
        // console.log(userId);

        const user = await UsersCollection.findOne(
            { _id: userId }
        );

        // console.log(user);


        if (!user) return res.status(401).json({ message: "User not found" });
        // console.log(user);

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
}