const express = require("express")
const router = express.Router()
// const appRouter = require("./app")
const userRouter = require("./user")

// router.use("/admin",appRouter)
router.use("/user", userRouter)


module.exports = router