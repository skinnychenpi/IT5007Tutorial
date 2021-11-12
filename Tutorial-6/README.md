# Guide to Execute Tutorial 6

## Remark
./president is apollo-client folder;
./api is the server folder, the server will run at port 5000.

## Steps to run the project:
**On server side:**

Step 1: You need to start the mongod server first.

Step 2: `cd /api`

`npm install`

`mongo issuetracker scripts/init.mongo.js`

`npm start`

Then the server will run at port 5000.

**On the client side:**

under ./president folder

Step 1: You need to change the IP adress of link in RNApp.js file to your machine IP adress

Step 2: Install necessary packages:
`npm install -g react-native-cli`

`npm install apollo-boost;`

`npm install react-apollo;`

`npm install graphql;`

`npm install graphql-tag;`

Step 3: Start the project
`npx react-native run-android`




