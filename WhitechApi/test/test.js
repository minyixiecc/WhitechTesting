var chai 	 = require('chai');
var chaiHttp = require('chai-http');
var should 	 = chai.should();
chai.use(chaiHttp);

var server   = require('../server.js');

// testing
describe("Operations", function(){
	// Creat testing product with id = 1, price =200, name = Sample product, description = No description, imageUrl = no url
	it("Create product", function(done){ 
	    chai.request(server)
	    	.post('/graphql?query=mutation{createProduct(input:{id:1, price:200,name:"Sample product",description:"No description",imageUrl:"no url"})}')
	    	.end((err, res) => {
	    		res.body.data.should.be.a('object');
	    		res.body.data.should.have.property('createProduct').eql('Created');
	    		done();
	        });
	});
	it("Query product", function(done){
	    chai.request(server)
	    	.post('/graphql?query={getProduct(id: 1){id,name}}')
	    	.end((err, res) => {
	    		res.body.should.be.a('object');
	    		res.body.data.should.have.property('getProduct');
	    		res.body.data.getProduct.should.have.property('id').eql(1);
	    		res.body.data.getProduct.should.have.property('name').eql('Sample product');
	    		done();
	        });
	});
	// Update testing product by setting price =500, name = Sample goods, description = description, imageUrl = link
	it("Update product", function(done){
		
	    chai.request(server)
	    	.post('/graphql?query=mutation{updateProduct(id: 1, input:{price:500,name:"Sample goods",description:"description",imageUrl:"link"})}')
	    	.end((err, res) => {
	    		res.body.data.should.be.a('object');
	    		res.body.data.should.have.property('updateProduct').eql('Updated');
	    		done();
	        });
	});
	// Delete testing product with id = 1
	it("Delete product", function(done){
	    chai.request(server)
	    	.post('/graphql?query=mutation{deleteProduct(id: 1)}')
	    	.end((err, res) => {
	    		res.body.data.should.be.a('object');
	    		res.body.data.should.have.property('deleteProduct').eql('Deleted');
	    		done();
	        });
	});
});