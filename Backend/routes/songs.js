const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../utils/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Song = require('../models/Song');
const verifySession = require('../middleware/session');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'spotify_clone_songs',
    resource_type: 'video',
    format: async (req, file) => 'mp3',
  }
});

const upload = multer({ storage });

router.post('/upload', verifySession, upload.single('song'), async (req, res) => {
  try {
    const { title, genre } = req.body;
    const song = new Song({
      title,
      genre,
      artist: req.user.id,
      url: req.file.path
    });
    await song.save();
    res.status(201).json({ message: 'Song uploaded', song });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
