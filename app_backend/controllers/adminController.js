const Admin=require("../models/admin")
class adminController{
//get controller................................................................
static async getAllAdmins(req,res){
    try {
        const results = await Admin.getAllAdmin();
        res.send(results);
    } catch (error) {
        console.error('Error fetching admin:', error);
        res.status(500).send('Internal Server Error');
    }

}
//get controller................................................................



//add controller................................................................
static async addAdmin(req,res){
    var username=  req.body.username;
    var email=  req.body.email;
    var password=  req.body.password;
    var AddedAdmin=await Admin.addAdmin(username,email,password);
    if(AddedAdmin==true){
        res.send('add succesfully')
    }
    else{
        res.send('add failed')
    }

}
//add controller................................................................


//delete controller.............................................................
static async deleteAdmin(req, res) {
    const adminId = req.params.id;

    try {
        const deleted = await Admin.deleteAdmin(adminId);
        if (deleted) {
            res.status(200).json({ message: 'admin deleted successfully.' });
        } else {
            res.status(404).json({ error: 'admin not found or unable to delete.' });
        }
    } catch (error) {
        console.error('Error deleting admin:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
//delete controller.............................................................

//update controller............................................................
static async updateAdmin(req, res) {
    const adminId = req.params.id;
    const { username, email, password} = req.body;

    try {
        const updated = await Admin.updateAdmin(adminId, { username, email, password });
        if (updated) {
            res.status(200).json({ message: 'Admin updated successfully.' });
        } else {
            res.status(404).json({ error: 'Admin not found or unable to update.' });
        }
    } catch (error) {
        console.error('Error updating Admin:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
//update controller............................................................

//get by id controller.......................................................
static async getAdminById(req, res) {
    const AdminId = req.params.id;

    try {
        const admin = await Admin.getAdminById(AdminId);
        if (admin) {
            res.status(200).json(admin);
        } else {
            res.status(404).json({ error: 'Admin not found.' });
        }
    } catch (error) {
        console.error('Error fetching Admin:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
//get by id controller.......................................................

/*static async login(req, res) {
    const { email, password } = req.body;

    // Check if email or password is empty
    if (!email || !password) {
        console.error('Empty email or password');
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const token = await Admin.authenticate(email, password);

        if (!token) {
            console.error(`Authentication failed for email: ${email}`);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}*/

}
module.exports = adminController;