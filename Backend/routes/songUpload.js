const express = require('express');
const router = express.Router();
const upload = require('../config/multer').single('file');
const cloudinary = require('../config/cloudinary');
const Song = require('../models/song');
const authMiddleware = require('../middleware/isAuthenticated');
const isArtist = require('../middleware/isArtist');
const { round } = require('mathjs');

router.post('/upload', authMiddleware, isArtist, upload, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Song file is required.' });
    }
    const audioFile = req.file;
    const audioDataUri = `data:${audioFile.mimetype};base64,${audioFile.buffer.toString('base64')}`;
    const audioUpload = await cloudinary.uploader.upload(audioDataUri, {
      resource_type: 'video',
      folder: 'spotify_songs',
      public_id: `${req.user.name}_${Date.now()}_song`,
    });
    const song = new Song({
      title: req.body.title,
      artistId: req.body.user,
      cloudinaryUrl: audioUpload.secure_url,
      duration: round(audioUpload.duration),
    });
    await song.save();
    console.log("Song uploaded successfully:", song);
    res.status(200).json({ message: 'Song uploaded successfully', song });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ error: 'An unexpected error occurred during the upload.' });
  }
});

module.exports = router;