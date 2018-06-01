'use strict';

const EBIRD_KEY = 'c57cssobo0im';

function handleEventHandlers() {
    handleDeleteBtn();
    handleUpdateBtn();
    handleSpeciesBtn();
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
    let common = $('#commonNameModal').val();
    let scientific = $('#scientificNameModal').val();
    let family = $('#familyNameModal').val();
    let address = $('.locationModal').val();
    let notes = $('#detailsModal').val();
  const url = `/observations/` + id;
    $.ajax({
        type: 'PUT',
        url: url,
        dataType: 'json',
        data: {
            common_name: common,
            scientific_name: scientific,
            family: family,
            address: address,
            notes: notes,
            id: id
        },
        success: function() {
            $('#modalUpdate').unbind('submit');
            location.reload(true);
            console.log('successfully updated');

        }
    });
}

// function autocompleteSpecies() {

//   $("#species-input").autocomplete({
//       source: function (request, response) {
//          $.ajax({
//             url: "/api/species",
//             type: "GET",
//             data: request,  // request is the value of search input
//             success: function (data) {
//               // Map response values to fiedl label and value
//                response($.map(data, function (el) {
//                   return {
//                      label: el.common_name,
//                      value: el._id
//                   };
//                   }));
//                }
//             });
//          },
         
//          // The minimum number of characters a user must type before a search is performed.
//          minLength: 2, 
         
//          // set an onFocus event to show the result on input field when result is focused
//          focus: function (event, ui) { 
//             this.value = ui.item.label; 
//             // Prevent other event from not being execute
//             event.preventDefault();
//          },
//          select: function (event, ui) {
//             // Prevent value from being put in the input:
//             this.value = ui.item.label;
//             // Set the id to the next input hidden field
//             $(this).next("input").val(ui.item.value); 
//             // Prevent other event from not being execute            
//             event.preventDefault();
//             // optionnal: submit the form after field has been filled up
//             // $('#quicksearch').submit();
//          }
//   });
// }

function getSpeciesList(query) {
    $.ajax({
            type: 'GET',
            url: '/api/species',
            dataType: 'json',
            query: query,
            success: function() {
               $('#species-form').unbind('submit'); 
                if (data.length === 0) {
                    alert('No results found!');
                }
                console.log(data);
                console.log(query);
                // $.each(data, function(index, value) {
                  
                // })   
            }
                         
            })
    }
  
// function getSpeciesImages(query) {
//     $.ajax({
//             type: 'GET',
//             url: 'https://api.pexels.com/v1/search/',
//             headers: {'Authorization': '563492ad6f917000010000012109c28850a048168b6a10c5d4e18482'},
//             data: {
//               query: `${query}`,
//               per_page: 30
//             }
//     })
//     .done(function(data) {
//       console.log(data);
//                 if (data.total_results === 0) {
//                     alert('No results found!');
//                 }
//                 $.each(data, function(index, value) {
//                   $('.results').append(
//                         `<img src=${data.photos[0].src.small}>`)
//                 })            
//             })
//     }

  


function handleSpeciesBtn() {
    $('#species-form').on('submit', function(event) {
      event.preventDefault();
      console.log('species search initiated');
        let query = $('#species-input').val();
        if (query == '') {
            alert('Please provide a valid input!');
        } else {
            console.log(query);
            getSpeciesList(query);
        }
    });
}



$(handleEventHandlers);