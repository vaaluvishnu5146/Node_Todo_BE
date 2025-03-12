const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

module.exports = client;

// async function initiateDBConnection() {
//     try {
//         await client.connect();
//         // Get the database
//         const db = await client.db('managetasks');
//         const collection = await db.collection('users');
//         const users = await collection.find({}).toArray();
//         console.log(users)
//         client.close()
//     } catch (error) {
//         console.log("Error occured", error)
//     }
// }

// initiateDBConnection();