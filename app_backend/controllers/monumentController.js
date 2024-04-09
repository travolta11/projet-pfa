const Monument = require('../models/monument');

class MonumentController {
    static async getAllMonuments(req, res) {
        try {
            const results = await Monument.getAllMonuments();
            res.send(results);
        } catch (error) {
            console.error('Error fetching monuments:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = MonumentController;
