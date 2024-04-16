import * as mongoDB from 'mongodb';

const mongoUrl = process.env.MONGODB_URL;
const mongoDbName = process.env.MONGODB_DB_NAME;

let client: mongoDB.MongoClient;

if (mongoUrl !== undefined) {
    client = new mongoDB.MongoClient(mongoUrl);
}

async function connectToDatabase() {
    try {
        await client.connect();
        const db = client?.db(mongoDbName);
        return db;
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        await client?.close();
        throw err;
    }
}

export { connectToDatabase };
