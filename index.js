var express = require("express");
var mysql = require('mysql');
var parser = require('body-parser');
var pg = require('pg');
var app = express();


app.use(parser.json());
app.use(parser.urlencoded({
  extended: true
}));



/**
 * Database connection
 * TODO: remove the db credentials
 * from here later on.
 */
var connection = mysql.createConnection({
  host: 'us-cdbr-iron-east-05.cleardb.net',
  user: 'bab6e201bd92f0',
  password: '208371fe',
  database: 'heroku_c25636dc46ee442',
  debug: "false"
});


function handle_database(req, res) {
  //  var query = "select * from test_users where name like '" + req.body.data.city + "%'";
  if (req.body.data.investor == '0') {
    var query = "select investors from transactions where city like '" + req.body.data.city + "%'";
  }
  else if(investor!='0' && city =='0'){
    var query = "select company from transactions where investors like '" + req.body.data.investor + "%'";
  }
//gfhfhgfhgfgxfgx
  connection.query(query, function(err, rows, fields) {
    if (err) {
      res.json({
        "code": 100,
        "status": "Error in connection database"
      });
      return;
    }
    var companies = "Following companies are in" + req.body.data.city + "::";
    rows.forEach(function(companyInfo) {
      companies = companies + "::" + companyInfo.name;
    });
    res.json({
      "code": 200,
      "status": rows
    });
  });

}


/**
 * This is the default 'get' method that gets
 * called when the heroku app gets loaded.
 * This can be used to see to if the app
 * is in running condition or not.
 */
app.get('/', function(req, res) {
  connection.query("select count(*) from transactions", function(err, rows, fields) {
    if (err) {
      console.log('error: ', err);
      throw err;
    }
    res.send(['Running test query, total rows of data available: ', rows]);
  });
});

app.post("/getTransactions", function(req, res) {
  handle_database(req, res);
});


app.post("/testPost", function(req, res) {
  res.send(['Got the following request from API.AI: ', req.body]);
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
