'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;



//schema to find species
const speciesSchema = mongoose.Schema({
	scientific_name: String,
	common_name: String,
	family: String,
})

speciesSchema.methods.serialize = function() {
	return {
		id: this._id,
		scientific_name: this.scientific_name,
		common_name: this.common_name,
		family: this.family,
	};
}

const Species = mongoose.model('Species', speciesSchema, 'birds');

module.exports = {Species};



//observation schema
const observationSchema = mongoose.Schema({
	user: String,
	bird: {
		scientific_name: String,
		common_name: String,
		family: String,
	},
	location: {
		lat: Number,
		lng: Number,
		address: String,
	},
	notes: {
		details: String,
	},
	photos: {
		files: [
			{
				filename: String,
				url: String,
				thumbnail: String,
			}
		]
	},
	obsDate: {type: Date, default: Date.now},
});

observationSchema.methods.serialize = function() {
	const obsDateObj = new Date(this.obsDate);
	return {
		id: this._id,
		userId: this.userId,
		location: this.location,
		notes: this.notes,
		photos: this.photos,
		obsDate: obsDateObj,
	};
}

const Observation = mongoose.model('Observation', observationSchema, 'birds');

module.exports = {Observation};















