const mysql = require("mysql");
const config = {
    host:"localhost",
    user:"root",
    password:"",
    database:"ticketdb"
};
const db = mysql.createConnection(config);
db.connect((err)=>{
    if(err) console.log(err);
    console.log("MySQLconnect");
});
module.exports = db;
