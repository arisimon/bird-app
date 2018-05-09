const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { Species } = require('../models');
const config = require('../configs');


//GET all species 
router.get('/', function(req, res, next) {
    console.log('Received a GET request for all species');
    Species
        .find()
        .limit(50)
        .then(species => {
            res.json(species);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});


//GET species by ID
router.get('/:id', function(req, res, next) {
    Species
        .findById(req.params.id)
        .then(species => {
        	res.json(species);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' })
        });
});



module.exports = router;