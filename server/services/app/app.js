const express = require("express")
const app = express()
var cors = require('cors')
const router = require("./routers")
const errorHandler = require("./middleware/errorHandler")
const port = process.env.PORT || 4002

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(router)

app.use(errorHandler)
app.listen(port, () =>{
    console.log(`kamu ada di ${port}`);
})

module.exports = app