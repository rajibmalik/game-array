const passport = require('passport');
const User = require('../models/userModel');
const SteamStrategy = require('passport-steam').Strategy;
require('dotenv').config();

// This is the configuration for Passport, which uses the SteamStrategy.

// returnURL: where Steam redirects user after authentication
// realm: URL for valid authentication purposes
// apiKey: Steam API key, fetched using env

// identifier: id provided by steam
// profile: contains user information
// done: callback function, called upon completion of authentication
passport.use(
  // SteamStrategy passes identifier, profile and done to the anonymous callback function
  new SteamStrategy(
    {
      returnURL: 'https://game-array.onrender.com/auth/steam/callback',
      realm: 'https://game-array.onrender.com',
      apiKey: process.env.STEAM_API_KEY,
    },
    (identifier, profile, done) => {
      console.log('passport config:');
      if (identifier) {
        console.log(identifier);
      }

      if (profile) {
        console.log(profile);
      }

      // Creates user object, this will be stored in session
      const user = {
        steamID: profile.id,
        username: profile.displayName,
      };

      console.log(`User: ${User}`);
      console.log(`steamID: ${User.steamID}`);
      console.log(`username: ${User.username}`);

      return done(null, user);
    },
  ),
);

// Serialize user into the session
passport.serializeUser(function (user, done) {
  done(null, user);
});

// Deserialize user from the session
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

module.exports = passport;
