var express = require('express');
var path = require('path');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var assert = require('assert');
var mongojs = require('mongojs');
var port = process.env.PORT || 3000;
var router = express.Router();

var databaseUrl = "mongodb://admin:iloveoov@jello.modulusmongo.net:27017/vy6saGej";
var collections = ["iloveoovs"];
var db = mongojs('mongodb://admin:iloveoov@jello.modulusmongo.net:27017/vy6saGej', ['iloveoovs']);

var mongoose = require('mongoose');
// mongoose.connect('mongodb://admin:iloveoov@jello.modulusmongo.net:27017/vy6saGej');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

var Iloveoov = require('./app/models/bear');
// get users actually the json named iloveoovs
router.route('/iloveoov')
.get(function(req, res){
    db.iloveoovs.find(function(err, docs){
    	if(err){
    		res.send(err);
    	}
    	// console.log(docs);	
    	res.json(docs);
    })
})
// add user
.post(function(req, res){
	console.log(req.body);
	db.iloveoovs.insert(req.body, function(err, doc){
		if(err)
			res.send(err);
		res.json(doc);
	})
});

router.route('/iloveoov/:id')
// delete user
.delete(function(req, res) {
	var id = req.params.id;
    console.log("the passed id: " + id);
   
        db.iloveoovs.remove({_id:mongojs.ObjectId(id)}, function(err, docs) {
            if (err)
                res.send(err);

            res.json(docs);
        });
    })

.get(function(req, res){
	var id = req.params.id;
	console.log(id);
	db.iloveoovs.findById({_id:mongojs.ObjectId(id)}, function(err, docs){
		if(err)
			res.send(err);

		res.json(docs);
	});
})

.put(function(req, res){
    var id = req.params.id;
    console.log(req.body.fName);
    console.log(123);
    db.iloveoovs.findAndModify({query: {_id: mongojs.ObjectId(id)},
        update: {$set: {fName: req.body.fName, lName: req.body.lName, title: req.body.title, sex: req.body.sex,
            age: req.body.age, passw1: req.body.passw1, passw2: req.body.passw2}}, 
        new: true}, function(err, doc){
            res.json(doc);
        });

    });
        //     db.iloveoovs.findById(req.params.id, function(err, iloveoovs) {

        //     if (err)
        //         res.send(err);

        //     iloveoovs.fName = req.body.iloveoovs;  // update the bears info
        //     // iloveoovs
        //     // iloveoovs
        //     // iloveoovs
        //     // iloveoovs
        //     // iloveoovs
        //     // iloveoovs

        //     // save the bear
        //     iloveoovs.save(function(err) {
        //         if (err)
        //             res.send(err);

        //         res.json(iloveoovs);
        //     });

        // });

// app.delete('/contactlist/:id',function(req,res){
//     var id = req.params.id;
//     console.log(id);
//     db.contactlist.remove({_id:mongojs.ObjectId(id)},function(err,doc){
//         res.json(doc);
//     })
// });


app.use('/api', router);
// var insertData = new Iloveoov(
//       {
//       "id": 11,
//       "fName": "Twwaerrace1",
//       "lName": "Shaout",
//       "title": "Free lancer",
//       "sex": "female",
//       "age": 21
//     });

// insertData.save(function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('data insert success??');
//   }
// });
// var data = require('./users.json');
// data.save(function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('data insert success??');
//   }
// });

app.listen(port); 
    console.log('index.html is starting, with public saved static files. Iloveoov at port: ' + port);
