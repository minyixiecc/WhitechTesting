var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var schema = require('./graphql/Schema/Schema').schema;
var root = require('./graphql/Schema/Schema').root;

var graphqlHTTP = require('express-graphql');

// start the server
var port = process.env.PORT || 5000;
app.listen(port,()=> {console.log("Server is Running")})
app.get('/',(req,res)=>{
 res.sendFile(__dirname + '/index.html')
})

app.use('/graphql', graphqlHTTP (req => ({
	schema: schema,
	rootValue: root,
 	graphiql:true
})))

module.exports = app; // for testing