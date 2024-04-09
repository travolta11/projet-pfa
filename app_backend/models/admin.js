const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class Admin {
   
   
//get admin..............................................
    static async getAllAdmin() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM admin", (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
//get admin..........................................



//add admin.........................................................................
    static async addAdmin(username, email, password) {
        return new Promise(resolve => {
            db.query("INSERT INTO admin (username, email, password) VALUES (?, ?, ?)",
                [username,email,password], (error, results) => {
                    if (!error) {
                        resolve(true);
                    } else {
                        console.error('Error adding admin:', error);
                        resolve(false);
                    }
                });
        });
    }
//add admin.........................................................................




//delete admin......................................................................
    static async deleteAdmin(adminId) {
        return new Promise((resolve) => {
            db.query('DELETE FROM admin WHERE id = ?', [adminId], (error, results) => {
                if (!error) {
                    resolve(true);
                } else {
                    console.error('Error deleting admin:', error);
                    resolve(false);
                }
            });
        });
    }
//delete admin......................................................................





//update admin......................................................................
    static async updateAdmin(adminId, newData) {
        return new Promise((resolve) => {
            db.query('UPDATE admin SET ? WHERE id = ?', [newData, adminId], (error, results) => {
                if (!error) {
                    resolve(true);
                    console.log(newData)
                } else {
                    console.error('Error updating admin:', error);
                    resolve(false);
                }
            });
        });
    }
//update admin......................................................................



//get by id admin...................................................................
    static async getAdminById(adminId) {
        return new Promise((resolve) => {
            db.query('SELECT * FROM admin WHERE id = ?', [adminId], (error, results) => {
                if (!error && results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(null);
                }
            });
        });
    }
//get by id admin...................................................................


/*static async authenticate(email, password) {
    try {
        // Find admin by email
        const [rows, fields] = await db.promise().query('SELECT * FROM admin WHERE email = ?', [email]);
        const admin = rows[0];

        if (!admin) {
            console.error(`Admin not found for email: ${email}`);
            return null; // Admin not found
        }

        // Compare passwords
        if (admin.password !== password) {
            console.error(`Incorrect password for email: ${email}`);
            return null; // Incorrect password
        }

        // Generate JWT token
        const token = jwt.sign({ adminId: admin.id }, 'issam', { expiresIn: '1h' });

        return token;
    } catch (error) {
        console.error('Authentication error:', error);
        throw new Error('Internal server error');
    }
}*/


}

module.exports = Admin;
