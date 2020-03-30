require('dotenv').config();

const username = process.env.USER_NAME;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const host = process.env.DB_LINK;
const node_env = process.env.NODE_ENV;

const config = {
    dev:{
        dialect: 'postgres',
        username,
        password,
        database,
        host,

        node_env: node_env,
        db:{
           username,
           password,
           database,
           host,
        },
    },
    staging:{},
    prod:{}
};

module.exports = config[node_env];
