const express = require("express")
const router = express.Router()
const ControllerAdmin = require("../controllers/adminController")
const auth = require("../middleware/auth")

router.post("/register", ControllerAdmin.register)
router.post("/login", ControllerAdmin.login)
// router.use(auth)
router.get("/news", ControllerAdmin.getNews)
router.post("/news", ControllerAdmin.postNews)
router.get("/news/:id", ControllerAdmin.getNewsById)
router.get("/category", ControllerAdmin.getCategory)
router.post("/category", ControllerAdmin.postCategory)
router.delete("/news/:id", ControllerAdmin.deletePost)
router.put("/news/:id", ControllerAdmin.updatePost)
router.delete("/category/:id", ControllerAdmin.deleteCategory)
router.put("/category/:id", ControllerAdmin.updateCategory)
router.get("/category/:id", ControllerAdmin.categoryById)

module.exports = router