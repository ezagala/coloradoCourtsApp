// Dependencies
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const keys = require("./config/keys");
let token = require("./config/token").token;

// Load client secrets from a local file.
try {
    const content = keys.google
    authorize(content, listEvents);
} catch (err) {
    return console.log('Error loading client secret file:', err);
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 * @return {function} if error in reading credentials.json asks for a new one.
 */
function authorize(credentials, callback) {
    const { clientSecret, clientId, redirectUri } = credentials;
    const oAuth2Client = new google.auth.OAuth2(
        clientId, clientSecret, redirectUri);

    oAuth2Client.setCredentials(token);
    callback(oAuth2Client);
}

// collate event info
var event = {
    'summary': "test",
    'location': "907 Foxcroft Ln.",
    'description': "test event description",
    'start': {
        'dateTime': '2015-05-28T09:00:00-07:00',
        'timeZone': 'America/Denver',
    },
    'end': {
        'dateTime': '2015-05-28T17:00:00-07:00',
        'timeZone': 'America/Denver',
    },
    'recurrence': [
        'RRULE:FREQ=DAILY;COUNT=2'
    ],
    'attendees': [
        { 'email': 'lpage@example.com' },
        { 'email': 'sbrin@example.com' },
    ],
};


function listEvents(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, {data}) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = data.items;
    if (events.length) {
      console.log('Upcoming 10 events:');
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    } else {
      console.log('No upcoming events found.');
    }
  });
}

// Method that creates the event on the users calendar 
// calendar.events.insert({
//     auth: auth,
//     calendarId: 'primary',
//     resource: event,
// }, function (err, event) {
//     if (err) {
//         console.log('There was an error contacting the Calendar service: ' + err);
//         return;
//     }
//     console.log('Event created: %s', event.htmlLink);
// });
