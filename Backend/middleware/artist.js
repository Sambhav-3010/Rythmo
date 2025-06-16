const User = require('../models/User');

const verifyArtist = (req, res, next) => {
  if (req.user && req.user.userType === 'artist') {
    return next();
  }
  return res.status(403).json({ error: 'Access denied. Artist only.' });
}

module.exports = verifyArtist;