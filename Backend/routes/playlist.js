const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const isAuthenticated = require('../middleware/isAuthenticated');
const isListener = require('../middleware/isListener');

router.post('/create', isAuthenticated,isListener, playlistController.createPlaylist);
router.post('/add', isAuthenticated,isListener, playlistController.addSongToPlaylist);
router.post('/remove', isAuthenticated,isListener, playlistController.removeSongFromPlaylist);
router.get('/all', isAuthenticated,isListener, playlistController.getUserPlaylists);
router.get('/:playlistId', isAuthenticated,isListener, playlistController.getPlaylistById);

module.exports = router;