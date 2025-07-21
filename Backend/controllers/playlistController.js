const Playlist = require('../models/playlist');

exports.createPlaylist = async (req, res) => {
  const { name } = req.body;
  const playlist = new Playlist({ name, userId: req.user._id });
  await playlist.save();
  res.status(201).json({ message: 'Playlist created', playlist });
};

exports.addSongToPlaylist = async (req, res) => {
  const { playlistId, songId } = req.body;

  const playlist = await Playlist.findById(playlistId);
  if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
  if (!playlist.userId.equals(req.user._id)) return res.status(403).json({ message: 'Not your playlist' });

  if (!playlist.songs.includes(songId)) {
    playlist.songs.push(songId);
    await playlist.save();
  }

  res.status(200).json({ message: 'Song added to playlist' });
};

exports.removeSongFromPlaylist = async (req, res) => {
  const { playlistId, songId } = req.body;

  const playlist = await Playlist.findById(playlistId);
  if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
  if (!playlist.userId.equals(req.user._id)) return res.status(403).json({ message: 'Not your playlist' });

  playlist.songs = playlist.songs.filter((id) => id.toString() !== songId);
  await playlist.save();

  res.status(200).json({ message: 'Song removed from playlist' });
};

exports.getUserPlaylists = async (req, res) => {
  const playlists = await Playlist.find({ userId: req.user._id }).populate('songs');
  res.json(playlists);
};

exports.getPlaylistById = async (req, res) => {
  const { playlistId } = req.params;
  const playlist = await Playlist.findById(playlistId).populate('songs');

  if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
  if (!playlist.userId.equals(req.user._id)) return res.status(403).json({ message: 'Not your playlist' });

  res.json(playlist);
};
