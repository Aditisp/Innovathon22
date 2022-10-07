const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"aditi26",
    database:"hackathon"
});
module.exports= con;