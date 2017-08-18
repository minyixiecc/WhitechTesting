const config = require('../config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.mySql.database, config.mySql.username, config.mySql.password, {
	host: config.mySql.host,
  	dialect: 'mysql',
});

const Products = sequelize.define('products', {
	price: 		Sequelize.FLOAT,
    name: 		Sequelize.STRING,
    description:Sequelize.STRING,
    imageUrl: 	Sequelize.STRING
});

Products.sync({force: false}).then(function () {
  // Table created
  return true;
});

module.exports = { Products };