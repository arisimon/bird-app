const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { Species } = require('../models');
const config = require('../configs');

/* GET all species listing. */
router.get('/', function(req, res, next) {
	console.log('Received a GET request for all species');
	Species
	.find()
	.limit(20)
	.then(species => {
      res.json({
      	scientific_name: species.scientific_name,
      	common_name: species.common_name,
      	family: species.family,
      });
      console.log(species);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

router.get('/:id', function(req, res, next) {
	res.send('this is a specific bird');
});



module.exports = router;
