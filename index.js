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
 * from here later on.fhgfhgfghfgfghhsdjfhsdjsdhfsjfsdfasdadasdfdfdky  sffs sdgdkfgsdssdf
 */
var connection = mysql.createConnection({
  host: 'us-cdbr-iron-east-05.cleardb.net',
  user: 'bab6e201bd92f0',
  password: '208371fe',
  database: 'heroku_c25636dc46ee442',
  debug: "false"
});


function handle_database(req, res) {
  if (req.body.data.investor == '' || req.body.data.city =='' || req.body.data.company == '' || req.body.data.finflag == '' || req.body.data.funding == ''){
var query = "select city from transactions";
var querytype = '0';
  }
  else if (req.body.data.investor == '0' && req.body.data.city =='0' && req.body.data.company == '0' && req.body.data.finflag == '0' && req.body.data.funding == '0'){ 
    var query = "select city from transactions";
    var querytype = '0';    
  }
  //  var query = "select * from test_users where name like '" + req.body.data.city + "%'";
  else if (req.body.data.investor == '0' && req.body.data.city !='0' && req.body.data.company == '0' && req.body.data.finflag == '0' && req.body.data.funding == '0') {
    var query = "select company from transactions where city like '" + req.body.data.city + "%'";
    querytype = '1';
  }
  else if(req.body.data.investor!='0' && req.body.data.city =='0' && req.body.data.company == '0' && req.body.data.finflag == '0' && req.body.data.funding == '0'){
    var query = "select distinct company from transactions where investors like '" + req.body.data.investor + "%'";
    querytype = '2';
  }
  else if(req.body.data.investor == '0' && req.body.data.city=='0' && req.body.data.company != '0' && req.body.data.finflag == '0' && req.body.data.funding == '0'){
  //  var query = "select total_funding from transactions where company like '" + req.body.data.company + "%'";
    var query  = "select overview from transactions where company like '" + req.body.data.company + "%'";
    querytype = '3';
  }
  else if(req.body.data.investor == '0' && req.body.data.city !='0' && req.body.data.company == '0' && req.body.data.finflag != "0" && req.body.data.funding == '0') {
   // var query = "select company from transactions where city like '" + req.body.data.city + "%'";
    var query = "select company from transactions where description like '%" + req.body.data.finflag + "%' and city like '" + req.body.data.city + "%'";
    querytype = '4';
  }
  else if(req.body.data.investor == '0' && req.body.data.city =='0' && req.body.data.company == '0' && req.body.data.finflag != "0" && req.body.data.funding == '0') {
    // var query = "select company from transactions where city like '" + req.body.data.city + "%'";
     var query = "select company from transactions where description like '%" + req.body.data.finflag + "%'";
     querytype = '4';
   }
  else if(req.body.data.investor == '0' && req.body.data.city =='0' && req.body.data.company != '0' && req.body.data.finflag == "0" && req.body.data.funding != '0') {
    // var query = "select company from transactions where city like '" + req.body.data.city + "%'";
     var query = "select total_funding from transactions where company like '" + req.body.data.company + "%'";
     querytype = '5';
   }


  connection.query(query,querytype, function(err, rows, fields) {
    if (err) {
      res.json({
        "code": 100,
        "status": "Error in connection database"
      });
      return;
    }
    if(querytype == '0'){
      var output = 'error in catching input';
    }
    if(querytype == '1')  {
      var output = "Showing list of companies in " + req.body.data.city + ": ";
      var index;
      for (index = 0; index < rows.length; ++index) {
        if (index == 0)
        output = output + rows[index].company;
        else if (index != rows.length - 1)
        output = output + ", " + rows[index].company;
        else 
        output = output + " and " + rows[index].company;
      }
      /*rows.forEach(function(rows) {
        output = output + ", " + rows.company;
      });*/
     //// output = output.replace(/\\n/g, '\\n');
    }
    if(querytype == '2'){
    var output = req.body.data.investor + " has invested in ";
    var index;
    for (index = 0; index < rows.length; ++index) {
      if (index == 0)
      output = output + rows[index].company;
      else if (index != rows.length - 1)
      output = output + ", " + rows[index].company;
      else 
      output = output + " and " + rows[index].company;
    }
    }
    if(querytype == '3'){
      var output = rows[0].overview;
    }
    if(querytype == '4'){
      var output = "The " + req.body.data.finflag + " related companies in " + req.body.data.city + " :: ";
      var index;
      for (index = 0; index < rows.length; ++index) {
        if (index == 0)
        output = output + rows[index].company;
        else if (index != rows.length - 1)
        output = output + ", " + rows[index].company;
        else 
        output = output + " and " + rows[index].company;
      }
    }
    if(querytype == '5'){
      var output = req.body.data.company + " has recieved a funding of " + rows[0].total_funding;
    }
    res.json({
      "code": 200,
      'headers': {
        "Content-Type": "application/json"
        },
      "status": "good",
      "body": {
        
        "speech": output,
        "displayText": output,
        "data": {},
        "contextOut": [],
        "source": "DuckDuckGo"
        
      }
    });
    /*
    //sdfsdfsdf
    res = {
      "code": 200,
      'headers': {
        "Content-Type": "application/json"
        },
      "status": "success",
      "body": {
        
        "speech": output,
        "displayText": output,
        "data": {},
        "contextOut": [],
        "source": "DuckDuckGo"
        
      }
    }; */
  });

}
//gfghhjvhvj2324232sbdjhfbsdjfbsdhdsdfsdsfdfssdfssdfs

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
