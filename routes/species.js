const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { Species } = require('../models');
const config = require('../configs');


//GET species based of search input, if not found get all species
router.get('/', function(req, res, next) {
    console.log('Received a GET request to find species');
        var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all species from DB
        Species.find({common_name: regex}, function(err, allSpecies){
           if(err){
               console.log(err);
           } else {
              if(allSpecies.length < 1) {
                  noMatch = "No species match that query, please try again.";
              }
              // res.render("./routes/species",{Species:allSpecies, noMatch: noMatch});
              console.log(allSpecies);
           }
        });
    } else {
        // Get all species from DB
        Species.find({}, function(err, allSpecies){
           if(err){
               console.log(err);
           } else {
              // res.render("./routes/index",{Species:allSpecies, noMatch: noMatch});
              console.log(allSpecies);
           }
        });
    }
});


//GET all species (>18,000 results)
router.get('/all', function(req, res, next) {
    Species
        .find()
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

//function to format query strings
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};



module.exports = router;