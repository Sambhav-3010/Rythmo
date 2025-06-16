const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/userController');
const verifySession = require('../middleware/auth');

router.post('/signup', userController.signup);
router.post('/login', userController.login);

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { session: false }),
  userController.googleCallback);

router.get('/me', verifySession, (req, res) => {
  console.log(req.user);
  const { email, name, userType } = req.user;
  res.json({ email, name, userType });
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out' });
});

module.exports = router;
