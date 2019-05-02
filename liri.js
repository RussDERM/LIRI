//local config file, GITignored
require('dotenv').config();
//local keys file, GITignored
var keys = require('./keys.js');
// importing paxkages
var spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');
// BEGIN PSUDEOCODE

// Access spotify using the key, following syntax from instructions
// BEGIN FIRST STEP PSUDEOCODE

// Spotify API call
// access spotify API using id+secret
var spotify = new spotify(keys.spotify);

const spotifySearch = (songTitle) => {
  // error catch
  if (songTitle === undefined) {
    songTitle = 'NOTHING'
  }
  // send spotify the query
  spotify.search(
    {
      type: 'track',
      query: songTitle,
    },
    // errorcatch
    (err, data) => {
      if (err) {
        console.log('ERROR : ' + err);
        return;
      }
      // log result
      var song = data;
      console.log(song);

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
var functionPick = (command, input) => {
  switch (command) {
    case 'spotify-this-song':
      spotifySearch(input);
      break;
  }
};