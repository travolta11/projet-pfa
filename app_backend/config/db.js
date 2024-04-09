const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_pfa'
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database with connection id: ' + connection.threadId);
});

module.exports = db;
