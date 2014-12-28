// This file will automatically be loaded into our app/views/layouts/application.html.erb
// because of the //= require_tree . statement in our app/assets/javascripts/application.js,
// which automatically requires any Javascript files that we place in our app/assets/javascripts directory.

$(function(){
  // Add an event listener to all elements with a data-post-id attribute
  // and listen for elements with a data-meow-button attribute with value 'create'
  // to fire a submit event
  $('[data-post-id]').on('submit', '[data-meow-button="create"]', function(e) {
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


  // Add an event listener to all elements with a data-post-id attribute
  // and listen for elements with a data-meow-button attribute with value 'delete'
  // to fire a submit event
  $('[data-post-id]').on('submit', '[data-meow-button="delete"]', function(event) {
    event.preventDefault();

    $form = $(event.currentTarget);

    $.ajax({
      type: "DELETE",
      url: $form.attr('action'),
      dataType: "json",
      success: function() {
        // Find the parent wrapper div so that we can use its data-post-id
        $post = $form.closest('[data-post-id]');

        // Create the String version of the form action
        action = '/posts/' + $post.data('post-id') + '/meows';

        // Create the new form for creating a Meow
        $newForm = $('<form>').attr({
          action: action,
          method: 'post',
          'data-meow-button': 'create'
        });

        // Create the new submit input
        $meowButton = $('<input>').attr({type: 'submit', value: 'Meow'});

        // Append the new submit input to the new form
        $newForm.append($meowButton);

        // Replace the old create form with the new remove form
        $form.replaceWith($newForm);
        $elMeowCount = $('#meowCount');
      }
    });
  });


  // $('[data-meow-button="create"]').on('submit', function(e) {

  // });

  // $('[data-meow-button="delete"]').on('submit', function(event) {

  // });
});
