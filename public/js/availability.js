// IIFE to execute code immediately upon page load 
// All code should be added inside this scope unless it *should not* be executed immediately
$(function () {


    console.log("I'm here.")

    // Initialize tooltip method, for the tooptips set up on "home" & "sign out" buttons
    $('[data-toggle="tooltip"]').tooltip();

    // Button event that will git the calendar api
    $('#createEventbutton').on('click', event => {
        event.preventDefault(); 

        // collate event info
        var event = {
            'summary': $('#title').val().trim(),
            'location':  $('#address').val().trim(),
            'description': $('#description').val().trim(),
            'start': {
              'dateTime': $('#').val().trim(),
              'timeZone': 'America/Denver',
            },
            'end': {
              'dateTime': $('#').val().trim(),
              'timeZone': 'America/Denver',
            },
            'recurrence': [
              'RRULE:FREQ=DAILY;COUNT=2'
            ],
            'attendees': [
              {'email': 'lpage@example.com'},
              {'email': 'sbrin@example.com'},
            ],
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10},
              ],
            },
          };

        // Method that creates the event on the users calendar 
        calendar.events.insert({
            auth: auth,
            calendarId: 'primary',
            resource: event,
          }, function(err, event) {
            if (err) {
              console.log('There was an error contacting the Calendar service: ' + err);
              return;
            }
            console.log('Event created: %s', event.htmlLink);
          });

    })

    

}); 