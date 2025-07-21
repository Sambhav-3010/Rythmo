const express = require('express');
const router = express.Router();
const savedSongController = require('../controllers/savedSongController');
const isAuthenticated = require('../middleware/isAuthenticated');

router.post('/save', isAuthenticated, savedSongController.saveSong);
router.post('/unsave', isAuthenticated, savedSongController.unsaveSong);
router.get('/all', isAuthenticated, savedSongController.getSavedSongs);

module.exports = router;