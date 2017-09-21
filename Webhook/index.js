'use strict';
const https = require('https');
var request = require('request');
//hi just understanding push pull
//new comment line added to redeploy on heroku kjsdfhksjfsdjhsfgjdhjhsfbs
exports.transactionFn = (req, res) => {
  let date = '';
  var city = "0";
  var company = "0";
  var investor = "0";
  var finflag = "0";

  if (req.body.result.parameters['domain']) {
    finflag = req.body.result.parameters['domain'];
  }

  if (req.body.result.parameters['cityName']) {
    city = req.body.result.parameters['cityName'];
    console.log('City: ' + city);
  }

  if (req.body.result.parameters['companyName']) {
    company = req.body.result.parameters['companyName'];
    
  }
  if (req.body.result.parameters['investorName']) { 
    investor = req.body.result.parameters['investorName'];
  }
   

  callTransactionApi(city, investor, company, finflag).then((output) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ 'speech': JSON.stringify(output), 'displayText': JSON.stringify(output) }));
  }).catch((error) => {
    // If there is an error let the user knowdfsfsdf
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ 'speech': error, 'displayText': error }));
    console.log(" Error in callback " + error);
  });
};


function callTransactionApi (city, investor, company, finflag) {
  return new Promise((resolve, reject) => {
        var data = {
          "data":{
              "city": city,
              "investor": investor,
              "company": company,
              "finflag": finflag
          }
        };

        request({
            url: "https://sarveshnewapp.herokuapp.com/getTransactions",
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            json: data
        }, function(error, response, body) {
          if (error){
            console.log("inside error");
            reject(error);
          } else {
            console.log("inside response");      
            var output = response.body.status;
            resolve(output);
          }
        });
  });
}
