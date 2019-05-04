//local config file, GITignored
require('dotenv').config();
//local keys file, GITignored
var keys = require('./keys.js');
// importing paxkages
var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');
// globals
const divider = '\n----------------------------\n'
const dividerSmall = '----------------------------'

// concert searching function
var concertSearch = (artist) => {
  // no data?
  if (!artist.length) {
    console.log('-----------------------------------------------------------------------------');
    console.log('LIRI : You did not specify which musician(s) you would like me to search for.');
    console.log('-----------------------------------------------------------------------------');
    return;
  }
  //
  var bandURL = 'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp';
  axios.get(bandURL).then(function (response) {
    var showData = response.data;
    console.log();
    console.log('\nLIRI : Here are your concert results: ');
    console.log(dividerSmall);
    for (let i = 0; i < showData.length; i++) {
      const element = showData[i];
      const indexer = i + 1;
      console.log(dividerSmall);
      console.log('Show #' + indexer + ' -');
      console.log('Venue: ' + element.venue.name);
      // log city if region is not an option
      console.log('Location: ' + element.venue.city + ', ' + (element.venue.region || element.venue.country));
      console.log('Date: ' + moment(element.datetime).format('MM/DD/YYY'));
      console.log(dividerSmall);
    }



  })

}

// movie searching function
var movieSearch = (movieTitle) => {
  // error catch
  if (!movieTitle.length) {
    // no data response
    // no divider var, for custom length
    console.log('-----------------------------------------------------------------------');
    console.log('LIRI : You did not specify which movie you would like me to search for.');
    console.log('-----------------------------------------------------------------------');
    return;
  }
  // API URL
  var movieURL = 'http://www.omdbapi.com/?t=' + movieTitle + '&y=&plot=short&apikey=trilogy';

  axios
    .get(movieURL)
    .then(function (response) {
      var data = response.data;
      // pull out the ratings into its own array, to access later
      var ratings = data.Ratings
      // pull langages into array, to access later
      var languages = data.Language.split(', ');
      // Paul Bunyan
      console.log('\nLIRI : Here are your movie results: ');
      console.log(divider);
      console.log('Movie: ' + data.Title);
      console.log('Year: ' + data.Year);
      console.log('IMDB Rating: ' + data.imdbRating + ' out of 10');
      console.log('Rotten Tomatoes Rating: ' + ratings[1].Value);
      console.log('Made in: ' + data.Country);
      // Should log the first langage listed, which will be the primary language
      console.log('Primary Language: ' + languages[0]);
      // loop through remaining languages, only if they are present
      if (languages.length === 1) {
      } else {
        console.log('Other Languages Include:');
        for (let i = 1; i < languages.length; i++) {
          console.log(' -' + languages[i]);
        }
      }
      console.log('Plot Summary: ' + data.Plot);
      console.log('Actors: ' + data.Actors);
      console.log(divider);
    })

}

// Access spotify using the key, following syntax from instructions

// Spotify API call
// access spotify API using id+secret
var spotify = new Spotify(keys.spotify);

// helper function for grabbing artist name, since it is in it's own array
var artistName = (artist) => {
  //pass in artist, will return artist.name
  return artist.name;
}

var spotifySearch = (songTitle) => {
  // error catch
  if (!songTitle.length) {
    // no divider var, for custom length
    console.log('----------------------------------------------------------------------');
    console.log('LIRI : You did not specify which song you would like me to search for.');
    console.log('----------------------------------------------------------------------');
    return;
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
      // Begin Psudeo for logging Spotify Data to console
      // Because spotify returns so many songs, I will limit the response to 5, and then loop through the data 
      // in order to get the artist name while still looping, a helper function will be passed to .map(callback)
      // Liri 
      console.log('\nLIRI : Here are your song results: ');
      console.log(dividerSmall);

      for (let i = 0; i < songs.length; i++) {
        // starts logging at 1 instead of zero, for a cleaner console.
        var indexer = i + 1;
        console.log('- ' + indexer + ' -');
        console.log(dividerSmall);
        console.log('Artist: ', songs[i].artists.map(artistName));
        console.log('Song Link: ', songs[i].preview_url);
        console.log('Album: ', songs[i].album.name);
        console.log(dividerSmall);

      }
    }
  );
}


// functionPick will take two arguments, one to tell LIRI what to do, the second being the query data
var functionPick = (command, query) => {
  switch (command) {
    case 'spotify-this-song':
      spotifySearch(query);
      break;
    case 'movie-this':
      movieSearch(query);
      break;
    case 'concert-this':
      concertSearch(query);
      break;
    default:
      console.log('----------------------------------------------------------------');
      console.log('LIRI : You did not specify what you would like me to search for.');
      console.log('----------------------------------------------------------------');
  };

};

// Main function, to initialize LIRI, passes formatted arguments to switch case
var initializeLIRI = (arg1, arg2) => {
  functionPick(arg1, arg2);
}
// Initialization, capture .argv input and format correctly
initializeLIRI(process.argv[2], process.argv.slice(3).join(' '));
