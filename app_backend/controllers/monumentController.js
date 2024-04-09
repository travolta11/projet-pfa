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

    static async addMonument(req,res){
            var titre=  req.body.titre;
            var description = req.body.description;
            var localisation =  req.body.localisation;
            var ville =  req.body.ville;
            var id_admin =  req.body.id_admin;
            var createur =  req.body.createur;
            var horaire =  req.body.horaire;
            var frais = req.body.frais;
            var avis = req.body.avis;
            var images = req.body.images;
        var addedM = await Monument.addMonuments(titre,description,localisation,ville,id_admin,createur,horaire,frais,avis,images)
            if(addedM==true)
            res.send('add succesfully')
                else
                
                res.send('add failed')
    }


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


}



module.exports = MonumentController;
