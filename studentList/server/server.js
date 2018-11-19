var express = require("express");
var mongodb = require("mongodb");
var bodyparser = require("body-parser");
var app = express();
//import cors
var cors = require ('cors');
app.use(cors());
//set mime type
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
//cerate client
var studentData = mongodb.MongoClient;
//Rest API
app.get("/fetch",function(req,res){
    studentData.connect("mongodb://localhost:27017/student",function(err,db){
       db.collection("data").find().toArray(function(err,array){
            res.send(array);
       });
    });
});
//insert student
app.post("/insert", function(req, res) {
    var s_id = req.body.s_id;
    var s_name = req.body.s_name;
    var s_number = req.body.s_number;
    var s_status = req.body.s_status;
    var obj = {"s_id":s_id,"s_name":s_name, "s_number":s_number, "s_status":s_status};
    studentData.connect("mongodb://localhost:27017/student",  function(err, db){
        db.collection("data").insertOne(obj,
            function(err, result) {
                if(err){
                    res.json({"insert":"fail"});
                } else{
                    res.json({"insert":"success"});
                }
            });
        });
});
//update data
app.post("/update", function(req, res) {
    var s_id = req.body.s_id;
    var s_name = req.body.s_name;
    var s_number = req.body.s_number;
    var s_status = req.body.s_status;
    studentData.connect("mongodb://localhost:27017/student", function(err, db) {
        db.collection("data").updateOne({"s_id" : s_id},
                                            {$set:{"s_name":s_name, "s_number":s_number, "s_status":s_status}},
                                                function(err, result) {
                                                    if(err){
                                                        res.json({"update":"fail"});
                                                    } else{
                                                        res.json({"update":"success"});
                                                    }
            });
    });
});
app.listen(3000);
console.log("Server Listening the port no.3000");