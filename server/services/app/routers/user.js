const express = require("express")
const router = express.Router()
const ControllerUser = require("../controllers/userControllers")

router.get("/", ControllerUser.getNews)
router.get("/detail/:id", ControllerUser.getNewsDetail)
router.get("/category", ControllerUser.getCategory)

module.exports = router