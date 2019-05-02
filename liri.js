//local config file, GITignored
require('dotenv').config();
//local keys file, GITignored
var keys = require('./keys.js');
// importing paxkages
var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');
// BEGIN PSUDEOCODE

// Access spotify using the key, following syntax from instructions
// BEGIN FIRST STEP PSUDEOCODE

// Spotify API call
// access spotify API using id+secret
var spotify = new Spotify(keys.spotify);

var spotifySearch = (songTitle) => {
  // error catch
  if (songTitle === undefined) {
    songTitle = 'NOTHING'
  }
  // send spotify the query
  spotify.search(
    {
      type: 'track',
      query: songTitle,
      limit: 5
    },
    // errorcatch
    (err, data) => {
      if (err) {
        console.log('ERROR : ' + err);
        return;
      }
      // log result
      var songs = data.tracks.items;
      console.log(songs);

      // Begin Psudeo for logging Spotify Data to console
      // Because spotify returns so many songs, I will limit the response to 5, and then loop through the data 

    }
  );
}
// write a function(songTitle) that queries spotify for a song, and returns
// include an error catch 
// grab whatever is coming back, and log it for all to see
// peel the correct data out of there, and sent it to the console


// BEGIN P.S. for switchcase and run method
// Need to build a switch case (as mentioned by Rob) that will run the correct function based off of input
// This will require a run function that takes two arguments, first being the case, and the second being the query
// Then, initialize the process with argv 2, and then argv 3 sliced and joined

// functionPick will take two arguments, one to tell LIRI what to do, the second being the query data
var functionPick = (command, query) => {
  switch (command) {
    case 'spotify-this-song':
      spotifySearch(query);
      break;
  }
};

// Main function, to initialize LIRI, passes formatted arguments to switch case
var initializeLIRI = (arg1, arg2) => {
  functionPick(arg1, arg2);
}
// Initialization, capture .argv input and format correctly
initializeLIRI(process.argv[2], process.argv.slice(3).join(' '));

// Begin Psudecode
// This function will need to take index 2 and 3 from process.argv, and deliver it to the switch case in the correct format
// .argv[2] needs no formatting, lucky for us
// .argv[3] might not be the entire query, due to spaces. Will need to slice from 3 on, and join on the space
