const config = require('../configs');
const express = require('express');
const router = express.Router();
const { Observation } = require('../models');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlParser = bodyParser.urlencoded({ extended: false });


//get all observations
router.get('/', function(req, res, next) {
    console.log('Received a get request for all observations');
    Observation
        .find(function(err, content) {
            res.render('observations', { contents: content })
        })
        .sort({obsDate: -1})
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            res.render('error');
        });
});

//get new observation page
router.get('/new', function(req, res, next) {
   res.render('observations/new'); 
});


//get specific observation by ID
router.get('/:id', function(req, res, next) {
    Observation
        .findById(req.params.id)
        .then(observation => res.json(observation.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' })
        });
});




//handle POST request, create a new observation
router.post('/', jsonParser, function(req, res, next) {
    console.log('POSTing a new observation');
    console.log(req.body);
    const requiredFields = ['scientific_name', 'common_name', 'family', 'details', 'address'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing ${field} in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    Observation
        .create({
            bird: [req.body.scientific_name, req.body.common_name, req.body.family],
            location: req.body.address,
            notes: req.body.details
        })
        .then(
            observation => res.json(observation.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
            res.send(err);
        });
});

//DELETE specific observation by ID
router.delete('/:id', (req, res) => {
    Observation
        .findByIdAndRemove(req.params.id)
        .then(() => res.status(204).end())
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Unable to delete your observation' });
        });
});


//PUT request to update observation notes
router.put('/:id', jsonParser, (req, res) => {
	console.log(req.body);
	const requiredFields = ['notes'];
	    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing ${field} in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
	if (req.params.id !== req.body.id) {
		const message = `Request path id ${req.params.id} and request body id ${req.body.id} must match`;
		console.error(message);
		return res.status(400).send(message);
	}
	console.log(`Updating observation ${req.params.id}`);
	Observation
		.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
		.exec()
		.then(observation => res.status(200).json(observation))
		.catch(err => {
			res.status(500).json({message: 'Internal server error'});
		});
});

//fallback error
router.use('*', (req, res) => {
	res.status(404).send('URL Not Found');
});


module.exports = router;