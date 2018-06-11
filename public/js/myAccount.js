// IIFE to execute code immediately upon page load 
// All code should be added inside this scope unless it *should not* be executed immediately
// This thing is currently f$%king my ajax calls and I have no idea why 
$(document).ready(function(){

    // This will populate the fields with the user's information. (Still need to add some conditional logic)
    $.get("/api/vendor", function (data, status) {
        console.log(data);
        vendor = data[0];
        $("#firstName").attr("placeholder", vendor.firstName);
        $("#lastName").attr("placeholder", vendor.lastName);
        $("#email").attr("placeholder", vendor.email);
        $("#phone").attr("placeholder", vendor.phone);
        $("#address").attr("placeholder", vendor.address);
        $("#city").attr("placeholder", vendor.city);
        $("#state").find("option").empty().attr("selected", "selected").append(vendor.state);
        $("#zip").attr("placeholder", vendor.zip);
        $("#rates").attr("placeholder", vendor.rate);
    })

    // Initialize tooltip method, for the tooptips set up on "home" & "sign out" buttons
    $('[data-toggle="tooltip"]').tooltip()

    // Listener targeting the edit button that enables/disables personal info fields
    $("#personalEdit").on("click", event => {
        event.preventDefault();

        let attr = $(".personalInput").attr("disabled");

        if (attr === "disabled") {
            $(".personalInput").removeAttr("disabled");
            attr = undefined;
        } else if (attr === undefined) {
            $(".personalInput").attr("disabled", "disabled");
        }
    });

    // Listener targeting the edit button that enables/disables rate field 
    $("#vendorEdit").on("click", event => {
        event.preventDefault();

        let attr = $(".rateInput").attr("disabled");

        if (attr === "disabled") {
            $(".rateInput").removeAttr("disabled");
            attr = undefined;
        } else if (attr === undefined) {
            $(".rateInput").attr("disabled", "disabled");
        }
    })


    // Listener that captures data and hits the api route 
    $("#personalYes").on("click", function (event) {

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

        console.log("The new user is: " + user);


        $.post("/api/vendor", {
            type: "POST",
            data: user
        }).then(() => {
            console.log("User in the DB: " + user)
        })

        // Disable fields 
        $(".personalInput").attr("disabled", "disabled");

    });

    $("#vendorYes").on("click", function (event) {

        event.preventDefault();

        const languages = [];

        $(".language").each(function (index) {
            if ($(this).is(":checked")) {
                languages.push($(this).attr("value"));
            }
        });

        const certs = [];

        $(".cert").each(function (index) {
            if ($(this).is(":checked")) {
                certs.push($(this).attr("value"));
            }
        });

        // Capture vales and build obejct to pass into ajax call
        const user = {
            rate: $("#rates").val().trim(),
            languages: languages.join(", "),
            certificates: certs.join(", "),
        }

        console.log("The new vendor info is: " + JSON.stringify(user));

       $.post("/api/vendor", user, (user) => {
           console.log("New vendor info: " + user); 
       })

        // Disable fields after user selects "yes"
        $(".rateInput").attr("disabled", "disabled");


    });

})



