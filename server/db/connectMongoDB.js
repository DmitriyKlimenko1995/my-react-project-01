import { MongoClient } from 'mongodb';

const url = "mongodb://127.0.0.1:27017/";
const mongoClient = new MongoClient(url);

const users = [
    {
        "id": 11,
        "photoUrl": "",
        "followed": true,
        "fullname": "Dmitriy",
        "status": "I can suck myself",
        "location": {
            "city": "Rovno",
            "country": "Ukraine"
        }
    },
    {
        "id": 12,
        "photoUrl": null,
        "followed": true,
        "fullname": "Dmitriy",
        "status": "I can suck myself",
        "location": {
            "city": "Rovno",
            "country": "Ukraine"
        }
    },
    {
        "id": 13,
        "photoUrl": {

        },
        "followed": true,
        "fullname": "Dmitriy",
        "status": "I can suck myself",
        "location": {
            "city": "Rovno",
            "country": "Ukraine"
        }
    },
    {
        "id": 14,
        "photoUrl": {

        },
        "followed": true,
        "fullname": "Dmitriy",
        "status": "I can suck myself",
        "location": {
            "city": "Rovno",
            "country": "Ukraine"
        }
    },
    {
        "id": 5,
        "photoUrl": {

        },
        "followed": true,
        "fullname": "Dmitriy",
        "status": "I can suck myself",
        "location": {
            "city": "Rovno",
            "country": "Ukraine"
        }
    },
    {
        "id": 7,
        "photoUrl": {

        },
        "followed": true,
        "fullname": "Dmitriy",
        "status": "I can suck myself",
        "location": {
            "city": "Rovno",
            "country": "Ukraine"
        }
    },
    {
        "id": 8,
        "photoUrl": {

        },
        "followed": true,
        "fullname": "Dmitriy",
        "status": "I can suck myself",
        "location": {
            "city": "Rovno",
            "country": "Ukraine"
        }
    },
    {
        "id": 9,
        "photoUrl": {

        },
        "followed": true,
        "fullname": "Dmitriy",
        "status": "I can suck myself",
        "location": {
            "city": "Rovno",
            "country": "Ukraine"
        }
    },
    {
        "id": 10,
        "photoUrl": {

        },
        "followed": true,
        "fullname": "Dmitriy",
        "status": "I can suck myself",
        "location": {
            "city": "Rovno",
            "country": "Ukraine"
        }
    }
];

const profiles = [
    {
        "aboutMe": "dsbfgdbf",
        "contacts": {
            "facebook": "facebook.com",
            "website": "website",
            "vk": "vk.com",
            "twitter": "twitter.com",
            "youtube": null
        },
        "lookingForAJob": true,
        "fullName": "wake up samurai",
        "userId": 1,
        "photos": {
            "small": "",
            "large": ""
        }
    },
    {
        "aboutMe": "dsbfgdbf",
        "contacts": {
            "facebook": "facebook.com",
            "website": "website",
            "vk": "vk.com",
            "twitter": "twitter.com",
            "youtube": null
        },
        "lookingForAJob": true,
        "fullName": "wake up samurai",
        "userId": 1,
        "photos": {
            "small": "",
            "large": ""
        }
    }
];

// const arr =[];

// for (let i = 1; i <= 10; i++) {
//     arr.push({id: i, data: {username: `admin${i}`, password: `admin${i}`}});
// }
async function run() {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("usersdb");
        const collection = db.collection("messages");
        const message = {
            sender: '68753f67a2895059ea718dcf',            // ObjectId как строка
            recipient: '68754140572128a85797765e',
            text: 'sszgbfdbxf',
            timestamp: new Date()
        };

        const result = await collection.insertOne(message);
        // for (const item of arr) {
        //     const result = await collection.updateOne(
        //         { id: item.id },
        //         { $set: item.data }
        //     );
        // }
        // console.log(result);
        console.log(message);
    } catch (err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    }
}
run().catch(console.error);