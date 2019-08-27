'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const sqldb = require('../config').sqldb;
const db = {};

// connect mysql on Sequelize
var options = {
    host: sqldb.host,
    dialect: sqldb.db,
    port: _.isNil(sqldb.port) ? '3306' : sqldb.port,
    pool: {
        max: 5,
        min: 1,
        idle: 10000,
    }
};

if(!_.isNil(sqldb.dialectOptions)){
	options.dialectOptions = sqldb.dialectOptions;
}
if(!_.isNil(sqldb.timezone)){
	options.timezone = sqldb.timezone;
}

const sequelize = new Sequelize(sqldb.database, sqldb.username, sqldb.password, options);

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
