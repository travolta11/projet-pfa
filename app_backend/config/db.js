const mysql = require('mysql')
mysql.createPool({
    "host":     "localhost",
    "username": "root",
    "password": "",
    "database": "db_pfa"
});