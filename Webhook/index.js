'use strict';
const https = require('https');
var request = require('request');

exports.transactionFn = (req, res) => {
  let date = '';
  let city = "";
  let company = "";

  if (req.body.result.parameters['cityName']) {
    city = req.body.result.parameters['cityName'];
    console.log('City: ' + city);
  }
  if (req.body.result.parameters['companyName']) {
    company = req.body.result.parameters['companyName'];
    console.log('City: ' + city);
  }

  callTransactionApi(city, date, company).then((output) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ 'speech': JSON.stringify(output), 'displayText': JSON.stringify(output) }));
  }).catch((error) => {
    // If there is an error let the user know
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ 'speech': error, 'displayText': error }));
    console.log(" Error in callback " + error);
  });
};


function callTransactionApi (city, date, company) {
  return new Promise((resolve, reject) => {
        var data = {
          "data":{
              "city": company
          }
        };

        request({
            url: "https://test-node-getting-started.herokuapp.com/getTransactions",
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
            var companies="";
            var output = response.body.status;
            output.forEach(function(companyInfo) {
                companies = (companies=="")? companyInfo.name:  companies + ", " + companyInfo.name;
            });
            resolve(companies);
          }
        });
  });
}
