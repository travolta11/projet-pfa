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
}



module.exports = MonumentController;
