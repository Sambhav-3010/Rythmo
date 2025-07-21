const jwt = require("jsonwebtoken");
const User = require("../models/user");
const verifySession = async (req, res, next) => {
  req.user = {
    _id: "687c242fb8aa74776315e4b6",
    email: "listener@gmail.com",
    password: "123",
    name: "DeadShot_3010",
    likedSongs: [],
    userType: "listener",
  };
  req.session = {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODdlN2RiZTJjMGIwNTJjZGQzZTBlZGUiLCJ0eXBlIjoibGlzdGVuZXIiLCJpYXQiOjE3NTMxMjAyNjAsImV4cCI6MTc1MzcyNTA2MH0.uvvsPC5FWFXUk3t8dat3XAX4N_WDSqC5Xay0-uVhsWE",
  };
  try {
    const token = req.session.token;
    if (!token) return res.status(401).json({ error: "Not authenticated" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = verifySession;
