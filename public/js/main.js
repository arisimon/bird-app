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



//handle new observation form submission
function handleObservationSubmit() {
    $('#newObservation').submit(function(data) {
        event.preventDefault();
        console.log(data);
        console.log('submitted form');
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
    const url = '/observation' + id;
    $.ajax({
        type: 'DELETE',
        url: url,
        dataType: 'json',
        success: function() {
            location.reload();
        }
    });
}


function getSpeciesImages(query) {
    $.ajax({
            type: 'GET',
            url: 'https://pixabay.com/api/',
            data: {
              key: '9084261-0447f1e8101e2d906983a6377',
              q: 'ostrich',
              image_type: 'photo',
              per_page: 10
            }
        })
        .done(function(data) {
            if (data.length === 0) {
                alert('No results found!');
            }
            $.each(data, function(index, value) {
                $('.results').append(
                    `<p>${data.hits[0].largeImageURL}</p>`)
            })
        })
}

function getSpeciesName() {
    $('.species-btn').click(function(event) {
      console.log('button clicked');
        let query = $('#species-autocomplete').val();
        if (query == '') {
            alert('Please provide a valid input!');
        } else {
            console.log(query);
            getSpeciesImages(query);
        }
    });
}


