'use strict';

const UNSPLASH_URL = 'https://api.unsplash.com/search/photos';
const UNSPLASH_KEY = 'ff10bdfdc2146ab741e32044b3350178815cdffcb6ed4ebda1ab0d2bebee2dbb'
const EBIRD_KEY = 'c57cssobo0im';


function getObservations(callback) {
  // getJSON call to get observations
  $.getJSON('/observations', function(data) {
    callback(data)
    console.log('called observation API');
  })
}

//handle the start button on landing page
function handleStart() {
	$('.start-button').on('click', function() {
		  getObservations(showObservations);
		  console.log('started API call');
	});
};


//convert form to JSON
function formToJSON() {
  $('form').serializeJSON();
};

//handle new observation form submission
function handleObservationSubmit() {
  $('#newObservation').submit(function(data) {
    event.preventDefault();
    formToJSON(data);
    console.log(data);
  });
}


function handleDelete() {
  $('observation-card').on('click', '#deleteBtn', function() {
    event.preventDefault();
    console.log('Delete button clicked');
    const deleteId = $(this).closest('observation-card').find().text();
    deleteObservation(deleteId);

  });
}

function deleteObservation(id) {
  const url = '/observation'+id;
  $.ajax({
    type: 'DELETE',
    url: url,
    dataType: 'json',
    success: function() {
      location.reload();
    }
  });
}

















