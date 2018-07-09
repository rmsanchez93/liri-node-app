require("dotenv").config();
var keys = require('./keys.js');
var Twitter = require('Twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

//access information from keys.js
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2]; //this is what we want LIRI to do
var search = process.argv[3]; //this is what LIRI needs for doing whatever it was told to do.
console.log("my dude is waiting to :" + action + ' ' + search); //to see if im logging everything right, my dude


switch (action) {
    case 'my-tweets':

        // console.log("============================"); of course these won't work because its async af

        client.get('statuses/user_timeline', { screen_name: "Raul_MatSan", count: 20 }, function (error, tweets, response) {
            if (error) throw error;

            for (var prop in tweets) { //loops through my 20 tweets
                console.log("==============================");//<<<<< THIS will work in time with my pulling from twitter
                console.log(tweets[prop].text);
                console.log(tweets[prop].created_at);
                console.log("==============================");

            }

        });
        // console.log("============================");


        break;

    case 'spotify-this-song':

        spotify.search({ type: 'track', query: `${search}`}, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            console.log("this finna load");
            // console.log(data.tracks.items); <<way too much stuff to go through
            for(var prop in data.tracks.items){
                console.log("********************")
                console.log(data.tracks.items[prop].name);
                console.log(data.tracks.items[prop].album.artists[0].name);
            }
            // Do something with 'data'
        });

        // This will show the following information about the song in your terminal/bash window

        // Artist(s)

        // The song's name

        // A preview link of the song from Spotify

        // The album that the song is from

        // If no song is provided then your program will default to "The Sign" by Ace of Base.
        //         
        break;
    case 'movie-this':
        console.log("============================");

        console.log("=====MOVIE THIS " + search + "=====");

        console.log("============================");
        //stuff goes here
        break;
    case 'do-what-it-says':
        console.log("============================");

        console.log("=====do what it says " + search + "=====");

        console.log("============================");
        //stuff goes here
        break;
}
