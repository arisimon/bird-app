'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const observationSchema = mongoose.Schema({
	user: String,
	bird: {
		scientific-name: String,
		common-name: String,
		family: String,
	},
	location: {
		lat: Number,
		lng: Number,
		address: String,
	},
});