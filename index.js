var express   =    require("express");
var mysql     =    require('mysql');
var parser    =    require('body-parser'); 
var app       =    express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));


//var pool      =    mysql.createPool({
//    connectionLimit : 100, //important
//    host     : 'localhost',
//    user     : 'root',
//    password : '',
//    database : 'APIAI',
//    debug    : "false" 
//});


function handle_database(req,res) {
    res.json({"code" : 200, "status" : "Success"});
    return;
//    pool.getConnection(function(err,connection){
//        if (err) {
//          res.json({"code" : 100, "status" : "Error in connection database"});
//          return;
//        }   
//        console.log('connected as id ' + connection.threadId);
//        console.log("Request" + req.body.data.city);
//        var query = "select * from transactions where city='" + req.body.data.city + "'"; 
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

app.post("/getTransactions",function(req,res){
        handle_database(req,res);
});

app.listen(process.env.PORT || 3000);
console.log("Success");