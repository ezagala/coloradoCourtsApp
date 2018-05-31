// IIFE to execute code immediately upon page load 
// All code should be added inside this scope unless it *should not* be executed immediately
$(function () {

    // Initialize tooltip method, for the tooptips set up on "home" & "sign out" buttons
    $('[data-toggle="tooltip"]').tooltip()

    // Button click targeting the edit button that enables personal info fields
    $("#personalEdit").on("click", event => {
        event.preventDefault(); 

        let attr = $(".personalInput").attr("disabled");
            
        if (attr === "disabled") {
         $(".personalInput").removeAttr("disabled");
         attr = undefined; 
        } else if (attr === undefined){
            $(".personalInput").attr("disabled", "disabled");
        }
    })

    // Button click targeting the edit button that enables rate field 
    $("#rateEdit").on("click", event => {
        event.preventDefault(); 

        let attr = $("#rates").attr("disabled");
            
        if (attr === "disabled") {
         $("#rates").removeAttr("disabled");
         attr = undefined; 
        } else if (attr === undefined){
            $("#rates").attr("disabled", "disabled");
        }
    })
    
    $("#yes").on("click", event => {

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

        // Make ajax call 
         $.ajax({
            method: "PUT",
            url: "/api/vendor",
            data: user, 
        }).then( () => {
            // Confirm that newUser was posted
            console.log("Posted new user: " + user)  
        })

    })

  });


// Redundant alert code
// This creates an alert if the fields in the Personal Information area is empty
    // $("#savePiButton").on("click", event => {
    //     event.preventDefault(); 

    //     var name = $.trim($(".personalInput").val());
    //     if (name === "") {
    //         alert ("Text field should not be empty");
    //         return false;
    //     }
    // });

    // // This creates an alert if the fields in the "Rate per hour" is empty
    // $("#saveRateButton").on("click", event => {
    //     event.preventDefault(); 

    //     var name = $.trim($("#rates").val());
    //     if (name === "") {
    //         alert ("Text field should not be empty");
    //         return false;
    //     }
    // });