const db = require('../config/db');

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
                        console.error('Error adding monument:', error);
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



}

module.exports = Admin;
