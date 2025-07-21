const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const isAuthenticated = require('../middleware/isAuthenticated');

router.post('/create', isAuthenticated, playlistController.createPlaylist);
router.post('/add', isAuthenticated, playlistController.addSongToPlaylist);
router.post('/remove', isAuthenticated, playlistController.removeSongFromPlaylist);
router.get('/all', isAuthenticated, playlistController.getUserPlaylists);
router.get('/:playlistId', isAuthenticated, playlistController.getPlaylistById);

module.exports = router;
