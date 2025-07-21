const Song = require('../models/song');
const trackStream = require('../utils/trackStream');

exports.getAllSongs = async (req, res) => {
  const songs = await Song.find().populate('artistId', 'name');
  res.json(songs);
};

exports.playSong = async (req, res) => {
  const { songId, durationPlayed } = req.body;
  await trackStream(req.user._id, songId, durationPlayed);
  res.status(200).json({ message: 'Playback tracked' });
};

exports.likeSong = async (req, res) => {
  const { songId } = req.body;
  const user = req.user;

  if (!user.likedSongs) user.likedSongs = [];
  if (!user.likedSongs.includes(songId)) {
    user.likedSongs.push(songId);
    await user.save();
  }

  res.json({ message: 'Song liked' });
};