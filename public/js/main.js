'use strict';

const EBIRD_KEY = 'c57cssobo0im';

function handleEventHandlers() {
    handleDeleteBtn();
    handleUpdateBtn();
    handleModalUpdate();
    handleSpeciesButton();
}




//-----------------  DELETE -------------------------
//handle delete button event
function handleDeleteBtn() {
    $('.deleteBtn').on('click', function(event) {
        console.log('Delete button clicked');
        const deleteId = $(this).closest('#observation-box').attr('data-id');
        deleteObservation(deleteId);

    });
}

//make delete request
function deleteObservation(id) {
    const url = `/observations/${id}`;
    $.ajax({
        type: 'DELETE',
        url: url,
        dataType: 'json',
        success: function() {
            location.reload();
        }
    });
}


//-----------------  PUT -------------------------
//handle update button event
function handleUpdateBtn() {
    $('.updateBtn').on('click', function(event) {
        console.log('update button clicked');
        const updateId = $(this).closest('#observation-box').attr('data-id');

        let common = $(this).closest('#observation-box').find('#common-dynamic').text();
        let scientific = $(this).closest('#observation-box').find('#scientific-dynamic').text();
        let family = $(this).closest('#observation-box').find('#family-dynamic').text();
        let location = $(this).closest('#observation-box').find('#location-dynamic').text();
        let details = $(this).closest('#observation-box').find('#details-dynamic').text();
        $('#commonNameModal').val(common);
        $('#scientificNameModal').val(scientific);
        $('#familyNameModal').val(family);
        $('.locationModal').val(location);
        $('#detailsModal').val(details);
        handleModalUpdate(updateId);
    })
}

function handleModalUpdate(id) {
  $('#modalUpdate').submit(function(event) {
    console.log(id);
    event.preventDefault();
        updateObservation(id);
      })
}

function updateObservation(id) {
  const url = `/observations/` + id;
    $.ajax({
        type: 'PUT',
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
            url: 'https://api.pexels.com/v1/search/',
            headers: {'Authorization': '563492ad6f917000010000012109c28850a048168b6a10c5d4e18482'},
            data: {
              query: `${query}`,
              per_page: 30
            }
    })
    .done(function(data) {
      console.log(data);
                if (data.length === 0) {
                    alert('No results found!');
                }
                $.each(data, function(index, value) {
                  // $('.results').append(
                  //       `<img src=${data.photos[i].src.small}>`)
                })            
            })
    }



function handleSpeciesButton() {
    $('#species-form').on('submit', function(event) {
      event.preventDefault();
      console.log('species search initiated');
        let query = $('#species-input').val();
        if (query == '') {
            alert('Please provide a valid input!');
        } else {
            console.log(query);
            getSpeciesImages(query);
        }
    });
}



$(handleEventHandlers);