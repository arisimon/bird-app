'use strict';

const SPECIES_URL = '/species';
const OBSERVATION_URL = '/observations';
const EBIRD_KEY = 'c57cssobo0im';


function getObservations(callback) {
  // getJSON call to get observations
  $.getJSON('/observations', function(data) {
    callback(data)
    console.log('called observation API');
  })
}


function showObservations(data) {
  console.log('data:', data);
  for (let index in data) {
    const showObservation = $(`<p> ${data.bird.scientific_name} </p>`);
  $('.observations-container').append(showObservation);
  console.log(data.bird);
  }
}

function getShowObservations() {


}

function handleStart() {
	$('.start-button').on('click', function() {
		  getObservations(showObservations);
		  console.log('started API call');
	});
}

