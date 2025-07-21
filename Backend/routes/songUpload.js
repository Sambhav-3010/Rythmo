const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const cloudinary = require('../config/cloudinary');
const Song = require('../models/song');
const authMiddleware = require('../middleware/isAuthenticated');
const isArtist = require('../middleware/isArtist');

const multerMiddleware = upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'cover', maxCount: 1 },
]);

router.post('/upload', authMiddleware, isArtist, multerMiddleware, async (req, res) => {
  try {
    const audioFile = req.files['file'][0];
    const coverFile = req.files['cover'][0];

    const audioBuffer = audioFile.buffer.toString('base64');
    const audioUpload = await cloudinary.uploader.upload(
      `data:audio/mpeg;base64,${audioBuffer}`,
      {
        resource_type: 'video',
        folder: 'spotify_songs',
        public_id: `${req.user.name}_${Date.now()}_song`,
      }
    );

    const coverBuffer = coverFile.buffer.toString('base64');
    const coverUpload = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${coverBuffer}`,
      {
        resource_type: 'image',
        folder: 'spotify_covers',
        public_id: `${req.user.name}_${Date.now()}_cover`,
      }
    );

    const song = new Song({
      title: req.body.title,
      artistId: req.user._id,
      cloudinaryUrl: audioUpload.secure_url,
      coverImageUrl: coverUpload.secure_url,
    });

    await song.save();

    res.status(200).json({ message: 'Song and cover uploaded', song });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;