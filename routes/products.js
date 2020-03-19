const express = require("express");
const router = express.Router();
const {allProducts,filterProductId, getProductById}=require('../controllers/productController')

router.get("/products", (req, res) => {
  if (req.query.filter1) {
    filterProductId(req, res);
  } else {
    allProducts(req, res);
  }
});

router.get('/products/:id', (req,res)=>{
  getProductById(req,res)
})

module.exports = router;
