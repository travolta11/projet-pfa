const Monument = require('../models/monument');

class MonumentController {



//get controller................................................................
    static async getAllMonuments(req, res) {
        try {
            const results = await Monument.getAllMonuments();
            res.send(results);
        } catch (error) {
            console.error('Error fetching monuments:', error);
            res.status(500).send('Internal Server Error');
        }
    }
//get controller................................................................




//add controller................................................................
static async addMonument(req, res) {
    try {
      const {
        titre,
        description,
        localisation,
        ville,
        id_admin,
        createur,
        horaire,
        frais,
        avis
      } = req.body;
  
      const images = req.files.map(file => file.path);
  
      const addedM = await Monument.addMonuments(
        titre,
        description,
        localisation,
        ville,
        id_admin,
        createur,
        horaire,
        frais,
        avis,
        images
      );
  
      if (addedM) {
        res.send('Monument added successfully');
      } else {
        res.status(500).send('Failed to add monument');
      }
    } catch (error) {
      console.error('Error adding monument:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  
//add controller................................................................





//delete controller.............................................................
    static async deleteMonument(req, res) {
        const monumentId = req.params.id;

        try {
            const deleted = await Monument.deleteMonument(monumentId);
            if (deleted) {
                res.status(200).json({ message: 'Monument deleted successfully.' });
            } else {
                res.status(404).json({ error: 'Monument not found or unable to delete.' });
            }
        } catch (error) {
            console.error('Error deleting monument:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
//delete controller.............................................................



//update controller............................................................
    static async updateMonument(req, res) {
        const monumentId = req.params.id;
        const { titre, description, localisation, ville, id_admin, createur, horaire, frais, avis, images } = req.body;

        try {
            const updated = await Monument.updateMonument(monumentId, { titre, description, localisation, ville, id_admin, createur, horaire, frais, avis, images });
            if (updated) {
                res.status(200).json({ message: 'Monument updated successfully.' });
            } else {
                res.status(404).json({ error: 'Monument not found or unable to update.' });
            }
        } catch (error) {
            console.error('Error updating monument:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
//update controller............................................................




//get by id controller.......................................................
    static async getMonumentById(req, res) {
        const monumentId = req.params.id;

        try {
            const monument = await Monument.getMonumentById(monumentId);
            if (monument) {
                res.status(200).json(monument);
            } else {
                res.status(404).json({ error: 'Monument not found.' });
            }
        } catch (error) {
            console.error('Error fetching monument:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    //get by id controller.......................................................


    

}



module.exports = MonumentController;
