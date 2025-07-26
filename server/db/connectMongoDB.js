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


/* {
  "_id": {
    "$oid": "68753f67a2895059ea718dcf"
  },
  "id": 1,
  "photoUrl": "https://imgv3.fotor.com/images/blog-cover-image/a-shadow-of-a-boy-carrying-the-camera-with-red-sky-behind.jpg",
  "followed": true,
  "fullname": "Dmitriy",
  "status": "I can suck myself",
  "location": {
    "city": "Rovno",
    "country": "Ukraine"
  },
  "password": "admin1",
  "username": "admin1",
  "following": [
    {
      "$oid": "68754140572128a857977661"
    },
    {
      "$oid": "68754140572128a857977660"
    },
    {
      "$oid": "68754140572128a85797765e"
    },
    {
      "$oid": "68754140572128a857977664"
    }
  ],
  "followers": [
    {
      "$oid": "687befc32aabf6d2feb6761b"
    },
    {
      "$oid": "687befc32aabf6d2feb67620"
    },
    {
      "$oid": "687befc62aabf6d2feb67635"
    },
    {
      "$oid": "687befc62aabf6d2feb67638"
    },
    {
      "$oid": "68754140572128a85797765e"
    }
  ]
} */

/* {
  "_id": {
    "$oid": "687411088ba3a2782e718dc5"
  },
  "posts": [
    {
      "id": 1,
      "message": "Hi how are you?",
      "likesCount": 45
    },
    {
      "id": 1,
      "message": "Hi how are you?",
      "likesCount": 45
    }
  ]
} */