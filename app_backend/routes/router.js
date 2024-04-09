const express = require('express');
const router = express.Router();
const monumentController = require('../controllers/monumentController');

router.get('/', (req, res) => {
    res.send('Hello from homepage.');
});

router.get('/monument', monumentController.getAllMonuments);

module.exports = router;
