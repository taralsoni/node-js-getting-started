var express = require("express");
var mysql = require('mysql');
var parser = require('body-parser');
var pg = require('pg');
var app = express();
app.use(parser.json());
app.use(parser.urlencoded({
  extended: true
}));


var connection = mysql.createConnection({
  host: 'us-cdbr-iron-east-05.cleardb.net',
  user: 'bab6e201bd92f0',
  password: '208371fe',
  database: 'heroku_c25636dc46ee442',
  debug: "true"
});


function handle_database(req, res) {
  //  var query = "select * from test_users where name like '" + req.body.data.city + "%'";
  if (req.body.data.investor == '0') {
    var query = "select investors from transactions where city like '" + req.body.data.city + "%'";
  }

  //else{
  //    var query = "select company from transactions where investors like '" + req.body.data.investor + "%'";
  //}
  //var query = "select year from transactions where name = ' + req.body.data.city + '";
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

  //    res.json({"code" : 200, "status" : "Success"});
  //    return;
  //
  //    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  //        client.query('SELECT * FROM transactions', function(err, result) {
  //        done();
  //      if (err)
  //          { console.error(err); response.send("Error " + err); }
  //      else
  //          { response.render('pages/getTransactions', {results: result.rows} ); }
  //      });
  //    });


  //    pool.getConnection(function(err,connection){
  //        if (err) {
  //          res.json({"code" : 100, "status" : "Error in connection database"});
  //          return;
  //        }
  //        console.log('connected as id ' + connection.threadId);
  //        console.log("Request" + req.body.data.city);
  //        var query = "select * test_users";
  //      // var query = "select * from transactions where city='" + req.body.data.city + "'";
  //        connection.query(query,function(err,rows){
  //            connection.release();
  //            if(!err) {
  //				res.json({"code" : 200, "data": rows});
  //				//res.json({"code" : 200, "status" : req.body.data.city});
  //			}
  //        });
  //        connection.on('error', function(err) {
  //              res.json({"code" : 100, "status" : "Error in connection database"});
  //              return;
  //        });
  //  });
}


app.get('/', function(request, response) {
  connection.query("select * from transactions where city = 'Mumbai'", function(err, rows, fields) {
    if (err) {
      console.log('error: ', err);
      throw err;
    }
    response.send(['Running test query: ', rows]);
  });
});

app.post("/getTransactions", function(req, res) {
  handle_database(req, res);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
