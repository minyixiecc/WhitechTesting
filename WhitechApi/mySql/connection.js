var mysql = require('mysql');

// mySql Database
var con = mysql.createConnection({
  host: "172.17.0.1",
  user: "root",
  password: "123",
  port: 3306
});

// Initial database and table
con.connect(function(err) {
  if (err) throw err;
  con.query("CREATE DATABASE IF NOT EXISTS testingDB", function (err, result) {
    if (err) throw err;
    console.log("Database created");

    con.changeUser({database : "testingDB"}, function(err) {
	    if (err) {
	      console.log('error in changing database', err);
	      return;
	    }
	    var sql = "CREATE TABLE IF NOT EXISTS products (id BIGINT, price FLOAT, name VARCHAR(255), description TEXT, imageUrl TEXT)";
	    con.query(sql, function (err, result) {
	      if (err) throw err;
	      console.log("Table created\n\n");
	    });
	});
  });
});

module.exports = con;