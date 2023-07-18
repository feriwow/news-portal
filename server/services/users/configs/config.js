const {MongoClient, ServerApiVersion} = require("mongodb")
const dataBase = "mongo-users-db";
// const uri = "mongodb://127.0.0.1:27017"
const uri = process.env.uri


const client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);
const database = client.db(dataBase);
const userDB = database.collection("Users");
let db

async function getDb(){
    return db
}

async function connect(){
    try {
        await client.connect()
        db = await client.db(dataBase)
        return db

    } catch (err) {
        console.log(err);
    }
}


module.exports = {connect, getDb}


