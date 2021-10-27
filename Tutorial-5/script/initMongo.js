/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo issuetracker scripts/init.mongo.js 
 * */

const { MongoClient } = require('mongodb');

// I've changed the configuration file such that my mongod server is running at port 27018, 
// because there is another mongod server running at default port in another docker container.
// You also need to create california databases first using mongosh or mongo.
const url = 'mongodb://localhost:27018/california';

async function initDB() {
    console.log("--- Initialization starting! ---\n");
    const client = new MongoClient(url, { useNewUrlParser: true });
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('guest');
    collection.remove({});

    collection.createIndex({ serial: 1 }, { unique: true });
    collection.createIndex({ name: 1 });
    collection.createIndex({ phNum: 1 });
    collection.createIndex({ time: 1 });

    client.close();
    console.log('MongoDB closed');
    console.log("\n--- Initialization complete! ---");
}

initDB();


