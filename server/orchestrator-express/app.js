const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const axios = require("axios")
const cors = require("cors")
const BASE_URL_PRODUCT= "INI LOCAL HOST YG MAU DI HIT"
const router = require("./routers")


app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(router)

/* app.get('/', async (req, res) => {
  try {
    const cacheData = await redis.get("news")
    if (cacheData) {
        const data = JSON.parse(cacheData)
        return res.status(200).json(data)
    }
    const {data} = await axios.get("ini url nya")
    await redis.set("news", json.stringify(data))
    res.status.jsonsend("data")
  } catch (err) {
    
  }
})

app.delete("news/:id", async (req, res) => {
    const {data} = await axios.delete("apa")

    await redis.del("products") // ini klo mau delete smua
    // klo delete 1-1 harus di kecualikan dulu terus pke res.set
    // deploynya
}) */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//axios, corsditaruh

//di reddis keys* utk ngelihat cachenya
// klo mau nyimpen katakuncinya SET namakeysnya "[apa datanya bisa {obj:value}]"
// klo mau fetchkey nya kasih GETkeynya,
//klo delete DEL namakeynya

// klo di ode pke npm i ioredis

