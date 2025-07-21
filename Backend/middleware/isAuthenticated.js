const jwt = require("jsonwebtoken");
const User = require("../models/user");
const verifySession = async (req, res, next) => {
  req.user = {
    _id: "687c242fb8aa74776315e4b6",
    email: "sam@gmail.com",
    password: "123",
    name: "Sambhav",
    likedSongs: [],
    userType: "artist",
  };
  req.session = {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODdjMjQyZmI4YWE3NDc3NjMxNWU0YjYiLCJ0eXBlIjoiYXJ0aXN0IiwiaWF0IjoxNzUyOTY2ODA5LCJleHAiOjE3NTM1NzE2MDl9.XMnlIM5Gzx53C1hPCUjDlfkoWAzWNcRAMYTZBdqW8d0",
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
