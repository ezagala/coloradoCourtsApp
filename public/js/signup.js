$(function () {

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
            password: $("#password").val().trim(),
        }

        // Check to see that object was built correctly
        console.log("The new user is: " + JSON.stringify(user));

        // Form validation for blank fields 
        if (user.firstName === "" || user.lastName === "" || user.email === "" || user.password === "") {
            $('#validateModal').modal("show");
            throw new Error("Required fields are blank!");
        } else {
            $('#submitModal').modal("show");
        }
        
        // Hit signup route with user object, this runs the passport strategy
        $.post('/signup', user).then(data => {
            console.log("User has been posted to the DB.")
        });

        // Trigger modal and direct user to my account
        $("#login").on("click", event => {
            event.preventDefault(); 
                window.location.replace('/account')
        })

    })

    // intialize tooltip
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

});