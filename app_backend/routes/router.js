const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const authenticateToken = require('./authenticateToken');
const router = express.Router();
const monumentController = require('../controllers/monumentController');
const adminController=require('../controllers/adminController');
const touristController=require('../controllers/touristController');
const avisController=require('../controllers/avisController')
const createurController = require('../controllers/createurController');

const path = require('path');






router.get('/', (req, res) => {
    res.send('Hello from homepage.');
});


//Monument CRUD API
//get api
router.get('/monument', monumentController.getAllMonuments);
//add api
router.post('/monument', monumentController.addMonument);
//delete api
router.delete('/monument/:id', monumentController.deleteMonument); 
//update api
router.put('/monument/:id', monumentController.updateMonument);
//get api by id
router.get('/monument/:id', monumentController.getMonumentById);
//Monument CRUD API


//Createur CRUD API
//get api
router.get('/createur', createurController.getAllCreateurs);
//add api
router.post('/createur', createurController.addCreateur);
//delete api
router.delete('/createur/:id', createurController.deleteCreateur); 
//update api
router.put('/createur/:id', createurController.updateCreateur);
//get api by id
router.get('/createur/:id', createurController.getCreateurById);
//Createur CRUD API

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
//Admin CRUD API

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
//Tourist CRUD API

//Avis CRUD API
//get api
router.get('/avis',avisController.getAllavis);
//add api
router.post('/avis',avisController.addAvis);
//delete api
router.delete('/avis/:id', avisController.deleteAvis); 
//update api
router.put('/avis/:id', avisController.updateAvis);
//get api by id
router.get('/avis/:id', avisController.getAvisById);
//Avis CRUD API


router.post('/login',(req,res)=>{
    const sql = "SELECT * FROM admin WHERE `email` = ? AND `password` = ?";
    const email = req.body.email;
    const password = req.body.password;
    db.query(sql,[email,password],(err,data)=>{
        if(err){
            return res.json("error");
        }
        if(data.length > 0){
            const id = data[0].id;
          const token =  jwt.sign({id},"issam",{expiresIn: 30000});
            return res.json({Login:true,token,data});

        }else {
            return res.json("fail");
        }

    })
});
router.post('/signin',(req,res)=>{
  const sql = "SELECT * FROM tourist WHERE email = ? AND password = ?";
  const email = req.body.email;
  const password = req.body.password;
  db.query(sql,[email,password],(err,data)=>{
      if(err){
          return res.json("error");
      }
      if(data.length > 0){
          const id = data[0].id;
        const token =  jwt.sign({id},"issam",{expiresIn: 30000});
          return res.json({Login:true,token,data});

      }else {
          return res.json("fail");
      }

  })
});



router.post('/signup', async (req, res) => {
  try {
      const { username, email, password } = req.body;
      // Check if user already exists
      const [existingUsers] = await db.promise().query('SELECT * FROM tourist WHERE email = ?', [email]);
      if (existingUsers.length > 0) {
          return res.status(400).json({ msg: 'User already exists' });
      }
      
      // Insert new user into database
      await db.promise().query('INSERT INTO tourist (username, email, password, id_admin) VALUES (?, ?, ?, ?)', [username, email, password, 4]);
      res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});



router.get('/api/user', authenticateToken, (req, res) => {
    const userId = req.user.id;
  
    const sql = 'SELECT * FROM admin WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const userData = result[0];
      res.json(userData);
    });
  });

module.exports = router;
