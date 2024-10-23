const { ObjectId } = require("mongodb");
const { getDb } = require("../configs/config");
const dataBase = "mongo-users-db";
const userDB = "Users";

class User {
    static async createUser(post) {
        try {
            const db = await getDb();

            const insert = await db.collection(userDB).insertOne(post);

            return insert;
        } catch (err) {
            console.log(err);
        }
    }
    static async fetchUser() {
        try {
            const db = await getDb();

            const fetch = await db.collection(userDB).find().toArray();
            // console.log(fetch);

            return fetch;
        } catch (err) {
            console.log(err);
        }
    }
    static async findById(id) {
        try {
            const db = await getDb();

            const fetchById = await db.collection(userDB).findOne({
                _id: new ObjectId(id),
            });

            return fetchById;
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteById(id){
        try {
            const db = await getDb()

            const deleteUser = await db.collection(userDB).deleteOne({
                _id: new ObjectId(id)
            })

            return deleteUser
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = User;
