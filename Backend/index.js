require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const authRoutes = require('./routes/auth');
require('./config/passport');
const session = require('express-session');
const songRoutes = require('./routes/songs');
const cookieParser = require('cookie-parser');


const app = express();
app.use(cookieParser());
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true })); 
app.use(passport.initialize());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Rythmo\'s API');
});

app.use('/auth', authRoutes);
app.use('/songs', songRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));