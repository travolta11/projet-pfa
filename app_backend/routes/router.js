const express = require('express');
const router = express.Router();
const monumentController = require('../controllers/monumentController');

router.get('/', (req, res) => {
    res.send('Hello from homepage.');
});

router.get('/monument', monumentController.getAllMonuments);
router.post('/monument',monumentController.addMonument);
router.delete('/monument/:id', monumentController.deleteMonument); 
router.put('/monument/:id', monumentController.updateMonument);
router.get('/monument/:id', monumentController.getMonumentById);


module.exports = router;
