const {MongoClient} = require("mongodb")

const uri = "mongodb://127.0.0.1:27017"

const client = new MongoClient(uri)



async function run(){
    try {
        

        const post = require("./news.json")

        const insert = await news.insertMany(post)

        console.log(insert);
    } catch (err) {
        console.log(err);
    }
}

run().catch(console.dir);


async function findAll(){
    try {
        const database = client.db("")
    } catch (err) {
        
    }
}