const User = require("../models/user")

class Controller{
    static async makeUser(req, res){
        try {
            const {username, email, password, role, phoneNumber, address } = req.body
            const response = await User.createUser({username, email, password, role, phoneNumber, address })

            res.status(201).json(response)
        } catch (err) {
            console.log(err);
        }

    }
    static async getUser(req, res){
        try {
            const response = await User.fetchUser()

            res.status(200).json(response)
        } catch (err) {
            console.log(err);
        }

    }
   
    static async getUserById(req, res){
        try {
            const {id} = req.params
            const response = await User.findById(id)
            console.log(response, "oni dari mongo");
            res.status(200).json(response)
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    }

    static async deleteUserById(req, res){
        try {
            const {id} = req.params
            const deleted = await User.deleteById(id)
            if(!deleted){
                res.json("not found")
            }
            res.status(200).json({message: `successfully delete user with id ${id}`})
        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = Controller