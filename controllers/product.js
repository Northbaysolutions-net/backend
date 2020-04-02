var models = require("../models");
var db = require("../models/index");

exports.getProducts = async (req, res) => {
  let search = [];
  let categorySearch = [];
  let wordSearch = "";
  let order = "Asc";
  let pageNo = 0;

  if (req.query) {

     let {size, color, gender, category} = req.query;
    search = setQueryAttributes(size, search);
    search = setQueryAttributes(color, search);
    search = setQueryAttributes(gender, search);

    categorySearch = setQueryAttributes(category, categorySearch);

    if (req.query.search) wordSearch = "%" + req.query.search + "%";

    if (req.query.pageNo) pageNo = (req.query.pageNo - 1) * 10;

    if (req.query.order) order = req.query.order;
  }

  let productAttributeFiltered, productCatregoryFitered;
  let product_attributeCondition = "";
  let result = [];

  if (search.length > 0) {
    product_attributeCondition =
      "count(product_attribute.product_id) = " + search.length;
    productAttributeFiltered = await models.product_attribute.findAll({
      order: ["product_id"],
      where: { attribute_value_id: search },
      attributes: [
        "product_id",
        [
          db.sequelize.fn(
            "count",
            db.sequelize.col("product_attribute.product_id")
          ),
          "attributes"
        ]
      ],
      group: ["product_attribute.product_id"],
      having: db.Sequelize.literal(product_attributeCondition)
    });

    result = productAttributeFiltered.map(a => {
      return a.product_id;
    });

    if (result.length < 1)
      res.status(200).json(result);;
  }

  if (categorySearch.length > 0) {
    let where = {};
    where.category_id = categorySearch;

    if (result.length > 0) where.product_id = result;

    productCatregoryFitered = await models.product_category.findAll({
      order: ["product_id"],
      where: where,
      attributes: ["product_id"]
    });

    result = productCatregoryFitered.map(i => {
      return i.product_id;
    });

    if (result.length < 1)
    
      res.status(200).json(result);

  }

  let where = {};
  if (result.length > 0) where.product_id = result;
  if (wordSearch.length > 0)
    where.name = { [db.Sequelize.Op.iLike]: wordSearch };

  models.product
    .findAndCountAll({
      order: [
        ["price", order],
        ["name", "Asc"]
      ],
      offset: pageNo,
      limit: 10,
      attributes: ["product_id", "name", "price", "thumbnail"],
      where: where
    })
    .then(response => {
      response["total_pages"] = Math.floor(response.count/10)+1;
      let data = {
        products : response.rows,
        totalRecords : response.count ,
        totalPages : response.total_pages
      }
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(400).send(error);
    });
};

exports.getProductsbyId = async (req, res) => {
  const id = req.params.id;
  models.product
    .findAll({
   
      where: { product_id: id },
      include: [
        {
          model: models.product_category,
          include: [
            {
              model: models.category,
              attributes: [["name", "category"]],
              include: [
                {
                  model: models.department,
                  attributes: [["name", "department"]]
                }
              ]
            }
          ]
        },
        {
          model: models.product_attribute,
          attributes: ["attribute_value_id"],
          include: [
            {
              model: models.attribute_value,
              attributes: [["value", "attribute_value"]],
              include: [
                {
                  model: models.attribute,
                  attributes: [["name", "attribute"]],
                  required: false
                }
              ]
            }
          ]
        }
      ]
    })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

setQueryAttributes = (queryParam, array) => {
  if (queryParam) array.push(queryParam);
  return array;
};

