// IIFE to execute code immediately upon page load 
$(document).ready(function () {

    const user = {};

    // This will populate the fields with the user's information
    // (Also, this is suuuuuper hacky)
    $.get("/api/vendor", function (data, status) {
        // View data 
        console.log(data);
        // 
        const vendor = data[0];
        // Need to capture this to send with any info that is updated on the personal/vendor forms
        user.email = vendor.email;
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


    // Enable/disable personal info fields
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

    // Enable/disable rate field 
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


    // Capture data and hit the api route 
    $("#personalYes").on("click", function (event) {

        event.preventDefault();

        // Loop through form inputs
        $(".personalInput").each(function (element) {
            // Check to see if the input is empty 
            if ($(this).val() === "") {
                console.log("No new value to input.")
            } else {
                // Update the user object if info has been provided 
                switch ($(this).attr("id")) {
                    case "firstName":
                        user.firstName = $(this).val();
                        break;
                    case "lastName":
                        user.lastName = $(this).val();
                        break;
                    case "phone":
                        user.phone = $(this).val();
                        break;
                    case "address":
                        user.address = $(this).val();
                        break;
                    case "city":
                        user.city = $(this).val();
                        break;
                    case "state":
                        user.state = $(this).val();
                        break;
                    case "zip":
                        user.zip = $(this).val();
                        break;
                    default:
                        console.log("No new user information added.")
                }
            }
        });

        // Log the updated user
        console.log("The new user is: " + JSON.stringify(user));

        // Make the ajax call 
        $.ajax("/api/vendor/" + user.email, {
            type: "PUT",
            data: user
        }).then(() => {
            console.log("User in the DB: " + user)
        })

        // Disable fields 
        $(".personalInput").attr("disabled", "disabled");

    });

    $("#vendorYes").on("click", function (event) {

        event.preventDefault();

        // Loop through language inputs and build an array with the selected values
        const languages = [];

        $(".language").each(function (index) {
            if ($(this).is(":checked")) {
                languages.push($(this).attr("value"));
            }
        });

        // Loop through cert inputs and build an array with the selected values
        const certs = [];

        $(".cert").each(function (index) {
            if ($(this).is(":checked")) {
                certs.push($(this).attr("value"));
            }
        });

        // Capture vales and build obejct to pass into ajax call
        user.rate = $("#rates").val().trim();
        user.languages = languages.join(", ");
        user.certificates = certs.join(", ");

        console.log("The new vendor info is: " + JSON.stringify(user));

        // Make the ajax call 
        $.ajax("/api/vendor/" + user.email, {
            type: "PUT",
            data: user
        }).then(() => {
            console.log("User in the DB: " + JSON.stringify(user))
        })

        // Disable fields after user selects "yes"
        $(".rateInput").attr("disabled", "disabled");

    });

    // Initialize tooltip method, for the tooptips set up on "home" & "sign out" buttons
    $('[data-toggle="tooltip"]').tooltip()

})



