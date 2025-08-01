import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import authMiddleware from "./middleware/auth.js";
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import status from './routes/status.js';
import subScribe from './routes/subscribing.js';
import messages from './routes/messages.js';
import mongoose from 'mongoose';
import { UsersCollection, MessagesCollection, postsCollection, client } from "./db.js";
const PORT = 5000;

// import { MongoClient } from 'mongodb';

// const url = "mongodb://127.0.0.1:27017/";
// const mongoClient = new MongoClient(url);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());

(async () => {
  try {
    // await mongoClient.connect();
    // const db = mongoClient.db("usersdb");

    // app.locals.usersCollection = db.collection("users");
    // app.locals.postsCollection = db.collection("posts");
    // app.locals.messagesCollection = db.collection("messages");



    console.log("Инициализация сервера...");
    app.listen(PORT, () => {
      console.log(`Сервер запущен: http://localhost:${PORT}`);
    });
    console.log("server is waiting connected");
  } catch (err) {
    return console.log(err);
  }
})();

app.get('/api/users', async (req, res) => {
  try {
    const collection = UsersCollection;

    // Получаем параметры запроса
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // Получаем пользователей с пагинацией
    const users = await collection
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray();

    // Общее количество документов
    const totalUsers = await collection.countDocuments();

    // Вычисляем общее число страниц
    const totalPages = Math.ceil(totalUsers / limit);

    res.json({
      users,
      pageInfo: {
        currentPage: page,
        totalUsers,
        totalPages,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        nextPage: page < totalPages ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null
      }
    });
  } catch (err) {
    console.error("Ошибка при пагинации пользователей:", err);
    res.status(500).json({ error: "Не удалось получить пользователей" });
  }
});

// Маршрут для обработки формы
app.post('/api/form-submit', authMiddleware, async (req, res) => {
  const data = req.body;

  // Базовая валидация на сервере
  /* if (!name || !email) {
    return res.status(400).json({ error: 'Имя и Email обязательны' });
  } */

  // Здесь можно добавить сохранение в БД или логику
  const userId = req.user._id;
  const collection = UsersCollection;

  const result = await collection.updateOne(
    { _id: userId },
    { $set: data }
  );

  return res.json({
    message: 'Форма успешно получена',
    data: data
  });
});

/* app.get('/api/users', async (req, res) => {
  try {
    const users = await req.app.locals.usersCollection.find({}).toArray();
    res.send(users[0].users);
  } catch (err) {
    console.error("Ошибка получения пользователей:", err);
    res.status(500).send({ error: "Не удалось получить пользователей" });

  }
}); */

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await postsCollection.find({}).toArray();
    res.send(posts);
  } catch (err) {
    console.error("Ошибка получения постов:", err);
    res.status(500).send({ error: "Не удалось получить посты" });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/sub', subScribe);
app.use('/api/messages', messages);
app.use('/api/status', status);

/* mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Server running')))
  .catch(err => console.error(err)); */


// process.on("SIGINT", async () => {
//   await client.close();
//   // await mongoose.disconnect();
//   console.log("Приложение BDmongo завершило работу");
//   process.exit();
// });



/* const gracefulExit = (signal) => {
  console.log(`Получен сигнал: ${signal}`);
  mongoClient.close().then(() => {
    console.log("MongoDB соединение закрыто");
    process.exit(0);
  });
};

['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(sig => {
  process.on(sig, () => gracefulExit(sig));
}); */

/* ---------------------------------- */


/* app.get('/api/users', (req, res) => {
  res.json({ 
    users: [
            {id: 1, photoUrl: 'https://imgv3.fotor.com/images/blog-cover-image/a-shadow-of-a-boy-carrying-the-camera-with-red-sky-behind.jpg', followed: true, fullname: 'Dmitriy', status: 'I can suck myself', location: {city: 'Rovno', country: 'Ukraine'}},
            {id: 2, photoUrl: "", followed: true, fullname: 'Dmitriy', status: 'I can suck myself', location: {city: 'Rovno', country: 'Ukraine'}},
            {id: 3, photoUrl: undefined, followed: true, fullname: 'Dmitriy', status: 'I can suck myself', location: {city: 'Rovno', country: 'Ukraine'}},
            {id: 4, photoUrl: {}, followed: true, fullname: 'Dmitriy', status: 'I can suck myself', location: {city: 'Rovno', country: 'Ukraine'}},
            {id: 6, photoUrl: {}, followed: true, fullname: 'Dmitriy', status: 'I can suck myself', location: {city: 'Rovno', country: 'Ukraine'}},
            {id: 5, photoUrl: {}, followed: true, fullname: 'Dmitriy', status: 'I can suck myself', location: {city: 'Rovno', country: 'Ukraine'}},
            {id: 7, photoUrl: {}, followed: true, fullname: 'Dmitriy', status: 'I can suck myself', location: {city: 'Rovno', country: 'Ukraine'}},
            {id: 8, photoUrl: {}, followed: true, fullname: 'Dmitriy', status: 'I can suck myself', location: {city: 'Rovno', country: 'Ukraine'}},
            {id: 9, photoUrl: {}, followed: true, fullname: 'Dmitriy', status: 'I can suck myself', location: {city: 'Rovno', country: 'Ukraine'}},
            {id: 10, photoUrl: {}, followed: true, fullname: 'Dmitriy', status: 'I can suck myself', location: {city: 'Rovno', country: 'Ukraine'}}
    ]
  });
}); */

/* app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
}); */