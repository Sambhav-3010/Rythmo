const PlayHistory = require('../models/playHistory');
const Song = require('../models/song');

const trackStream = async (userId, songId, durationPlayed) => {
  await PlayHistory.create({ userId, songId, durationPlayed });
  if (durationPlayed >= 30) {
    await Song.findByIdAndUpdate(songId, {
      $inc: { plays: 1 }
    });
  }
};

module.exports = trackStream;
