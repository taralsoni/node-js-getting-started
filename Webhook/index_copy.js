'use strict';
const https = require('https');
var request = require('request');
const host = 'www.googleapis.com';
const wwoApiKey = 'AIzaSyAo_ojtzYA17vR-3e3e1Usl5-jHh6qF54E';
exports.flightFn = (req, res) => {
  let date = '';
  let fromCity = "";
  let toCity = "";
  if (req.body.result.parameters['date']) {
    date = req.body.result.parameters['date'];
    console.log('Date: ' + date);
  }

  if (req.body.result.parameters['any1']) {
    fromCity = req.body.result.parameters['any1'];
    console.log('fromCity: ' + fromCity);
  }

    if (req.body.result.parameters['any2']) {
    toCity = req.body.result.parameters['any2'];
    console.log('toCity: ' + toCity);
  }
  callFlightApi(fromCity, toCity, date).then((output) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ 'speech': JSON.stringify(output), 'displayText': JSON.stringify(output) }));
  }).catch((error) => {
    // If there is an error let the user know
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ 'speech': error, 'displayText': error }));
    console.log(" Error in callback " + error);
  });
};
function callFlightApi (fromCity, toCity, date) {
  return new Promise((resolve, reject) => {
           var data = {
            "request": {
                "passengers": {
                    "adultCount": 1
                },
                "slice": [{
                    "origin": fromCity,
                    "destination": toCity,
                    "date": date
                }]
            }
        };

        request({
            url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyAo_ojtzYA17vR-3e3e1Usl5-jHh6qF54E&fields=trips(data/airport)",
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
            var airports="";
            var output = response.body.trips.data.airport;
              output.forEach(function(airport) {
                airports = (airports=="")? airport.name:  airports + ", " + airport.name;
            });
            resolve(airports);
          }
        });
  });
}
