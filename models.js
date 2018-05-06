'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;



//species schema
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



//observation schema
const observationSchema = mongoose.Schema({
	// userId: {type: String, required: true},
	bird: {
		scientific_name: String,
		common_name: {type: String, required: true},
		family: String,
	},
	location: {
		lat: Number,
		lng: Number,
		address: {type: String, required: true},
	},
	notes: {
		details: {type: String, required: true},
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
	obsDate: {type: Date, default: Date.now, required: true},
});

observationSchema.methods.serialize = function() {
	const obsDateObj = new Date(this.obsDate);
	return {
		id: this._id,
		// userId: this.userId,
		bird: this.bird,
		location: this.location,
		notes: this.notes,
		photos: this.photos,
		obsDate: obsDateObj,
	};
}

const Observation = mongoose.model('Observation', observationSchema, 'observations');

module.exports = {Species, Observation};















