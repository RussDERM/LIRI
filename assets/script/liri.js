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

var spotifySearch = function (songTitle) {
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
    function (err, data) {
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
