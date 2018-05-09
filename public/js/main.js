'use strict';

const SPECIES_URL = 'species';
const OBSERVATION_URL = 'observations';
const EBIRD_KEY = 'c57cssobo0im';


function getObservations(callback) {
  // getJSON call to get posts
  $.getJSON('/observations', function(data) {
    callbackFn(data)
  })
}

