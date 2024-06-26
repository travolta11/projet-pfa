const db = require('../config/db');

class Monument {
   
   
   //get model..............................................
    static async getAllMonuments() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM monument", (error, results) => {
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
static async addMonuments(titre, description, localisation,longitude,latitude, ville, id_admin, createur, horaire, frais, avis, images,createur_id ) {
    return new Promise(resolve => {
      let imagesString;
  
      // Check if images is an array
      if (Array.isArray(images)) {
        // Convert the array of image URLs into a single string
        imagesString = images.join(',');
      } else {
        // Handle the case where images is not an array (e.g., single image URL)
        imagesString = images;
      }
  
      db.query("INSERT INTO monument (titre, description, localisation,longitude,latitude, ville, id_admin, createur, horaire, frais, avis, images,createur_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)",
        [titre, description, localisation,longitude,latitude, ville, id_admin, createur, horaire, frais, avis, imagesString,createur_id ], (error, results) => {
          if (!error) {
            resolve(true);
          } else {
            console.error('Error adding monument:', error);
            resolve(false);
          }
        });
    });
  }
  
//add model.........................................................................




//delete model......................................................................
    static async deleteMonument(monumentId) {
        return new Promise((resolve) => {
            db.query('DELETE FROM monument WHERE id = ?', [monumentId], (error, results) => {
                if (!error) {
                    resolve(true);
                } else {
                    console.error('Error deleting monument:', error);
                    resolve(false);
                }
            });
        });
    }
//delete model......................................................................





//update model......................................................................
static async updateMonument(monumentId, newData) {
    // Check if images is an array
    if (Array.isArray(newData.images)) {
        // Convert the array of image URLs into a single string
        newData.images = newData.images.join(',');
    }

    return new Promise((resolve) => {
        db.query('UPDATE monument SET ? WHERE id = ?', [newData, monumentId], (error, results) => {
            if (!error) {
                resolve(true);
            } else {
                console.error('Error updating monument:', error);
                resolve(false);
            }
        });
    });
}



//update model......................................................................



//get by id model...................................................................
    static async getMonumentById(monumentId) {
        return new Promise((resolve) => {
            db.query('SELECT * FROM monument WHERE id = ?', [monumentId], (error, results) => {
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

module.exports = Monument;
