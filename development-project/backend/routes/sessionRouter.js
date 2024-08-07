const express = require('express');

// This is a Router which is responsible for the routes associated with the user session

const router = express.Router();

// If user is authenticated, returns session data
router.get('/', (req, res) => {
  console.log('Session route hit');
  console.log('Is authenticated:', req.isAuthenticated());
  console.log('Session:', JSON.stringify(req.session, null, 2));
  console.log('User:', req.user);
  console.log('Cookies:', req.cookies);
  if (req.isAuthenticated()) {
    res.json({
      isAuthenticated: true,
      user: req.user,
    });
  } else {
    res.status(401).json({
      isAuthenticated: false,
      message: 'User is not authenticated',
    });
  }
});

router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed', error: err });
    }
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'Session destruction failed', error: err });
      }
      res.json({ message: 'Logout successful' });
    });
  });
});

module.exports = router;
