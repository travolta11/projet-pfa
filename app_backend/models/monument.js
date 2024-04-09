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
}

module.exports = Monument;
