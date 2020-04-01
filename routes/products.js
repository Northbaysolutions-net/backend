const express = require("express");
const router = express.Router();
const {
  allProducts,
  filterProductId,
  getProductById
} = require("../controllers/productController");

router.get("/", (req, res) => {
  if (!req.query.filter) {
    req.query.filter = new Array();
  }
  if (req.query.filter)
    req.query.filter = req.query.filter.filter(filter => {
      if (filter !== "") {
        return filter;
      }
    });

  if (req.query.filter || req.query.categoryFilter) {
    filterProductId(req, res);
  } else {
    allProducts(req, res);
  }
});

router.get("/:id", (req, res) => {
  getProductById(req, res);
});

module.exports = router;
