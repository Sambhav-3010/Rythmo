const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  songId: { type: mongoose.Schema.Types.ObjectId, ref: 'Song' },
  durationPlayed: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Stream', streamSchema);