console.log('login.js');

$("#login-btn").on("click", function(e) {
  e.preventDefault();

// oldwMember object
    let user = {
      email: $("#email").val().trim(),
      password: $("#password").val().trim()
    };

  // Send an AJAX POST-request with jQuery
  $.post("/login", user)
    // On success, run the following code
    .then(function(data) {
      console.log('data', data);
      // Log the data we found
      //window.location.replace("/vote?email=" + data)
    });

  // Empty each input box by replacing the value with an empty string
  $("#email").val("");
  $("#password").val("");

});