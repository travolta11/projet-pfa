const Avis=require("../models/avis")

class avisController{

    //get controller................................................................
static async getAllavis(req,res){
    try {
        const results = await Avis.getAllAvis();
        res.send(results);

    } catch (error) {
        console.error('Error fetching Avis:', error);
        res.status(500).send('Internal Server Error');
        
    }

}
//get controller................................................................


//add controller................................................................
static async addAvis(req,res){

    var id_tourist=req.body.id_tourist;
    var id_monument=req.body.id_monument;
    var note=  req.body.note;
    var AddedAvis=await Avis.addAvis(id_tourist,id_monument,note);
    if(AddedAvis==true){
        res.send('add succesfully')
    }
    else{
        res.send('add failed')
    }

}
//add controller................................................................

//delete controller.............................................................
static async deleteAvis(req, res) {
    const AvisId = req.params.id;

    try {
        const deleted = await Avis.deleteAvis(AvisId);
        if (deleted) {
            res.status(200).json({ message: 'avis deleted successfully.' });
        } else {
            res.status(404).json({ error: 'avis not found or unable to delete.' });
        }
    } catch (error) {
        console.error('Error deleting avis:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
//delete controller.............................................................

//update controller............................................................
static async updateAvis(req, res) {
    const AvisId = req.params.id;
    const {id_tourist, id_monument, note} = req.body;

    try {
        const updated = await Avis.updateAvis(AvisId, {id_tourist, id_monument, note });
        if (updated) {
            res.status(200).json({ message: 'avis updated successfully.' });
        } else {
            res.status(404).json({ error: 'avis not found or unable to update.' });
        }
    } catch (error) {
        console.error('Error updating Tourist:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
//update controller............................................................

//get by id controller.......................................................
static async getAvisById(req, res) {
    const AvisId = req.params.id;

    try {
        const avis = await Avis.getAvisById(AvisId);
        if (avis) {
            res.status(200).json(avis);
        } else {
            res.status(404).json({ error: 'avis not found.' });
        }
    } catch (error) {
        console.error('Error fetching avis:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
//get by id controller.......................................................
}
module.exports=avisController