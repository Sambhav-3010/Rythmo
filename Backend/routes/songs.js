const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const cloudinary = require('../config/cloudinary');
const Song = require('../models/Song');
const authMiddleware = require('../middleware/isAuthenticated');
const isArtist = require('../middleware/isArtist');

router.post('/upload', authMiddleware, isArtist, upload.single('file'), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer.toString('base64');
    const uploadResult = await cloudinary.uploader.upload(`data:audio/mpeg;base64,${fileBuffer}`, {
      resource_type: 'video',
      folder: 'spotify_songs',
      public_id: `${req.user.name}_${Date.now()}`,
    });

    const song = new Song({
      title: req.body.title,
      artistId: req.user._id,
      cloudinaryUrl: uploadResult.secure_url,
    });

    await song.save();

    res.status(200).json({ message: 'Song uploaded', song });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;