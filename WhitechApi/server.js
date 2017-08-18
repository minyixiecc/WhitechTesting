const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const schema = require('./graphql/schema/schema');
const root = require('./graphql/root/root');

const graphqlHTTP = require('express-graphql');

// start the server
const port = process.env.PORT || 5000;
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