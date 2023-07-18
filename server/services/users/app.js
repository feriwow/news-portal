const express = require('express')
const app = express()
const port = process.env.PORT || 4001
const {connect} = require("./configs/config")
const Controller = require("./controllers/controller")

app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.get('/', Controller.getUser)
app.post("/user", Controller.makeUser)
app.get("/user/:id", Controller.getUserById)
app.delete("/user/:id", Controller.deleteUserById)


connect().then(
    () => {
        app.listen(port, () => {
          console.log(`kamu ada di ${port}`)
        })
    }
)