const MongoClient = require("mongodb").MongoClient;

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

async function run() {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("usersdb");
        const collection = db.collection("users");
        const result = await collection.insertMany(users);
        console.log(result);
        console.log(users);
    } catch (err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    }
}
run().catch(console.error);