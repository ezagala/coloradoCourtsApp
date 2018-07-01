// IIFE to execute code immediately upon page load 
$(function () {


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

    })

    
    // Initialize tooltip method, for the tooptips set up on "home" & "sign out" buttons
    $('[data-toggle="tooltip"]').tooltip();

}); 