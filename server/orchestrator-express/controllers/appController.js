const redis = require("../configs/redis")
const axios = require("axios")
const BASE_URL_USER = "http://localhost:4002" 

class ControllerApp{

    static async fetchNews(req, res){
        try {
            const cacheData = await redis.get("news")
            if(cacheData){
                const data = JSON.parse(cacheData)
                return res.status(200).json(data)
            }
            const {data} = await axios.get(`${BASE_URL_USER}/admin/news`)
            await redis.set("news", JSON.stringify(data))
            res.status(200).json(data)
        } catch (err) {
            console.log(err);
        }
    }

    static async postNews(req, res){
        try {
            const {title, slug, content, imgUrl, categoryId, mongoDbId} = req.body
            await axios({
                method: "post",
                url: `${BASE_URL_USER}/admin/news`,
                data: {title, slug, content, imgUrl, categoryId, mongoDbId}
            })
            const cacheData = await redis.del("news")
            res.status(200).json(cacheData)
        } catch (err) {
         console.log(err);   
        }
    }

    static async newsDetail(req, res){
        try {
            const {id} = req.params
            const {data} = await axios.get(`${BASE_URL_USER}/news/${id}`)
            res.status(200).json(data)
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteNews(req, res){
        try {
            const {id} = req.params
            await axios({
                method:"delete",
                url: `${BASE_URL_USER}/news/${id}`
            })
            await redis.del("user")
            res.status(200).json({message: "delete success"})
        } catch (err) {
            console.log(err);
        }
    }

    static async updateNews(req, res){
        try {
            const {id} = req.params
            const {title, slug, content, imgUrl, categoryId, mongoDbId} = req.body
            await axios({
                method:"put",
                url: `${BASE_URL_USER}/admin/news/${id}`,
                data: {title, slug, content, imgUrl, categoryId, mongoDbId}
            })
            await redis.del("news")
        } catch (err) {
            
        }
    }
}

module.exports = ControllerApp