const config = require('../configs');
const express = require('express');
const router = express.Router();
const { Observation } = require('../models');

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

// //get specific observation by ID
// router.get('/:id', function(req, res, next) {
//             Observation
//                 .findById(req.params.id)
//                 .then(observation => res.json(observation.serialize()))
//                 .catch(err => {
//                     console.error(err);
//                     res.status(500).json({ message: 'Internal server error' })
//                 });
//             });


//create a new observation
// router.post('/', function(req, res, next) {
//     console.log('POSTing a new observation');
//     const requiredFields = [];
//     for (let i = 0; i < requiredFields.length; i++) {
//         const field = requiredFields[i];
//         if (!(field in req.body)) {
//             const message = `Missing \`${field}\` in request body`
//             console.error(message);
//             return res.status(400).send(message);
//         }
//     }

//     Observation
//         .create({
//             userId: req.body.userId,
//             common_name: req.body.common_name,
//             address: req.body.address,
//         })
//         .then(
//             observation => res.status(201).json(observation.serialize()))
//         .catch(err => {
//             console.error(err);
//             res.status(500).json({ message: 'Internal server error' });
//         });
// })



module.exports = router;
