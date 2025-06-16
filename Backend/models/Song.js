const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: String,
  artistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cloudinaryUrl: String,
  duration: Number,
  plays: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Song', songSchema);