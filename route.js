var express = require('express');
var path = require('path');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');

var users = [
  {id:1, fName:'Hege1', lName:"Pege", Age:"18", Sex:"Male" },
  {id:2, fName:'Kim',  lName:"Pim", Age:"22", Sex:"Female" },
  {id:3, fName:'Sal',  lName:"Smith", Age:"33", Sex:"Female" },
  {id:4, fName:'Jack', lName:"Jones", Age:"28", Sex:"Male" },
  {id:5, fName:'John', lName:"Doe", Age:"27", Sex:"Female" },
  {id:6, fName:'Peter',lName:"Pan", Age:"19", Sex:"Male" },
  {id:7, fName:'Hege11', lName:"Pege44", Age:"18", Sex:"Male" },
  {id:8, fName:'Kim11',  lName:"Pim44", Age:"22", Sex:"Female" },
  {id:9, fName:'Sal11',  lName:"Smith44", Age:"33", Sex:"Female" },
  {id:10, fName:'Jack11', lName:"Jones44", Age:"28", Sex:"Male" },
  {id:11, fName:'John11', lName:"Doe44", Age:"27", Sex:"Female" }
  ];

  app.use(express.static('public'));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.get('/', function(req, res){
  	res.sendFile(path.join(__dirname+'/index.html'));
  	//console.log(users);
  });

  app.get('/users1', function(req, res) {
  	res.send(users);
  });

  /*app.get('/test', function(req, res){
    res.json({ message : 'Hi I am here'});
  })*/

  app.delete('/users/:id', function(req, res){
    console.log('this is delete');
    users.splice(res.data, 1);
    res.send(users);
    res.json(true);
  })

  app.post('/addUser', function(req, res){
    users.push(req.body);
    res.send(req.body);
    //res.send('add finish');
  })

  app.listen(3000, function(){
  	console.log('index.html start');
  })