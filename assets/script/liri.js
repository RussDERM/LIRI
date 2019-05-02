//local config file, GITignored
require('dotenv').config();
//local keys file, GITignored
var keys = require('./keys.js');
// BEGIN PSUDEOCODE

// Need to require axios for APIs, moment for date/time formatting, and fs for reading/writing

// Access spotify using the key, following syntax from instructions
// BEGIN FIRST STEP PSUDEOCODE
// Spotify API call
// write a function(songTitle) that queries spotify for a song, and returns
// include an error catch 
// grab whatever is coming back, and log it for all to see
// peel the correct data out of there, and sent it to the console
