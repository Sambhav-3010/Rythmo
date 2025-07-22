const jwt = require("jsonwebtoken");
const Session = require("../models/session");

const verifySession = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Not authenticated" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const session = await Session.findOne({ token });
    if (!session) return res.status(401).json({ error: "Session not found" });
    req.user = {
      email: session.email,
      name: session.name,
      userType: session.type,
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = verifySession;
