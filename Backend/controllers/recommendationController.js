const Song = require('../models/song');
const User = require('../models/user');
const { calculateGenreVector, cosineSimilarity } = require('../utils/similarityUtils');

exports.getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('likedSongs');
    const likedSongs = user.likedSongs;

    if (!likedSongs.length) return res.json({ recommendations: [] });

    const allGenres = [...new Set((await Song.find()).flatMap(song => song.genres))];

    // Create user's genre preference vector
    const userVector = Array(allGenres.length).fill(0);
    likedSongs.forEach(song => {
      const vec = calculateGenreVector(song.genres, allGenres);
      vec.forEach((v, i) => userVector[i] += v);
    });

    // Fetch other songs to recommend
    const allSongs = await Song.find({ _id: { $nin: likedSongs.map(song => song._id) } });

    const recommendations = allSongs
      .map(song => {
        const songVec = calculateGenreVector(song.genres, allGenres);
        const similarity = cosineSimilarity(userVector, songVec);
        return { song, similarity };
      })
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 10) // top 10
      .map(item => item.song);

    res.json({ recommendations });
  } catch (err) {
    console.error('Recommendation Error:', err);
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
};