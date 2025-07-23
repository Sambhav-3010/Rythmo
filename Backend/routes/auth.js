const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/userController');
const verifySession = require('../middleware/isAuthenticated');

router.post('/signup', userController.signup);
router.post('/login', userController.login);

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { session: false }),
  userController.googleCallback);

router.get('/me', verifySession, (req, res) => {
  const { email, name, userType, _id } = req.user;
  res.json({ email, name, userType, _id });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
  return res.status(200).json({ message: "Logged out" });
});


module.exports = router;
