const express = require('express');
const router = express.Router();
const monumentController = require('../controllers/monumentController');
const adminController=require('../controllers/adminController')

router.get('/', (req, res) => {
    res.send('Hello from homepage.');
});


//Monument CRUD API
//get api
router.get('/monument', monumentController.getAllMonuments);
//add api
router.post('/monument',monumentController.addMonument);
//delete api
router.delete('/monument/:id', monumentController.deleteMonument); 
//update api
router.put('/monument/:id', monumentController.updateMonument);
//get api by id
router.get('/monument/:id', monumentController.getMonumentById);
//Monument CRUD API

//Admin CRUD API
//get api
router.get('/admin',adminController.getAllAdmins);
//add api
router.post('/admin',adminController.addAdmin);
//delete api
router.delete('/admin/:id', adminController.deleteAdmin); 
//update api
router.put('/admin/:id', adminController.updateAdmin);
//get api by id
router.get('/admin/:id', adminController.getAdminById);
//Monument CRUD API




module.exports = router;
