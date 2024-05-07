const mysql= require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'company_it_policy',
    user: 'root',
    password: 'admin@1A'
});

module.exports= connection;