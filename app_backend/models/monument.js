const db = require('../config/db');

class Monument {
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

    static async addMonuments(titre, description, localisation, ville, id_admin, createur, horaire, frais, avis, images) {
        return new Promise(resolve => {
            db.query("INSERT INTO monument (titre, description, localisation, ville, id_admin, createur, horaire, frais, avis, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [titre, description, localisation, ville, id_admin, createur, horaire, frais, avis, images], (error, results) => {
                    if (!error) {
                        resolve(true);
                    } else {
                        console.error('Error adding monument:', error);
                        resolve(false);
                    }
                });
        });
    }
    
}

module.exports = Monument;
