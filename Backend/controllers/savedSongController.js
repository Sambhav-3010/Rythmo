const SavedSong = require('../models/savedSong');

exports.saveSong = async (req, res) => {
  const { songId } = req.body;

  try {
    const saved = await SavedSong.findOneAndUpdate(
      { userId: req.user._id, songId },
      { $setOnInsert: { userId: req.user._id, songId } },
      { upsert: true, new: true }
    );
    res.status(200).json({ message: 'Song saved', saved });
  } catch (err) {
    res.status(500).json({ message: 'Error saving song', error: err.message });
  }
};

exports.unsaveSong = async (req, res) => {
  const { songId } = req.body;

  try {
    await SavedSong.deleteOne({ userId: req.user._id, songId });
    res.status(200).json({ message: 'Song unsaved' });
  } catch (err) {
    res.status(500).json({ message: 'Error unsaving song', error: err.message });
  }
};

exports.getSavedSongs = async (req, res) => {
  try {
    const songs = await SavedSong.find({ userId: req.user._id }).populate('songId');
    res.status(200).json({ saved: songs.map((s) => s.songId) });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching saved songs', error: err.message });
  }
};