const { Op } = require("sequelize");
const sqs = require("sequelize-querystring");
const db = require("../models");
require("dotenv").config();


const allProducts = (req, res) => {
    return db.product
      .findAll({
        offset: (req.query.offset*10) || 0,
        limit: req.query.limit || 10,
        where: req.query.search
          ? {
              name: {
                [Op.like]: `${req.query.search}%`
              }
            }
          : {},
        order: req.query.sort ? sqs.sort(req.query.sort) : []
      })
      .then(results => {
       
        res.json({
          result: results
        });
      })
      .catch(err => {
        console.log(err);
        res.send(500).json({
          message: err
        });
      });
  };
  
  const filterProductId = async(req, res) => {
    let final1, final2 = [];
    var includeObj = {
      model: db.product_attribute,
      as: "parent",
      attributes: []
    };
    if (req.query.categoryFilter)
    {
      let categoryProducts= await db.product_category.findAll({
         where:{
           category_id:parseInt(req.query.categoryFilter)
           
         },
         attributes: ["product_id"]
  
      })
      flattenArray=JSON.parse(JSON.stringify(categoryProducts))
      final2=flattenArray.map((id)=>{
        return id.product_id
      })
    }
    if (req.query.filter[1]) {
      includeObj.where = {
        attribute_value_id: parseInt(req.query.filter[1])
      };
      if (req.query.filter[2]) {
        includeObj.include = {
          model: db.product_attribute,
          as: "parent",
          attributes: [],
          where: { attribute_value_id: parseInt(req.query.filter[2]) }
        };
      }
    }

    let whereArgument1={}
    if (req.query.filter[0])
    {
      whereArgument1.attribute_value_id=parseInt(req.query.filter[0])
    }
  
    return db.product_attribute
      .findAll({
        where: whereArgument1,
        include: includeObj,
  
        attributes: ["product_id"],
        
      })
      .then(async final => {
        flattenArray=JSON.parse(JSON.stringify(final))
       
        final1= flattenArray.map((id)=>{
          return id.product_id
        }
        
        )
        if (!req.query.categoryFilter)
        {
          final2=final1
        }



        let whereArgument = {
          [Op.and]: [{product_id:final1}, {product_id:final2}],
        };
        if (req.query.search) {
          whereArgument.name = {
            [Op.like]: `${req.query.search}%`
          };
        }
        return db.product.findAll({
          offset:  (req.query.offset*10) || 0,
          limit: req.query.limit || 10,
          where: whereArgument,
          order: req.query.sort ? sqs.sort(req.query.sort) : [],
          
        });
      })
      .then(result => {
        res.json({
          result: result
        })
      })
      .catch(err => {
        res.status(500).json({
          results: err
        });
      });
  };
  
  const getProductById= (req,res)=>{
    return db.product.findOne({
  
      where:{
        'product_id':parseInt(req.params.id)
      },
      include:{
        model:db.product_attribute,
        where:{
          'product_id':parseInt(req.params.id)
        },
        attributes:['attribute_value_id'],
        include:{
          model: db.attribute_value,
          attributes:['attribute_id', 'value'],
  
  
          include:{
            model:db.attribute,
            attributes:['name']
          }
        }
      },
  
    }).then((result)=>{
      res.json({
        result:result
      })
  
    })
  }

  module.exports={allProducts,filterProductId, getProductById}