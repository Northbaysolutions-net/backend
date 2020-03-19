const { allProducts } = require('./productsController');
const {attributes,attribute_values} = require('../models');
const { allCategories } = require('./categoryController');
configurations = async () => {
    const products = await allProducts(1);
    const attr = await attributes.findAll();
    const attr_values = await attribute_values.findAll();
    const categories = await allCategories();
    return {
        "products": products,
        "attributes": attr,
        "attributes_values": attr_values,
        "categories": categories
    }
}

module.exports = { configurations }
