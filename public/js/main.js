'use strict';

const EBIRD_KEY = 'c57cssobo0im';

function handleEventHandlers() {
    handleDelete();
    handleUpdate();
    // handleSpeciesButton();
}




//-----------------  DELETE -------------------------
//handle delete button event
function handleDelete() {
    $('.deleteBtn').on('click', function(event) {
        console.log('Delete button clicked');
        const deleteId = $('#observation-box').attr('data-id');
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
function handleUpdate() {
    $('.updateBtn').on('click', function(event) {
        console.log('update button clicked');
        const updateId = $('#observation-box').attr('data-id');
        console.log(updateId);
        
    })
}

function updateObservation(id) {
  const url = `/observations/${id}`;
    $.ajax({
        type: 'PUT',
        url: url,
        dataType: 'json',
        success: function() {
            location.reload();
        }
    });
}


// function getSpeciesImages(query) {
//     $.ajax({
//             type: 'GET',
//             url: 'https://api.pexels.com/v1/search',
//             headers: {'Authorization': '563492ad6f917000010000012109c28850a048168b6a10c5d4e18482'},
//             data: {
//               query: query,
//               per_page: 15
//             }
//     })
//     .done(function(data) {
//                 if (data.length === 0) {
//                     alert('No results found!');
//                 }            
//                 $.each(data, function(index, value) {
//                     $('.results').html(
//                         `<p>${data.photos[0].src.small}</p>`)
//                 })
//             })
//     }



// function handleSpeciesButton() {
//     $('#species-form').on('submit', function(event) {
//       console.log('species search initiated');
//         let query = $('#species-input').val();
//         console.log(query);
//         if (query == '') {
//             alert('Please provide a valid input!');
//         } else {
//             console.log(query);
//             getSpeciesImages(query);
//         }
//     });
// }



$(handleEventHandlers);