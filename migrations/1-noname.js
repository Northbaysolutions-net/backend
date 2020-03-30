'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "attribute", deps: []
 * createTable "customer", deps: []
 * createTable "department", deps: []
 * createTable "product", deps: []
 * createTable "attribute_value", deps: [attribute]
 * createTable "category", deps: [department]
 * createTable "product_attribute", deps: [product, attribute_value]
 * createTable "product_category", deps: [product, category]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2020-03-13T15:09:05.229Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "attribute",
                {
                    "attribute_id": {
                        "type": Sequelize.INTEGER,
                        "field": "attribute_id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "customer",
                {
                    "customer_id": {
                        "type": Sequelize.INTEGER,
                        "field": "customer_id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name",
                        "allowNull": false
                    },
                    "email": {
                        "type": Sequelize.STRING,
                        "field": "email",
                        "unique": true,
                        "allowNull": false
                    },
                    "password": {
                        "type": Sequelize.STRING,
                        "field": "password",
                        "defaultValue": "",
                        "allowNull": false
                    },
                    "credit_card": {
                        "type": Sequelize.TEXT,
                        "field": "credit_card",
                        "allowNull": true
                    },
                    "address_1": {
                        "type": Sequelize.STRING,
                        "field": "address_1",
                        "defaultValue": "NULL",
                        "allowNull": true
                    },
                    "address_2": {
                        "type": Sequelize.STRING,
                        "field": "address_2",
                        "defaultValue": "NULL",
                        "allowNull": true
                    },
                    "city": {
                        "type": Sequelize.STRING,
                        "field": "city",
                        "defaultValue": "NULL",
                        "allowNull": true
                    },
                    "region": {
                        "type": Sequelize.STRING,
                        "field": "region",
                        "defaultValue": "NULL",
                        "allowNull": true
                    },
                    "postal_code": {
                        "type": Sequelize.STRING,
                        "field": "postal_code",
                        "defaultValue": "NULL",
                        "allowNull": true
                    },
                    "country": {
                        "type": Sequelize.STRING,
                        "field": "country",
                        "defaultValue": "NULL",
                        "allowNull": true
                    },
                    "shipping_region_id": {
                        "type": Sequelize.INTEGER,
                        "field": "shipping_region_id",
                        "defaultValue": "1",
                        "allowNull": false
                    },
                    "day_phone": {
                        "type": Sequelize.STRING,
                        "field": "day_phone",
                        "defaultValue": "NULL",
                        "allowNull": true
                    },
                    "eve_phone": {
                        "type": Sequelize.STRING,
                        "field": "eve_phone",
                        "defaultValue": "NULL",
                        "allowNull": true
                    },
                    "mob_phone": {
                        "type": Sequelize.STRING,
                        "field": "mob_phone",
                        "defaultValue": "NULL",
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "department",
                {
                    "department_id": {
                        "type": Sequelize.INTEGER,
                        "field": "department_id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name",
                        "allowNull": false
                    },
                    "description": {
                        "type": Sequelize.STRING,
                        "field": "description",
                        "defaultValue": "NULL",
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "product",
                {
                    "product_id": {
                        "type": Sequelize.INTEGER,
                        "field": "product_id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name",
                        "allowNull": false
                    },
                    "description": {
                        "type": Sequelize.STRING,
                        "field": "description",
                        "allowNull": false
                    },
                    "price": {
                        "type": Sequelize.DOUBLE,
                        "field": "price",
                        "allowNull": false
                    },
                    "discounted_price": {
                        "type": Sequelize.DOUBLE,
                        "field": "discounted_price",
                        "defaultValue": "0.00",
                        "allowNull": false
                    },
                    "image": {
                        "type": Sequelize.STRING,
                        "field": "image",
                        "defaultValue": "NULL",
                        "allowNull": true
                    },
                    "image_2": {
                        "type": Sequelize.STRING,
                        "field": "image_2",
                        "defaultValue": "NULL",
                        "allowNull": true
                    },
                    "thumbnail": {
                        "type": Sequelize.STRING,
                        "field": "thumbnail",
                        "defaultValue": "NULL",
                        "allowNull": true
                    },
                    "display": {
                        "type": Sequelize.INTEGER,
                        "field": "display",
                        "defaultValue": "0",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "attribute_value",
                {
                    "attribute_value_id": {
                        "type": Sequelize.INTEGER,
                        "field": "attribute_value_id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "attribute_id": {
                        "type": Sequelize.INTEGER,
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "references": {
                            "model": "attribute",
                            "key": "attribute_id"
                        },
                        "field": "attribute_id",
                        "allowNull": false
                    },
                    "value": {
                        "type": Sequelize.STRING,
                        "field": "value",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "category",
                {
                    "category_id": {
                        "type": Sequelize.INTEGER,
                        "field": "category_id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "department_id": {
                        "type": Sequelize.INTEGER,
                        "onUpdate": "CASCADE",
                        "onDelete": "NO ACTION",
                        "references": {
                            "model": "department",
                            "key": "department_id"
                        },
                        "field": "department_id",
                        "allowNull": false
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name",
                        "allowNull": false
                    },
                    "description": {
                        "type": Sequelize.STRING,
                        "field": "description",
                        "defaultValue": "NULL",
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "product_attribute",
                {
                    "product_id": {
                        "type": Sequelize.INTEGER,
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "references": {
                            "model": "product",
                            "key": "product_id"
                        },
                        "field": "product_id",
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "attribute_value_id": {
                        "type": Sequelize.INTEGER,
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "references": {
                            "model": "attribute_value",
                            "key": "attribute_value_id"
                        },
                        "field": "attribute_value_id",
                        "primaryKey": true,
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "product_category",
                {
                    "product_id": {
                        "type": Sequelize.INTEGER,
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "references": {
                            "model": "product",
                            "key": "product_id"
                        },
                        "field": "product_id",
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "category_id": {
                        "type": Sequelize.INTEGER,
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "references": {
                            "model": "category",
                            "key": "category_id"
                        },
                        "field": "category_id",
                        "primaryKey": true,
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["attribute", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["attribute_value", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["category", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["customer", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["department", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["product", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["product_attribute", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["product_category", {
                transaction: transaction
            }]
        }
    ];
};

module.exports = {
    pos: 0,
    useTransaction: true,
    execute: function(queryInterface, Sequelize, _commands)
    {
        var index = this.pos;
        function run(transaction) {
            const commands = _commands(transaction);
            return new Promise(function(resolve, reject) {
                function next() {
                    if (index < commands.length)
                    {
                        let command = commands[index];
                        console.log("[#"+index+"] execute: " + command.fn);
                        index++;
                        queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                    }
                    else
                        resolve();
                }
                next();
            });
        }
        if (this.useTransaction) {
            return queryInterface.sequelize.transaction(run);
        } else {
            return run(null);
        }
    },
    up: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, migrationCommands);
    },
    down: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, rollbackCommands);
    },
    info: info
};
