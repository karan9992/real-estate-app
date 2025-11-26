const express = require("express")
const router= express.Router()
const userController= require('../controllers/userController')
const protect= require('../middleware/protect.js')


router.post("/register", userController.createUser)

router.post("/login",userController.login)

router.post("/logout",userController.logout)

router.get('/verify', protect, userController.verify)






module.exports=router

