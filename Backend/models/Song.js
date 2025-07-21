const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: String,
  artistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cloudinaryUrl: String,
  coverImageUrl: String,
  duration: Number,
  albumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Album', default: null },
  plays: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Song', songSchema);
