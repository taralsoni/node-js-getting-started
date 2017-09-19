'use strict';
const https = require('https');
var request = require('request');
//hi just understanding push pull
//new comment line added to redeploy on heroku
exports.transactionFn = (req, res) => {
  let date = '';
  let city = "0";
  let company = "0";
  let investor = "0";

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

  callTransactionApi(city, investor, company).then((output) => {
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
              "city": city,
              "investor": investor,
              "company": comapany
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
           // var companies="";
            var output = response.body.status;
         //   output.forEach(function(companyInfo) {
       //         companies = (companies=="")? companyInfo.name:  companies + ", " + companyInfo.name;
     //       });
            resolve(output);
          }
        });
  });
}
