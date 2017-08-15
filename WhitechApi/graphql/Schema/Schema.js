var mySqlCon = require('../../mySql/connection');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  input FieldsInput {
    id: Int
    price: Float
    name: String
    description: String
    imageUrl: String
  }

  type Product {
    id: Int
    price: Float
    name: String
    description: String
    imageUrl: String
  }

  type Query {
    getProduct(id: ID!): Product
  }

  type Mutation {
    createProduct(input: FieldsInput): String
    updateProduct(id: ID!, input: FieldsInput): String
    deleteProduct(id: ID!): String
  }
`);

// Root router for query and mutation
var root = {
  getProduct: function ({id}) {
    return new Promise((resolve, reject) => {
      mySqlCon.query(getProductSql(id), (err, result) => {
        err ? reject('err') : resolve(result[0])
      });
    });
  },
  createProduct: function ({input}) {
    return new Promise((resolve, reject) => {
      mySqlCon.query(createProductSql(input), function (err, result) {
        err ? reject('Fail to create new product') : resolve('Created')
      });
    });
  },
  updateProduct: function ({id, input}) {
    return new Promise((resolve, reject) => {
      mySqlCon.query(updateProductSql(id, input), function (err, result) {
        err ? reject('Fail to update this product') : resolve('Updated')
      });
    });
  },
  deleteProduct: function ({id}) {
    return new Promise((resolve, reject) => {
      mySqlCon.query(deleteProductSql(id), function (err, result) {
        err ? reject('err') : (result.affectedRows==0 ? resolve('Product not exist') : resolve('Deleted'))
      });
    });
  },
};

module.exports = { schema, root };

// Private functions
generateUniqeID = function() {
    var d = new Date().getTime();
    var uuid = 'xx'.replace(/[xy]/g,function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : r);
    });
    return uuid.toLowerCase();
}

getProductSql = function(id){
  var sql = "SELECT * FROM products WHERE id = " + id;
  return sql;
}

createProductSql = function(input) {
  var id = input.id ? input.id : generateUniqeID();
  var values = "'" + id + "'";
  var column = "id";
  if(input.price){
    values = values + ", '" + input.price + "'";
    column = column + ", price";
  }
  if(input.name){
    values = values + ", '" + input.name + "'";
    column = column + ", name";
  }
  if(input.description){
    values = values + ", '" + input.description + "'";
    column = column + ", description";
  }
  if(input.imageUrl){
    values = values + ", '" + input.imageUrl + "'";
    column = column + ", imageUrl";
  }
  var sql = "INSERT INTO products (" + column + ") VALUES (" + values + ")";   
  return sql;
}

updateProductSql = function(id, input) {
  var settings = "";
  if(input.price){
    settings = settings + "price = " + input.price;
  }
  if(input.name){
    var pre = settings=="" ? "" : ", ";
    settings = settings + pre + "name = '" + input.name + "'";
  }
  if(input.description){
    var pre = settings=="" ? "" : ", ";
    settings = settings + pre + "description = '" + input.description + "'";
  }
  if(input.imageUrl){
    var pre = settings=="" ? "" : ", ";
    settings = settings + pre + "imageUrl = '" + input.imageUrl + "'";
  }
  var sql = "UPDATE products SET " + settings + " WHERE id = "+id;  
  return sql;
}

deleteProductSql = function(id){
  var sql = "DELETE FROM products WHERE id = "+id;
  return sql;
}
