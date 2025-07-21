const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
  likedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  googleId: String,
  userType: { type: String, enum: ["listener", "artist"], default: "listener" },
});

module.exports = mongoose.model("User", UserSchema);
