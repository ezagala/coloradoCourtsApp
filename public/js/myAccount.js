// IIFE to execute code immediately upon page load 
// All code should be added inside this scope unless it *should not* be executed immediately
$(function () {

    // Initialize tooltip method, for the tooptips set up on "home" & "sign out" buttons
    $('[data-toggle="tooltip"]').tooltip()

    // Button click targeting the edit button that enables fields so that the user may change them.
    $("#signUp").on("click", event => {
        event.preventDefault(); 

        let attr = $("input").attr("disabled");
            
        if (attr === "disabled") {
         $("input").removeAttr("disabled");
         attr = undefined; 
        } else if (attr === undefined){
            $("input").attr("disabled", "disabled");
        }
    })

  });


