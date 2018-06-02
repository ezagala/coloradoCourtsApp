// $(function(){

// console.log("I'm here")


//     // Listener that hits post route to add new user
//     $("#signUp").on('click', event => {

//         event.preventDefault();

//         console.log("I'm here again")

//         // Capture vales and build obejct to pass into ajax call
//         const user = {
//             firstName: $("#firstName").val().trim(), 
//             lastName: $("#lastName").val().trim(), 
//             phone: $("#phone").val().trim(),
//             address: $("#address").val().trim(),
//             city: $("#city").val().trim(), 
//             state: $("#state").val().trim(), 
//             zip: $("#zip").val().trim(),
//             email: $("#email").val().trim(), 
//             password: $("#password").val().trim()
//         }

//         // Check to see that object was built correctly
//         console.log("The new user is: " + JSON.stringify(user)); 
        
//         // Make ajax call 
//         $.ajax({
//             method: "POST",
//             url: "/api/vendor",
//             data: user, 
//         }).then( () => {
//             // Confirm that newUser was posted
//             console.log("Posted new user: " + user)  
//         })
        
//     })

//     // intialize tooltip
//     $(function () {
//         $('[data-toggle="tooltip"]').tooltip()
//       })

// })