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

  });


