$(function () {

  $("#common_name").autocomplete({
      source: function (request, response) {
         $.ajax({
            url: "/api/species/",
            type: "GET",
            data: request, 
            success: function (data) {
              // Map response values to field label and value
               response($.map(data, function (query) {
                  return {
                     label: query.common_name,
                     value: query._id
                  };
                  }));
               }
            });
         },
         
         // The minimum number of characters a user must type before a search is performed.
         minLength: 2, 
         
         // set an onFocus event to show the result on input field when result is focused
         focus: function (event, ui) { 
            this.value = ui.item.label; 
            // Prevent other event from not being executed
            event.preventDefault();
         },
         select: function (event, ui) {
            // Prevent value from being put in the input:
            this.value = ui.item.label;
            // Set the id to the next input hidden field
            $(this).next("input").val(ui.item.value); 
            // Prevent other event from not being executed           
            event.preventDefault();

         }
  });

});
