const SPECIES_URL = 'species';
const OBSERVATION_URL = 'observations';
const EBIRD_KEY = 'c57cssobo0im';


$('#start-button').submit(function() {
    ('.input-form').html(`
    	<form action="/species" method="GET">
		<label for="name">Species</label><br /> 
		<input name="species" type="text" value="Flamingo"> <br>  
		<button type="submit" value="Submit">Submit</button>
		</form>`)
})



// function getObservations() {
//     $.ajax({
//         url: OBSERVATION_URL,
//         type: 'GET',
//         dataType: 'json',

//     }).done(function(data) {
//         console.log(data);
//     })
// }


function getSpecies(data) {
	$.ajax({
		url: SPECIES_URL,
		type: 'GET',
		dataType: 'json',
	}).done(function(data) {
		console.log(data);
	})
}