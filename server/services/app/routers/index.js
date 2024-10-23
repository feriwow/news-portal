const express = require("express")
const router = express.Router()
const adminRouter = require("./admin")
const userRouter = require("./user")

router.use("/admin",adminRouter)
router.use("/user", userRouter)


module.exports = router