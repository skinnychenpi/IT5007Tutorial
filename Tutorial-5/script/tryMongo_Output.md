# The output of tryMongo.js:
`--- testWithAsync ---`

`(node:28238) [MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
Connected to MongoDB`

`Test: Create`

`Result of insert:
 6178c0b578b8ea6e4eb6df45`

`Result of find:
 [ { _id: 6178c0b578b8ea6e4eb6df45,
    serial: 1,
    name: 'Cristiano Ronaldo',
    phNum: 12345678,
    time: 2021-10-27T03:00:05.555Z } ]`

`Result of insert:
 6178c0b578b8ea6e4eb6df46`

`Result of find:
 [ { _id: 6178c0b578b8ea6e4eb6df46,
    serial: 2,
    name: 'Leo Messi',
    phNum: 23456789,
    time: 2021-10-27T03:00:05.555Z } ]`

`Test create complete.`

`Test: Read`

`Result of find:
 [ { _id: 6178c0b578b8ea6e4eb6df45,
    serial: 1,
    name: 'Cristiano Ronaldo',
    phNum: 12345678,
    time: 2021-10-27T03:00:05.555Z } ]`

`Result of find:
 [ { _id: 6178c0b578b8ea6e4eb6df46,
    serial: 2,
    name: 'Leo Messi',
    phNum: 23456789,
    time: 2021-10-27T03:00:05.555Z } ]`

`Test read complete.`

`Test: Update`

`Result of update:
 { n: 1, nModified: 1, ok: 1 }`

`Result of update:
 { n: 1, nModified: 1, ok: 1 }`

`After update:
 [ { _id: 6178c0b578b8ea6e4eb6df45,
    serial: 1,
    name: 'Cristiano Ronaldo',
    phNum: 12344321,
    time: 2021-10-27T03:00:05.555Z },
  { _id: 6178c0b578b8ea6e4eb6df46,
    serial: 2,
    name: 'Leo Messi',
    phNum: 23455432,
    time: 2021-10-27T03:00:05.555Z } ]`

`Test update complete.`

`Test: Delete`

`Result of delete:
 { n: 1, ok: 1 }`

`Result of delete:
 { n: 1, ok: 1 }`

`After delete:
 []`

`Test delete complete.`

`--- Test complete! ---`
