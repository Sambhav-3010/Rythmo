require('dotenv').config();
require('./config/passport');
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const songUpload = require('./routes/songUpload');
const album = require('./routes/album');
const playlistRoutes = require('./routes/playlist');
const analyticsRoutes = require('./routes/analytics');
const isArtist = require('./middleware/isArtist');
const songs = require('./routes/songs');
const artistRoutes = require('./routes/artistAnalytics');
const savedSongRoutes = require('./routes/savedSong');


// Mongoose connection and middleware setup
const app = express();
app.use(cookieParser());
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true })); 
app.use(passport.initialize());
app.get('/', (req, res) => {
  res.send('Welcome to the Rythmo\'s API');
});

// Routers are setup here
app.use('/auth', authRoutes);
app.use('/songsUpload', songUpload);
app.use('/songs', songs);
app.use('/album', album);
app.use('/playlist', playlistRoutes);
app.use('/analytics', isArtist, analyticsRoutes);
app.use('/artist', artistRoutes);
app.use('/savedSongs', savedSongRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));