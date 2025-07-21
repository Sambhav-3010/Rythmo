const mongoose = require('mongoose');

const savedSongSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  songId: { type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true },
  createdAt: { type: Date, default: Date.now }
});

savedSongSchema.index({ userId: 1, songId: 1 }, { unique: true });

module.exports = mongoose.model('SavedSong', savedSongSchema);