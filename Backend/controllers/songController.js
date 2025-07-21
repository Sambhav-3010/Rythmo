const Song = require('../models/song');
const trackStream = require('../utils/trackStream');
const Like = require('../models/like');

exports.getAllSongs = async (req, res) => {
  const songs = await Song.find().populate('artistId', 'name');
  res.json(songs);
};

exports.playSong = async (req, res) => {
  const { songId, durationPlayed } = req.body;

  if (!songId || !durationPlayed) {
    return res.status(400).json({ error: 'Missing songId or durationPlayed' });
  }

  await trackStream(req.user._id, songId, durationPlayed);
  res.status(200).json({ message: 'Playback tracked' });
};

exports.likeSong = async (req, res) => {
  const { songId } = req.body;
  const user = req.user;

  if (!songId) return res.status(400).json({ error: 'Missing songId' });

  if (!user.likedSongs) user.likedSongs = [];

  if (!user.likedSongs.includes(songId)) {
    user.likedSongs.push(songId);
    await user.save();
  }

  res.json({ message: 'Song liked' });
};

// Like a song
exports.likeSong = async (req, res) => {
  const { songId } = req.params;
  const userId = req.user._id;

  try {
    await Like.create({ userId, songId });
    res.status(201).json({ message: 'Song liked' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Already liked' });
    }
    console.error(err);
    res.status(500).json({ error: 'Failed to like song' });
  }
};

// Unlike a song
exports.unlikeSong = async (req, res) => {
  const { songId } = req.params;
  const userId = req.user._id;

  try {
    await Like.deleteOne({ userId, songId });
    res.json({ message: 'Song unliked' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to unlike song' });
  }
};

// Get liked songs for user
exports.getLikedSongs = async (req, res) => {
  const userId = req.user._id;

  try {
    const likes = await Like.find({ userId }).populate('songId');
    const likedSongs = likes.map(like => like.songId);
    res.json({ likedSongs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch liked songs' });
  }
};

// Check if user liked a song
exports.checkLiked = async (req, res) => {
  const { songId } = req.params;
  const userId = req.user._id;

  try {
    const liked = await Like.exists({ userId, songId });
    res.json({ liked: !!liked });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to check like status' });
  }
};