require("dotenv").config();
var keys = require("keys.js");
    Twitter = require('twitter');
    Spotify = require('node-spotify-api');
    request = require('request');
    fs = require('fs');

//access information from keys.js
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2]; //this is what we want LIRI to do
var search = process.argv[3]; //this is what LIRI needs for doing whatever it was told to do.
console.log("my dude is whating to :" + action+' '+search); //to see if im logging everything right, my dude


switch (action) {
    case 'my-tweets':

        //This will show your last

        //20 tweets and when they were created at in your terminal/bash window.
        break;
    case 'spotify-this-song':
        
        // This will show the following information about the song in your terminal/bash window

        // Artist(s)

        // The song's name

        // A preview link of the song from Spotify

        // The album that the song is from

        // If no song is provided then your program will default to "The Sign" by Ace of Base.
        //         
        break;
    case 'movie-this':
        //stuff goes here
        break;
    case 'do-what-it-says':
        //stuff goes here
        break;
}
