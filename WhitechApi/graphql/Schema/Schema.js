const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  input FieldsInput {
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

module.exports = schema;

