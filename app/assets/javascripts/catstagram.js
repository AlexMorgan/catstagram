// This file will automatically be loaded into our app/views/layouts/application.html.erb
// because of the //= require_tree . statement in our app/assets/javascripts/application.js,
// which automatically requires any Javascript files that we place in our app/assets/javascripts directory.

$(function(){
  // $('[data-post-id]').on('submit', '[data-meow-button="create"]', function(event) {
  //   // omitted
  // });

  $('[data-meow-button="create"]').on('submit', function(e) {
    e.preventDefault();

    $form = $(e.currentTarget);                                   // save the target of the event that is passed into the function

    // Using the $.ajax() function to send a POST request to the URL specified in the action attribute of our targeted form
    $.ajax({
      type: "POST",
      url: $form.attr('action'),                                  // '/posts/:post_id/meows'
      dataType: "json",
      // The status code for success handler is '200' - In the Network tab, we can see that we get a '302' code
      success: function(meow) {
        // You can use Javascript's built in pry-like debugger by adding a debugger
        // statement like in example above and clicking on the "Meow" button while your Chrome Developer Tools console is open
        // debugger;

        // Create the String version of the form action
        action = '/posts/' + meow.post_id + '/meows/'+ meow.id;

        // Create the new form
        $newForm = $('<form>').attr({
          action: action,
          method: 'delete',
          'data-meow-button': 'delete'
        });

        // Create the new submit input
        $meowButton = $('<input>').attr({type: 'submit', value: 'Remove Meow'});

        // Append the new submit input to the new form
        $newForm.append($meowButton);

        // Replace the old create form with the new remove form
        $form.replaceWith($newForm);
      }
    });
  });

  $('[data-meow-button="delete"]').on('submit', function(event) {
    event.preventDefault();

    $form = $(event.currentTarget);

    $.ajax({
      type: "DELETE",
      url: $form.attr('action'),
      dataType: "json",
      success: function() {
        alert('MEOW DELETED!');
      }
    });
  });
});
