const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/all', isAuthenticated, songController.getAllSongs);
router.post('/play', isAuthenticated, songController.playSong);
router.post('/like', isAuthenticated, songController.likeSong);

module.exports = router;