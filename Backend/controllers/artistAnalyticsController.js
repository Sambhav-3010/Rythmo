const Song = require('../models/song');
const Album = require('../models/album');
const PlayHistory = require('../models/playHistory');
const mongoose = require('mongoose');

// Album Analytics
exports.getAlbumAnalytics = async (req, res) => {
  try {
    const artistId = req.user._id;
    const albums = await Album.find({ artistId });
    const analytics = await Promise.all(
      albums.map(async (album) => {
        const songs = await Song.find({ albumId: album._id });
        const songIds = songs.map(song => song._id);
        console.log(album._id)
        const totalPlays = await PlayHistory.countDocuments({
          songId: { $in: songIds }
        });
        const totalDurationResult = await PlayHistory.aggregate([
          { $match: { songId: { $in: songIds.map(id => new mongoose.Types.ObjectId(id)) } } },
          { $group: { _id: null, total: { $sum: '$durationPlayed' } } }
        ]);

        const totalListeners = await PlayHistory.distinct('userId', {
          songId: { $in: songIds }
        });

        return {
          albumId: album._id,
          title: album.title,
          songCount: songs.length,
          plays: totalPlays,
          totalMinutesPlayed: Math.floor((totalDurationResult[0]?.total || 0) / 60),
          uniqueListeners: totalListeners.length
        };
      })
    );

    res.json({ analytics });
  } catch (err) {
    console.error('Album analytics error:', err);
    res.status(500).json({ error: 'Failed to fetch album analytics' });
  }
};

// Per-song analytics
exports.getArtistAnalytics = async (req, res) => {
  try {
    const artistId = req.user._id;

    const songs = await Song.find({ artistId });

    const analytics = await Promise.all(
      songs.map(async (song) => {
        const totalPlays = await PlayHistory.countDocuments({ songId: song._id });

        const totalDuration = await PlayHistory.aggregate([
          { $match: { songId: song._id } },
          { $group: { _id: null, total: { $sum: '$durationPlayed' } } },
        ]);

        return {
          songId: song._id,
          title: song.title,
          plays: totalPlays,
          minutesPlayed: `${Math.floor((totalDuration[0]?.total || 0) / 60)} minutes`,
        };
      })
    );

    res.json({ analytics });
  } catch (err) {
    console.error('Analytics fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
};

// Artist overview analytics
exports.getArtistOverview = async (req, res) => {
  try {
    const artistId = req.user._id;
    console.log('Artist ID:', artistId);

    const songs = await Song.find({ artistId });
    console.log('Found songs:', songs.length);
    const songIds = songs.map(song => song._id);


    console.log('Found songIds:', songIds);

    const totalPlays = await PlayHistory.countDocuments({ songId: { $in: songIds } });

    const uniqueListeners = await PlayHistory.distinct('userId', { songId: { $in: songIds } });

    const totalDuration = await PlayHistory.aggregate([
      { $match: { songId: { $in: songIds } } }, // ✅ fixed
      { $group: { _id: null, total: { $sum: '$durationPlayed' } } }
    ]);

    res.json({
      totalSongs: songs.length,
      totalPlays,
      totalListeners: uniqueListeners.length,
      totalMinutesPlayed: Math.floor((totalDuration[0]?.total || 0) / 60),
    });
  } catch (err) {
    console.error('Artist overview fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch artist overview' });
  }
};