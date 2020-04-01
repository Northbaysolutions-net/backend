const express = require("express");
const router = express.Router();
const getConfigurations = require('../controllers/configurationController')


router.get('/categories', (req,res)=>{
getConfigurations(req,res)
})

module.exports=router;