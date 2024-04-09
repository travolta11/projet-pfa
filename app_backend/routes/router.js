const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();
const monumentController = require('../controllers/monumentController');
const adminController=require('../controllers/adminController')
const touristController=require('../controllers/touristController')
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

//Tourist CRUD API
//get api
router.get('/tourist',touristController.getAlltourist);
//add api
router.post('/tourist',touristController.addTourist);
//delete api
router.delete('/tourist/:id', touristController.deleteTourist); 
//update api
router.put('/tourist/:id', touristController.updateTourist);
//get api by id
router.get('/tourist/:id', touristController.getTouristById);
//Monument CRUD API




module.exports = router;
