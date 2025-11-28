const express = require("express")
const router= express.Router()
const propertyController= require('../controllers/propertyController')
const protect= require('../middleware/protect.js')



router.post("/properties", propertyController.filterProperties)   // find all the properties using filters 

router.post("/properties/interested", protect , propertyController.addInterest)   // add property to interested






module.exports=router

