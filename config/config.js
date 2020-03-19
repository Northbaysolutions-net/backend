require('dotenv').config();

const username = process.env.NAME;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const host = process.env.HOST;
const node_env = process.env.NODE_ENV;
const dialect = process.env.DIALECT;
const port = process.env.PORT;
const secret_key = process.env.SECRET;

const config = {
    dev:{
        dialect,
        port,
        username,
        password,
        database,
        host,
        secret_key
    },
    staging:{},
    prod:{}
};

module.exports = config[node_env];