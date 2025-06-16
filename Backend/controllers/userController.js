const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { email, password, name, userType } = req.body;
    const user = new User({ email, password, name, userType });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    req.session.token = token;

    res.json({ user: { email, name, userType } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    req.session.token = token;

    res.json({ user: { email: user.email, name: user.name, userType: user.userType } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.googleCallback = (req, res) => {
  const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET);
  req.session.token = token;
  res.redirect(`${process.env.CLIENT_URL}/login-success`);
};
