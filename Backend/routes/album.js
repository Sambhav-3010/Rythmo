const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const cloudinary = require("../config/cloudinary");
const Album = require("../models/album");
const authMiddleware = require("../middleware/isAuthenticated");
const isArtist = require("../middleware/isArtist");

router.post("/album", authMiddleware, isArtist, upload.single("cover"), async (req, res) => {
    try {
      const { name, description, songIds } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: "Album cover is required" });
      }
      const fileBuffer = req.file.buffer.toString("base64");
      const result = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${fileBuffer}`,
        {
          folder: "spotify_albums",
          resource_type: "image",
          public_id: `${req.user.name}_album_${Date.now()}`,
        }
      );
      const album = new Album({
        name,
        description,
        coverUrl: result.secure_url,
        artistId: req.user._id,
        songs: songIds ? songIds.split(",") : [],
      });

      await album.save();
      res.status(201).json({ message: "Album created", album });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Album creation failed" });
    }
  }
);

router.get('/albums', async (req, res) => {
  try {
    const albums = await Album.find()
      .populate('artistId', 'name')
      .select('name coverUrl artistId createdAt');
    res.status(200).json(albums);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch albums' });
  }
});

router.get('/album/:albumId', async (req, res) => {
  try {
    const album = await Album.findById(req.params.albumId)
      .populate('songs')
      .populate('artistId', 'name');

    if (!album) return res.status(404).json({ error: 'Album not found' });

    res.status(200).json(album);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch album' });
  }
});

router.patch('/album/:albumId/add-song', authMiddleware, isArtist, async (req, res) => {
  try {
    const { songId } = req.body;
    const album = await Album.findById(req.params.albumId);
    if (!album) return res.status(404).json({ error: 'Album not found' });
    if (album.artistId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    if (!album.songs.includes(songId)) {
      album.songs.push(songId);
      await album.save();
    }
    res.status(200).json({ message: 'Song added to album', album });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add song to album' });
  }
});

module.exports = router;