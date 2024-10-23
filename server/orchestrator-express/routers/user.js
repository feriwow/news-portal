const express = require("express")
const router = express.Router()
const ControllerUser = require("../controllers/userController")


router.get("/", ControllerUser.fetchUser)
router.post("/", ControllerUser.postUser)
router.get("/:id", ControllerUser.fetchUserById)
router.delete("/:id", ControllerUser.deleteById)

module.exports = router