var express = require("express");
var mysql = require('mysql');
var parser = require('body-parser');
var pg = require('pg');
var app = express();
var querytype = "0";
var os = require('os');

app.use(parser.json());
app.use(parser.urlencoded({
  extended: true
}));



/**
 * Database connection
 * TODO: remove the db credentials
 * from here later on.fhgfhgfghfgfghh
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
  /*
  if (req.body.data.investor == '0' && req.body.data.city !='0' && req.body.data.company == '0' && req.body.data.finflag == '0') {
    var query = "select company from transactions where city like '" + req.body.data.city + "%'";
    querytype = '1';
  }
  if(req.body.data.investor!='0' && req.body.data.city =='0' && req.body.data.company == '0'){
    var query = "select distinct company from transactions where investors like '" + req.body.data.investor + "%'";
    querytype = '2';
  }
  if(req.body.data.investor == '0' && req.body.data.city=='0' && req.body.data.company != '0'){
    var query  = "select overview from transactions where company like '" + req.body.data.company + "%'";
    querytype = '3';
  }
    if(req.body.data.investor == '0' && req.body.data.city !='0' && req.body.data.company == '0' && req.body.data.finflag != "0") {
    var query = "select company from transactions where city like '" + req.body.data.city + "%'";
   // var query = "select company from transactions where description like '%data%' and city like '" + req.body.data.city + "%'";
    querytype = '4';
  }
*/ 
var query = "select total_funding from transactions where company like '" + req.body.data.company + "%'";

  connection.query(query,querytype, function(err, rows, fields) {
    if (err) {
      res.json({
        "code": 100,
        "status": "Error in connection database"
      });
      return;
    }
/*
    if(querytype == '1'){
      var output = "Showing list of companies in " + req.body.data.city + " :: "
      rows.forEach(function(rows) {
        output = output + "," + rows.company;
      });
    }
    if(querytype == '2'){
    var output = "Following companies are invested by " + req.body.data.investor + "::";
    rows.forEach(function(rows) {
      output = output + "," + rows.company;
    });
    }
    if(querytype == '3'){
      var output = JSON.stringify(rows[0].overview);
    }
    if(querytype == '4'){
      var output = "The Data Analytics companies in " + req.body.data.city + " :: ";
      rows.forEach(function(rows) {
        output = output + " | " + rows.company;
      });
    }
    */
    var output = "The funding for the company is  " + " :: ";
   var output = rows[0].total_funding;

    res.json({
      "code": 200,
      "status": output
    });
  });

}
//gfghhjvhvj2324232sbdjhfbsdjfbsdhdsdfsdsfdfssdfssdfsgdfgd

/**
 * This is the default 'get' method that gets
 * called when the heroku app gets loaded.
 * This can be used to see to if the app
 * is in running condition or not.
 */



app.post("/getTransactions", function(req, res) {
  handle_database(req, res);
});





var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
