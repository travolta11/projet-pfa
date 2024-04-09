const db = require('../config/db');

class Tourist {
   
   
//get tourist..............................................
    static async getAllTourist() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM tourist", (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
//get tourist..........................................



//add tourist.........................................................................
static async addTourist(username, email, password, id_admin) {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO tourist (username, email, password, id_admin) VALUES (?, ?, ?, ?)",
            [username, email, password, id_admin], (error, results) => {
                if (!error) {
                    resolve(true);
                } else {
                    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                        console.error('Error adding tourist: Admin ID does not exist');
                        console.log(id_admin)
                    } else {
                        console.error('Error adding tourist:', error);
                        console.log(id_admin)
                    }
                    resolve(false);
                }
            });
    });
}

//add tourist.........................................................................




//delete tourist......................................................................
    static async deleteTourist(touristId) {
        return new Promise((resolve) => {
            db.query('DELETE FROM tourist WHERE id = ?', [touristId], (error, results) => {
                if (!error) {
                    resolve(true);
                } else {
                    console.error('Error deleting tourist:', error);
                    resolve(false);
                }
            });
        });
    }
//delete tourist......................................................................





//update tourist......................................................................
    static async updateTourist(touristId, newData) {
        return new Promise((resolve) => {
            db.query('UPDATE tourist SET ? WHERE id = ?', [newData, touristId], (error, results) => {
                if (!error) {
                    resolve(true);
                    console.log(newData)
                } else {
                    console.error('Error updating tourist:', error);
                    resolve(false);
                }
            });
        });
    }
//update tourist......................................................................



//get by id tourist...................................................................
    static async getTouristById(touristId) {
        return new Promise((resolve) => {
            db.query('SELECT * FROM tourist WHERE id = ?', [touristId], (error, results) => {
                if (!error && results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(null);
                }
            });
        });
    }
//get by id tourist...................................................................



}

module.exports = Tourist;
