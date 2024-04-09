const Tourist=require("../models/tourist")
class touristController{
//get controller................................................................
static async getAlltourist(req,res){
    try {
        const results = await Tourist.getAllTourist();
        res.send(results);
    } catch (error) {
        console.error('Error fetching tourist:', error);
        res.status(500).send('Internal Server Error');
    }

}
//get controller................................................................



//add controller................................................................
static async addTourist(req,res){
    var username=  req.body.username;
    var email=  req.body.email;
    var password=  req.body.password;
    var id_admin=req.body.id_admin;
    var AddedTourist=await Tourist.addTourist(username,email,password,id_admin);
    if(AddedTourist==true){
        res.send('add succesfully')
    }
    else{
        res.send('add failed')
    }

}
//add controller................................................................


//delete controller.............................................................
static async deleteTourist(req, res) {
    const touristId = req.params.id;

    try {
        const deleted = await Tourist.deleteTourist(touristId);
        if (deleted) {
            res.status(200).json({ message: 'tourist deleted successfully.' });
        } else {
            res.status(404).json({ error: 'tourist not found or unable to delete.' });
        }
    } catch (error) {
        console.error('Error deleting tourist:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
//delete controller.............................................................

//update controller............................................................
static async updateTourist(req, res) {
    const TouristId = req.params.id;
    const {username, email, password,id_admin} = req.body;

    try {
        const updated = await Tourist.updateTourist(TouristId, { username, email, password,id_admin });
        if (updated) {
            res.status(200).json({ message: 'Tourist updated successfully.' });
        } else {
            res.status(404).json({ error: 'Tourist not found or unable to update.' });
        }
    } catch (error) {
        console.error('Error updating Tourist:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
//update controller............................................................

//get by id controller.......................................................
static async getTouristById(req, res) {
    const TouristId = req.params.id;

    try {
        const tourist = await Tourist.getTouristById(TouristId);
        if (tourist) {
            res.status(200).json(tourist);
        } else {
            res.status(404).json({ error: 'tourist not found.' });
        }
    } catch (error) {
        console.error('Error fetching tourist:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
//get by id controller.......................................................

}
module.exports = touristController;