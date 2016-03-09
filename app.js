'use strict'

const namesFilename = './todo.json'

const PORT = 8888

var express = require('express')
var http = require('http')
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var moment = require('moment');

var app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json())

app.get('/', function(req, res, next){
	res.sendFile(path.join(__dirname, './index.html'));
})

app.get('/todos', function(req, res, next){
		fs.readFile(namesFilename, function(err, data){
			data = data.toString();	
			res.send(data);
		});
})

app.post('/todos', function(req, res, next){
			var obj = {};
			obj.desc = req.body.desc;
			obj.due = moment(req.body.due).format('LL');
			fs.readFile(namesFilename, function(err, data) {
			var array = JSON.parse(data);
			obj = JSON.stringify(obj)
				array.push(obj)
			fs.writeFile(namesFilename, JSON.stringify(array), function(err){
				console.log('MF is in the JSON!')
			res.send();
			})
		});
	});

app.delete('/todos/:index', function(req, res, next){
	console.log('req.params', req.params);
	res.send('DELETE to /todos/:index');
	console.log(req.params.index);
})


var server = http.createServer(app);

server.listen(PORT, function(err){
	console.log(`Server listening on port ${PORT}`)
})
