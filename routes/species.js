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
            console.log(species);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

//get species by common name
router.get('/:id', function(req, res, next) {
    Species
        .find({
        	common_name
        })
        .then(species => res.json(species.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' })
        });
});



module.exports = router;