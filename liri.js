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

if (process.argv.length >= 4) {
    for (i = 4; i < process.argv.length; i++) {
        search += '+' + process.argv[i];
    }
}

console.log("my dude is waiting to :" + action + ' ' + search); //to see if im logging everything right, my dude

switch (action) {
    case 'my-tweets':

        tweet();
        break;

    case 'spotify-this-song':

        spot(search);
        break;

    case 'movie-this':
        moob(search);
        break;

    case 'do-what-it-says':
        doIt();
        break;
}

function spot(song) {
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log("this finna load");
        // console.log(data.tracks.items); //<<way too much stuff to go through
        for (var prop in data.tracks.items) {
            console.log(" ")
            console.log("********AIGHT FAM WE GOT************")
            console.log(" ")
            //too much object manuveuring for me, but it works
            console.log(data.tracks.items[prop].album.artists[0].name);
            console.log("Who plays : " + data.tracks.items[prop].name);
            console.log("listen to this bop here: " + data.tracks.items[prop].preview_url);
            console.log("From the album : " + data.tracks.items[prop].album.name);
            console.log(" ")
        }
    });
}
function doIt() {
    console.log("============================");
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        var dothis = data.split(",");
        spot(dothis[1]);
        console.log(data);
        //here's where my function to run spotify for text
    })

}

function moob(video) {
    console.log("=============MOVIE===============");

    request("http://www.omdbapi.com/?t=" + video + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            film = JSON.parse(body);//cleans up the lines and code(idk i think i need it)
            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
            // console.log(film);
            console.log("Title : " + film.Title);
            console.log(" ");
            console.log("Year : " + film.Year);
            console.log(" ");
            console.log("imdbRating : " + film.imdbRating);
            console.log(" ");
            console.log("Country : " + film.Country);
            console.log(" ");
            console.log("Language : " + film.Language);
            console.log(" ");
            console.log("Plot : " + film.Plot);
            console.log(" ");
            console.log("Actors : " + film.Actors);
            console.log(" ");
            if (film.Ratings[1].Value != undefined) {

                console.log("Rotten Tomato score is: " + film.Ratings[1].Value);
            }
            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
        }
    });

}

function tweet() {
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
}