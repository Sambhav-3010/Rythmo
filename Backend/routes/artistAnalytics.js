const express = require('express');
const router = express.Router();
const { getArtistAnalytics, getArtistOverview, getAlbumAnalytics } = require('../controllers/artistAnalyticsController');
const isAuthenticated = require('../middleware/isAuthenticated');
const isArtist = require('../middleware/isArtist');

router.get('/analytics', isAuthenticated, isArtist, getArtistAnalytics);
router.get('/overview', isAuthenticated, isArtist, getArtistOverview);
router.get('/albums', isAuthenticated, isArtist, getAlbumAnalytics);

module.exports = router;

module.exports = router;