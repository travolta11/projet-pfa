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
        longitude,
        latitude,
        ville,
        id_admin,
        createur,
        horaire,
        frais,
        avis,
        images,
        createur_id  // Assuming images are now sent as URLs in the request body
      } = req.body;
  
      // No need to map file paths since you're expecting image URLs
      // const images = req.files.map(file => file.path);
  
      const addedM = await Monument.addMonuments(
        titre,
        description,
        localisation,
        longitude,
        latitude,
        ville,
        id_admin,
        createur,
        horaire,
        frais,
        avis,
        images,
        createur_id   // Pass image URLs directly to the addMonuments function
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
        const { titre, description, localisation,longitude,latitude, ville, id_admin, createur, horaire, frais, avis, images,createur_id  } = req.body;

        try {
            const updated = await Monument.updateMonument(monumentId, { titre, description, localisation,longitude,latitude, ville, id_admin, createur, horaire, frais, avis, images,createur_id  });
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
        // Split the string of image URLs into an array
        monument.images = monument.images.split(',');
  
        // Trim whitespace from each URL
        monument.images = monument.images.map(url => url.trim());
  
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
