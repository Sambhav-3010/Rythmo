const express = require('express');
const router = express.Router();

const Stream = require('../models/stream');
const Song = require('../models/song');
const Album = require('../models/album');
const Like = require('../models/like');
const authMiddleware = require('../middleware/isAuthenticated');
const isArtist = require('../middleware/isArtist');

router.get('/dashboard', authMiddleware, isArtist, async (req, res) => {
  try {
    const artistId = req.user._id;

    const songs = await Song.find({ artistId });
    const songIds = songs.map(song => song._id);

    const totalStreams = await Stream.countDocuments({ songId: { $in: songIds } });
    const totalMinutesPlayedAgg = await Stream.aggregate([
      { $match: { songId: { $in: songIds } } },
      { $group: { _id: null, totalSeconds: { $sum: "$durationPlayed" } } }
    ]);
    const totalMinutes = totalMinutesPlayedAgg[0]?.totalSeconds / 60 || 0;

    const totalLikes = await Like.countDocuments({ songId: { $in: songIds } });

    res.json({
      totalSongs: songs.length,
      totalStreams,
      totalMinutesPlayed: totalMinutes.toFixed(2),
      totalLikes
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching analytics' });
  }
});

router.get('/song/:id/stats', authMiddleware, isArtist, async (req, res) => {
  try {
    const songId = req.params.id;

    const song = await Song.findById(songId);
    if (!song || song.artistId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized or song not found' });
    }

    const totalStreams = await Stream.countDocuments({ songId });
    const totalSecondsAgg = await Stream.aggregate([
      { $match: { songId: song._id } },
      { $group: { _id: null, totalSeconds: { $sum: "$durationPlayed" } } }
    ]);
    const totalMinutes = totalSecondsAgg[0]?.totalSeconds / 60 || 0;

    const totalLikes = await Like.countDocuments({ songId });

    res.json({
      title: song.title,
      totalStreams,
      totalMinutesPlayed: totalMinutes.toFixed(2),
      totalLikes
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching song stats' });
  }
});

module.exports = router;