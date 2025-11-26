const express = require("express")
const router= express.Router()
const propertyController= require('../controllers/propertyController')
const protect= require('../middleware/protect.js')


router.post("/add", protect ,propertyController.addProperty)

router.get("/properties/:id", protect  ,propertyController.viewProperties)

router.get("/interested/:id", protect ,propertyController.viewInterested)

router.delete("/properties/:id", protect ,propertyController.deleteProperty)

router.put("/properties/:id", protect ,propertyController.editProperty)








module.exports=router

