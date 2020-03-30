const express = require("express");
const router = express.Router();
const db = require('../models')

const getConfigurations = async(req,res)=>{
    const category=await db.category.findAll({
        attributes: ['category_id', 'name']
    })

    const attributes= await db.attribute.findAll({
        include:{
            model: db.attribute_value
        }
    })

    res.json ({
        category:category,
        attributes:attributes
    })


}


router.get('/categories', (req,res)=>{
getConfigurations(req,res)
})

module.exports=router;