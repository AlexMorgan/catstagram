// This file will automatically be loaded into our app/views/layouts/application.html.erb
// because of the //= require_tree . statement in our app/assets/javascripts/application.js,
// which automatically requires any Javascript files that we place in our app/assets/javascripts directory.

$(function(){
  $('[data-meow-button="create"]').on('submit', function(e) {
    e.preventDefault();

    $form = $(e.currentTarget);                                   // save the target of the event that is passed into the function

    // Using the $.ajax() function to send a POST request to the URL specified in the action attribute of our targeted form
    $.ajax({
      type: "POST",
      url: $form.attr('action'),                                  // '/posts/:post_id/meows'
      dataType: "json",
      // The status code for success handler is '200' - In the Network tab, we can see that we get a '302' code
      success: function() {
        alert("MEOW"); // This won't work yet!
      }
    });
  });
});
