# Guide to Execute Tutorial 5
Step1: move the the root folder of tutorial5 (./Tutorial-5)

Step2: type in `npm start` in the terminal on your Linux to start the project.

(I've written in the package.json file such that when executing `npm start`:

`script/initMongo.js`, `server/server.js` and the `react-scirpt start` will run.)

# Remark
## MongoDB port configuration
I've changed the configuration file such that my mongod server is running at port 27018, 
because there is another mongod server running at default port in another docker container.
Therefore, it's **very likely** that when testing **scirpt/initMongo.js**, **scirpt/tryMongo.js**, **server/server.js**, you will encounter connection problems.

The solution is to start mongod server use `sudo systemstl start mongod` first on your machine, and then go into these three files: 

**scirpt/initMongo.js**, **scirpt/tryMongo.js**, **server/server.js**

to change the url configuration at line 13(**scirpt/initMongo.js**), line 6(**scirpt/tryMongo.js**), line 11(**server/server.js**
) from port 27018 to your mongod server port(by default 27017).

## Server and UI port configuration
I've deployed my **graphQL server at port 5000/graphql**, my **express server at port 5000** and my **React UI at port 3000**.
