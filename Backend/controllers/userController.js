const User = require('../models/user');
const Session = require('../models/session');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 30 * 24 * 60 * 60 * 1000
};

exports.signup = async (req, res) => {
  try {
    const { email, password, name, userType } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name, userType: userType.toLowerCase() });
    await user.save();

    const token = jwt.sign({ userId: user._id, type: user.userType }, process.env.JWT_SECRET, { expiresIn: '7d' });

    await Session.create({
      userId: user._id,
      name: user.name,
      email: user.email,
      type: user.userType,
      token
    });

    res.cookie('token', token, cookieOptions);
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

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ userId: user._id, type: user.userType }, process.env.JWT_SECRET, { expiresIn: '7d' });

    await Session.create({
      userId: user._id,
      name: user.name,
      email: user.email,
      type: user.userType,
      token
    });

    res.cookie('token', token, cookieOptions);
    res.status(200).json({status : 'success', user: { email: user.email, name: user.name, userType: user.userType, cookie: token } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.googleCallback = (req, res) => {
  const token = jwt.sign({ userId: req.user._id, type: req.user.userType }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.cookie('token', token, cookieOptions);
  res.redirect(`${process.env.CLIENT_URL}/login-success`);
};