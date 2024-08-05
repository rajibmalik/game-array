const passport = require('../../config/passportConfig');

// This is a controller class for the steamAuthRoutes, it contains
// relevant middleware for Steam authentication

// Middleware initiating authentication with Steam using Passport config
const initiateSteamAuth = passport.authenticate('steam');

// Middleware handling Steam authentication callback
// Upon successful authentication, redirects to '/account' page
exports.steamAuthCallback = (req, res) => {
  passport.authenticate('steam', { failureRedirect: '/' })(req, res, () => {
    console.log('Steam Authentication successful');

    // Send a success response with user data
    res.status(200).json({
      status: 'success',
      message: 'Authentication successful',
      user: req.user,
    });
  });
};

// module.exports = {
//   initiateSteamAuth,
//   steamAuthCallback,
// };
