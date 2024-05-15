const Createur = require('../models/createur');

class CreateurController {



//get controller................................................................
    static async getAllCreateurs(req, res) {
        try {
            const results = await Createur.getAllCreateurs();
            res.send(results);
        } catch (error) {
            console.error('Error fetching createurs:', error);
            res.status(500).send('Internal Server Error');
        }
    }
//get controller................................................................




//add controller................................................................
static async addCreateur(req, res) {
    try {
      const {
        
        nom,
        biographie,
        date_n,
        photo,
        admin_id 
      } = req.body;
  
    
      const addedC = await Createur.addCreateurs(
        nom,
        biographie,
        date_n,
        photo,
        admin_id  
      );
  
      if (addedC) {
        res.send('Createur added successfully');
      } else {
        res.status(500).send('Failed to add createur');
      }
    } catch (error) {
      console.error('Error adding createur:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  
  
//add controller................................................................





//delete controller.............................................................
    static async deleteCreateur(req, res) {
        const createurtId = req.params.id;

        try {
            const deleted = await Createur.deleteCreateur(createurtId);
            if (deleted) {
                res.status(200).json({ message: 'Createur deleted successfully.' });
            } else {
                res.status(404).json({ error: 'Createur not found or unable to delete.' });
            }
        } catch (error) {
            console.error('Error deleting createur:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
//delete controller.............................................................



//update controller............................................................
    static async updateCreateur(req, res) {
        const createurId = req.params.id;
        const { nom, biographie, date_n,photo,admin_id } = req.body;

        try {
            const updated = await Createur.updateCreateur(createurId, { nom, biographie, date_n,photo,admin_id  });
            if (updated) {
                res.status(200).json({ message: 'Createur updated successfully.' });
            } else {
                res.status(404).json({ error: 'Createur not found or unable to update.' });
            }
        } catch (error) {
            console.error('Error updating createur:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
//update controller............................................................




//get by id controller.......................................................
    
static async getCreateurById(req, res) {
    const createurId = req.params.id;
  
    try {
      const createur = await Createur.getCreateurById(createurId);
      if (createur) {
        // Split the string of image URLs into an array
    
  
        res.status(200).json(createur);
      } else {
        res.status(404).json({ error: 'Createur not found.' });
      }
    } catch (error) {
      console.error('Error fetching createur:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
    //get by id controller.......................................................


    

}



module.exports = CreateurController;
