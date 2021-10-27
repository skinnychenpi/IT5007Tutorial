const { MongoClient } = require('mongodb');

// I've changed the configuration file such that my mongod server is running at port 27018, 
// because there is another mongod server running at default port in another docker container.
// You also need to create california databases first using mongosh or mongo.
const url = 'mongodb://localhost:27018/california';
const guest1 = { serial: 1, name: 'Cristiano Ronaldo', phNum: 12345678, time: new Date()};
const guest2 = { serial: 2, name: 'Leo Messi', phNum: 23456789, time: new Date()};

async function testWithAsync() {
  console.log('\n--- testWithAsync ---');
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB');
  var result;
  var doc;
  
  try {
    console.log("\nTest: Create");
    const db = client.db();
    const collection = db.collection('guests');

    result = await collection.insertOne(guest1);
    console.log('Result of insert:\n', result.insertedId);
    doc = await collection.find({ _id: result.insertedId }).toArray();
    console.log('Result of find:\n', doc);

    result = await collection.insertOne(guest2);
    console.log('Result of insert:\n', result.insertedId);
    doc = await collection.find({ _id: result.insertedId }).toArray();
    console.log('Result of find:\n', doc);

  } catch(err) {
    console.log(err);
  } finally {
    console.log('Test create complete.');
  }

  try {
    console.log("\nTest: Read");
    const db = client.db();
    const collection = db.collection('guests');

    doc = await collection.find({serial: guest1.serial}).toArray();
    console.log('Result of find:\n', doc);

    doc = await collection.find({serial: guest2.serial }).toArray();
    console.log('Result of find:\n', doc);

  } catch(err) {
    console.log(err);
  } finally {
    console.log('Test read complete.');
  }

  try {
    console.log("\nTest: Update");
    const db = client.db();
    const collection = db.collection('guests');

    result = await collection.updateOne({serial: guest1.serial}, {$set: {phNum:12344321}});
    console.log('Result of update:\n', result.result);

    result = await collection.updateOne({serial: guest2.serial}, {$set: {phNum:23455432}});
    console.log('Result of update:\n', result.result);

    doc = await collection.find().toArray();
    console.log('After update:\n', doc);

  } catch(err) {
    console.log(err);
  } finally {
    console.log('Test update complete.');
  }

  try {
    console.log("\nTest: Delete");
    const db = client.db();
    const collection = db.collection('guests');

    result = await collection.deleteOne({serial: guest1.serial});
    console.log('Result of delete:\n', result.result);

    result = await collection.deleteOne({serial: guest2.serial});
    console.log('Result of delete:\n', result.result);

    doc = await collection.find().toArray();
    console.log('After delete:\n', doc);

  } catch(err) {
    console.log(err);
  } finally {
    console.log('Test delete complete.');
  }

  client.close();
  console.log("\n--- Test complete! ---");


}

testWithAsync();