// IIFE to execute code immediately upon page load 
// All code should be added inside this scope unless it *should not* be executed immediately
// This thing is currently f$%king my ajax calls and I have no idea why 
$(function() {

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
    });

    // Button click targeting the edit button that enables rate field 
    $("#vendorEdit").on("click", event => {
        event.preventDefault(); 

        let attr = $(".rateInput").attr("disabled");
            
        if (attr === "disabled") {
         $(".rateInput").removeAttr("disabled");
         attr = undefined; 
        } else if (attr === undefined){
            $(".rateInput").attr("disabled", "disabled");
        }
    })
    
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

        $.ajax("/api/vendor", {
            type: "PUT",
            data: user
        }).then( () => {
            console.log("User in the DB: " + user)
        })

    });

    //Button click targeting the edit button enables languages boxes
    $("#languageEdit").on("click", event => {
        event.preventDefault(); 

        let attr = $(".language").attr("disabled");
            
        if (attr === "disabled") {
         $(".language").removeAttr("disabled");
         attr = undefined; 
        } else if (attr === undefined){
            $(".language").attr("disabled", "disabled");
        }

        // Check to see that object was built correctly
        console.log("The new user is: " + JSON.stringify(user)); 

    })

    //Button click targeting the edit button enables certificate boxes
    $("#certificateEdit").on("click", event => {
        event.preventDefault(); 

        let attr = $(".cert").attr("disabled");
            
        if (attr === "disabled") {
         $(".cert").removeAttr("disabled");
         attr = undefined; 
        } else if (attr === undefined){
            $(".cert").attr("disabled", "disabled");
        }
    });

})
