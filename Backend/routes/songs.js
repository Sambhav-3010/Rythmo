const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const isAuthenticated = require('../middleware/isAuthenticated');
const isListener = require('../middleware/isListener');

router.get('/all', isAuthenticated, songController.getAllSongs);
router.post('/play', isAuthenticated, songController.playSong);
router.post('/like', isAuthenticated, songController.likeSong);
router.post('/:songId/like', isAuthenticated, isListener, songController.likeSong);
router.delete('/:songId/like', isAuthenticated, isListener, songController.unlikeSong);
router.get('/liked', isAuthenticated, isListener, songController.getLikedSongs);
router.get('/:songId/isLiked', isAuthenticated, isListener, songController.checkLiked);

module.exports = router;