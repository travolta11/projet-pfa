const bcrypt = require('bcrypt');

// Generate a salt and hash for the password
const saltRounds = 10; // Adjust the number of salt rounds as needed
const plainPassword = 'issam'; // Replace with the actual password

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
    if (err) {
        console.error('Error bcrypting password:', err);
    } else {
        console.log('Bcrypt hash:', hash);
        // Store the hash in your database
        // For example, you might insert it into the 'admin' table
        // db.query('INSERT INTO admin (password) VALUES (?)', [hash], (error, results) => {
        //     if (error) {
        //         console.error('Error storing hashed password:', error);
        //     } else {
        //         console.log('Hashed password stored successfully');
        //     }
        // });
    }
});