$(function () {

    console.log("I'm here");


    // Listener that hits post route to add new user
    $("#signUp").on('click', event => {

        event.preventDefault();

        // Capture vales and build obejct to pass into ajax call
        const user = {
            firstName: $("#firstName").val().trim(),
            lastName: $("#lastName").val().trim(),
            phone: $("#phone").val().trim(),
            address: $("#address").val().trim(),
            city: $("#city").val().trim(),
            state: $("#state").val().trim(),
            zip: $("#zip").val().trim(),
            email: $("#email").val().trim(),
            password: $("#password").val().trim()
        }

        // Check to see that object was built correctly
        console.log("The new user is: " + JSON.stringify(user));

            if (user.firstName === "" || user.lastName === "" || user.email === "" || user.password === "") { 
                $('#validateModal').modal("show");
                throw new Error("Required fields are blank!"); 
            } else {
                $('#submitModal').modal("show");
            }

        // ajax call to post user
        $.post('/signup', user, function (user) {
            console.log('New user', user);
        });

    })

    // intialize tooltip
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

});