const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");

const bodyParser = require("body-parser");
//Set Views
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.engine("html",ejs.renderFile);
//Set static public
app.use(express.static(path.join(__dirname,"Public")));
//Set req.body.params
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

let tickets = require("./Controller/ticket");
let routes = require("./Api/routes");
routes(app, tickets);

app.listen(3000, function(){ 
    console.log("App Started")
});