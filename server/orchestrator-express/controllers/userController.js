const { json } = require("express")
const redis = require("../configs/redis")
const axios = require("axios")
const BASE_URL_USER = "http://localhost:4001" 

class ControllerUser{
    static async fetchUser(req, res){
        try {
            const cacheData = await redis.get(`user`)
            if (cacheData) {
                const data = JSON.parse(cacheData)
                return res.status(200).json(data)
            } 
            const {data} = await axios.get(`${BASE_URL_USER}`)
            await redis.set("user", JSON.stringify(data))
            res.status(200).json(data)
        } catch (err) {
            console.log(err);
        }
    }

    static async postUser(req, res){
        try {
        const {username, email, password, role, phoneNumber, address} = req.body
        await axios({
            method: "post",
            url: `${BASE_URL_USER}/user`,
            data: {username, email, password, role, phoneNumber, address}
        })
        const cacheData = await redis.del("user")
        res.status(200).json(cacheData)
        
        } catch (err) {
            console.log(err);
        }
    }

    static async fetchUserById(req, res){
        try {
            const {id} = req.params
            console.log(id, "ini id");
            // const cacheData = await redis.get("newById")
            const {data} = await axios.get(`${BASE_URL_USER}/user/${id}`)
            console.log(data, "ini dari gabungan");
            res.status(200).json(data)

        } catch (err) {
            console.log(err);
        }
    }

    static async deleteById(req, res){
        try {
            const {id} = req.params
            await axios({
                method:"delete",
                url: `${BASE_URL_USER}/user/${id}`
            })
            await redis.del("user")
            res.status(200).json({message: "delete success"})
        } catch (err) {
            console.log(err);
        }
    }
}


// get product
// get detail

// const respone nya 2 kali yang kedua ngehit server satunya
// const response - await exios.get("apa url nya" + data.mongodbid)
// res.status(200).json({
//  ...data,
// username: response.data.username
// email: response.data.email
// })

// errornya ksh res.status 500 aja

module.exports = ControllerUser