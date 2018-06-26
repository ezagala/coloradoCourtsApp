$(function () {



    // Listener that hits post route to add new user
    $("#signUp").on('click', event => {

        event.preventDefault();

        const creds = {
            email: $("#email").val().trim(),
            password: $("#password").val().trim()
        }

        // Capture vales and build obejct to pass into ajax call
        const user = {
            email: $("#email").val().trim(),
            password: $("#password").val().trim(),
            firstName: $("#firstName").val().trim(),
            lastName: $("#lastName").val().trim(),
            phone: $("#phone").val().trim(),
            address: $("#address").val().trim(),
            city: $("#city").val().trim(),
            state: $("#state").val().trim(),
            zip: $("#zip").val().trim(),
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
            window.location.replace('/account')
        });

        // $("#login").on("click", event => {
        //     event.preventDefault();
        //     // ajax call to post user
        //     $.post('/signup', creds).then(data => {
        //         //     console.log("The data posted is" + data);
        //         // $.ajax({
        //         //     url: "/api/vendor/" + creds.email,
        //         //     type: 'PUT',
        //         //     data: {
        //         //         firstName: user.firstName,
        //         //         lastName: user.lastName,
        //         //         phone: user.phone,
        //         //         address: user.address,
        //         //         city: user.city,
        //         //         state: user.state,
        //         //         zip: user.zip
        //         //     },
        //         //     success: res => {
        //         //         console.log("Vendor updated in nested call")
        //         //         // window.location.replace("/account");
        //         //     }
        //         // })
        //     });

        // })

    })

    console.log("I'm here");

    // intialize tooltip
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

});