const express = require('express')
const app = express();

const bp = require('body-parser');
app.use(bp.json());

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/1955API')

//Schemas go here ==>
var nameSchema = new mongoose.Schema({
	name:{type: String, required: true, minlength: 4}
})
mongoose.model('Name', nameSchema)
var Name = mongoose.model('Name')
//<== end schemas

//Routes go here ==>
app.get('/', function(req,res){
	Name.find({}, function(err,names){
		if(err){
			console.log ("Returned error", err)
			res.json({message: "Error", error: err})
		}
		else {
			res.json({message: "Success", data: names})
		}
	})
})
app.get('/new/:name', function(req,res){
	var name = new Name({name: req.params.name})
	name.save(function(err){
		if (err){
			console.log ("Returned error", err)
			res.json({message: "Error", error: err})
		} else {
			res.redirect('/');
		}
	})
})
app.get('/:name', function(req,res){
	Name.find({name: req.params.name}, function(err,name){
		if (err){
			console.log ("Returned error", err)
			res.json({message: "Error", error: err})
		} else {
			res.json({message: "Success", data: name});
		}
	})
})
app.get('/remove/:name', function(req,res){
	Name.remove({name: req.params.name}, function(err){
		if (err){
			console.log ("Returned error", err)
			res.json({message: "Error", error: err})
		} else {
			res.redirect('/');
		}
	})
})

//<== end routes

app.listen(8000, function() {
	console.log("listening on port 8000");
})