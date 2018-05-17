const config = require('../configs');
const express = require('express');
const router = express.Router();
const { Observation } = require('../models');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


//get all observations
router.get('/', function(req, res, next) {
    console.log('Received a get request for all observations');
    Observation
        .find()
        .limit(20)
        .then(observation => {
            res.json(observation.map(observation => observation.serialize()));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
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
router.post('/new', jsonParser, function(req, res, next) {
    console.log('POSTing a new observation');
    const requiredFields = ['bird', 'notes', 'location', 'obsDate'];
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
            bird: req.body.bird,
            location: req.body.location,
            notes: req.body.notes,
            obsDate: req.body.obsDate
        })
        .then(
            observation => res.status(201).json(observation.serialize()))
            res.redirect('/observations')
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