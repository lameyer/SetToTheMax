var express = require("express");
var ejs = require("ejs");
var app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/static"));

app.get("/", function(req, res){
	res.render("index");
});

app.listen(3000);
