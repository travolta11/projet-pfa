const db = require('../config/db');

class Createur {
   
   
   //get model..............................................
    static async getAllCreateurs() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM createur", (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
//get model..........................................



//add model.........................................................................
static async addCreateurs(nom, biographie, date_n,photo,admin_id ) {
    return new Promise(resolve => {
      let imagesString;
  
      // Check if images is an array
      if (Array.isArray(photo)) {
        // Convert the array of image URLs into a single string
        imagesString = photo.join(',');
      } else {
        // Handle the case where images is not an array (e.g., single image URL)
        imagesString = photo;
      }
  
      db.query("INSERT INTO createur (nom, biographie, date_n, photo,admin_id ) VALUES (?, ?, ?, ?,?)",
        [nom, biographie, date_n, imagesString,admin_id ], (error, results) => {
          if (!error) {
            resolve(true);
          } else {
            console.error('Error adding createur:', error);
            resolve(false);
          }
        });
    });
  }
  
//add model.........................................................................




//delete model......................................................................
    static async deleteCreateur(createurId) {
        return new Promise((resolve) => {
            db.query('DELETE FROM createur WHERE id = ?', [createurId], (error, results) => {
                if (!error) {
                    resolve(true);
                } else {
                    console.error('Error deleting createur:', error);
                    resolve(false);
                }
            });
        });
    }
//delete model......................................................................





//update model......................................................................
static async updateCreateur(createurtId, newData) {
    // Check if images is an array
    if (Array.isArray(newData.photo)) {
        // Convert the array of image URLs into a single string
        newData.photo = newData.photo.join(',');
    }

    return new Promise((resolve) => {
        db.query('UPDATE createur SET ? WHERE id = ?', [newData, createurtId], (error, results) => {
            if (!error) {
                resolve(true);
            } else {
                console.error('Error updating createur:', error);
                resolve(false);
            }
        });
    });
}



//update model......................................................................



//get by id model...................................................................
    static async getCreateurById(createurId) {
        return new Promise((resolve) => {
            db.query('SELECT * FROM createur WHERE id = ?', [createurId], (error, results) => {
                if (!error && results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(null);
                }
            });
        });
    }
//get by id model...................................................................



}

module.exports = Createur;
